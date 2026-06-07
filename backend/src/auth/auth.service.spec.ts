import { AuthService } from './auth.service';

// Minimal mocks — purgeExpiredAccounts only touches prisma.user + s3.
function setup(expiredIds: string[]) {
  const prisma = {
    user: {
      findMany: jest
        .fn()
        .mockResolvedValue(expiredIds.map((id) => ({ id }))),
      deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
    },
  };
  const s3 = { deleteUserAudio: jest.fn().mockResolvedValue(undefined) };
  const service = new AuthService(
    {} as never, // ConfigService (unused here)
    prisma as never,
    {} as never, // JwtService (unused here)
    s3 as never,
  );
  return { service, prisma, s3 };
}

describe('AuthService.purgeExpiredAccounts', () => {
  it('purges every account past its grace period and returns the count', async () => {
    const { service, prisma, s3 } = setup(['u1', 'u2']);

    const count = await service.purgeExpiredAccounts();

    expect(count).toBe(2);
    expect(s3.deleteUserAudio).toHaveBeenCalledTimes(2);
    expect(s3.deleteUserAudio).toHaveBeenCalledWith('u1');
    expect(s3.deleteUserAudio).toHaveBeenCalledWith('u2');
    expect(prisma.user.deleteMany).toHaveBeenCalledTimes(2);
    expect(prisma.user.deleteMany).toHaveBeenCalledWith({
      where: { id: 'u1' },
    });
    expect(prisma.user.deleteMany).toHaveBeenCalledWith({
      where: { id: 'u2' },
    });
  });

  it('only selects accounts with a deletion date in the past', async () => {
    const { service, prisma } = setup(['u1']);

    await service.purgeExpiredAccounts();

    const where = prisma.user.findMany.mock.calls[0][0].where;
    expect(where.deletionScheduledAt.not).toBeNull();
    expect(where.deletionScheduledAt.lte).toBeInstanceOf(Date);
    // The cutoff is "now" — must not be in the future.
    expect(
      (where.deletionScheduledAt.lte as Date).getTime(),
    ).toBeLessThanOrEqual(Date.now());
  });

  it('does nothing when no accounts are expired', async () => {
    const { service, prisma, s3 } = setup([]);

    const count = await service.purgeExpiredAccounts();

    expect(count).toBe(0);
    expect(s3.deleteUserAudio).not.toHaveBeenCalled();
    expect(prisma.user.deleteMany).not.toHaveBeenCalled();
  });

  it('deletes S3 audio before the DB row for each account', async () => {
    const { service, prisma, s3 } = setup(['u1']);
    const order: string[] = [];
    s3.deleteUserAudio.mockImplementation(async () => {
      order.push('s3');
    });
    prisma.user.deleteMany.mockImplementation(async () => {
      order.push('db');
      return { count: 1 };
    });

    await service.purgeExpiredAccounts();

    // Audio must go first; once the User row is gone we'd lose the id needed
    // to locate the objects.
    expect(order).toEqual(['s3', 'db']);
  });
});
