import { Schema, model } from 'mongoose';
import { TSubscriptionPackage, SubscriptionPackageModel } from './subscriptionPackage.interface';

const subscriptionPackageSchema = new Schema<TSubscriptionPackage, SubscriptionPackageModel>(
  {
    packageName: { type: String, required: true },
    tagline: { type: String, required: true },
    billingCycle: { type: String, required: true },
    price: { type: Number, required: true },
    trialDays: { type: Number, default: 0 },
    features: { type: [String], required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const SubscriptionPackage = model<TSubscriptionPackage, SubscriptionPackageModel>(
  'SubscriptionPackage',
  subscriptionPackageSchema
);
