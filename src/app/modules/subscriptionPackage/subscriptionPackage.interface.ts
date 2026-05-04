import { Model } from 'mongoose';

export type TSubscriptionPackage = {
  packageName: string;
  tagline: string;
  billingCycle: string;
  price: number;
  trialDays: number;
  features: string[];
  isActive: boolean;
};

export type SubscriptionPackageModel = Model<TSubscriptionPackage>;
