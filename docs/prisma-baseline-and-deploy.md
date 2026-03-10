# Prisma Baseline and Deploy Guide

This guide is for production/staging databases that are already non-empty and may hit Prisma `P3005`.

## Scope

- Project: `fileup.server`
- New migration for user profile/admin user management:
  - `20260309150000_add_user_profile_admin_user_management`

## 1) Pre-check

Run these in `server/`.

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm exec prisma validate
corepack pnpm exec prisma migrate status
```

If `migrate status` reports `P3005` (database schema is not empty and no migration table baseline), use the baseline flow below.

## 2) Baseline existing migrations (one-time)

Before running commands, make a DB backup/snapshot.

Mark historical migrations as already applied:

```bash
corepack pnpm exec prisma migrate resolve --applied 20260202011313_init
corepack pnpm exec prisma migrate resolve --applied 20260202032856_add_admin_disabled_and_cascade_delete
corepack pnpm exec prisma migrate resolve --applied 20260308093000_add_plugin_review_system
corepack pnpm exec prisma migrate resolve --applied 20260308195000_add_plugin_version_management
corepack pnpm exec prisma migrate resolve --applied 20260309083000_add_local_auth
corepack pnpm exec prisma migrate resolve --applied 20260309113000_add_email_verification_and_system_settings
```

Then deploy pending migrations:

```bash
corepack pnpm exec prisma migrate deploy
```

## 3) Verify

```bash
corepack pnpm exec prisma migrate status
corepack pnpm exec prisma generate
corepack pnpm build
```

Expected result: migration `20260309150000_add_user_profile_admin_user_management` is applied, and build succeeds.

## 4) Fallback for `User.updatedAt` default mismatch

If old DB schema has `User.updatedAt` but without default, run:

```sql
ALTER TABLE `User`
  MODIFY COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
```

Then retry:

```bash
corepack pnpm exec prisma migrate deploy
```

## 5) Fresh database path

For a brand new empty DB, do not baseline manually. Just run:

```bash
corepack pnpm exec prisma migrate deploy
corepack pnpm exec prisma generate
```
