-- AlterTable: 30-day grace period for account deletion
ALTER TABLE "User" ADD COLUMN "deletionScheduledAt" TIMESTAMP(3);

-- Index for the daily purge job that scans for accounts past their grace period
CREATE INDEX "User_deletionScheduledAt_idx" ON "User"("deletionScheduledAt");
