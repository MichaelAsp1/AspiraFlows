-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('NONE', 'INCOMPLETE', 'ACTIVE', 'PAST_DUE', 'CANCELED');

-- CreateEnum
CREATE TYPE "BillingSource" AS ENUM ('STRIPE', 'COMPED');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('STARTER', 'PROFESSIONAL', 'INTENSIVE');

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "billingSource" "BillingSource" NOT NULL DEFAULT 'STRIPE',
ADD COLUMN     "plan" "Plan",
ADD COLUMN     "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'NONE';
