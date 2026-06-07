import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuthService } from './auth.service';

/**
 * Daily job that permanently purges accounts whose 30-day deletion grace
 * period has elapsed. The actual work lives in AuthService.purgeExpiredAccounts.
 */
@Injectable()
export class AccountPurgeService {
  private readonly logger = new Logger(AccountPurgeService.name);

  constructor(private readonly auth: AuthService) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handlePurge(): Promise<void> {
    try {
      const purged = await this.auth.purgeExpiredAccounts();
      if (purged > 0) {
        this.logger.log(`Purged ${purged} account(s) past their grace period`);
      }
    } catch (err) {
      this.logger.error('Account purge job failed', err as Error);
    }
  }
}
