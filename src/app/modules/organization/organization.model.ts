import { Schema, model } from 'mongoose';
import { TOrganization } from './organization.interface';

const companyInformationSchema = new Schema({
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  vatNumber: { type: String, required: true },
  tradingName: { type: String, required: true },
  tradingAddress: { type: String, required: true },
  yearsInBusiness: { type: String, required: true },
});

const contactDetailsSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const contactInformationSchema = new Schema({
  ownerContactDetails: { type: contactDetailsSchema, required: true },
  accountContact: { type: contactDetailsSchema, required: true },
});

const deliveryInformationSchema = new Schema({
  contactName: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  minimumOrderForDelivery: { type: String },
  deliveryTimesAvailable: { type: [String] },
  deliveryAreas: { type: [String] },
  deliveryDays: { type: [String] },
  offDays: { type: [String] },
});

const referenceSchema = new Schema({
  companyName: { type: String, required: true },
  contactName: { type: String, required: true },
  email: { type: String, required: true },
});

const referenceInformationSchema = new Schema({
  reference1: { type: referenceSchema, required: true },
  reference2: { type: referenceSchema, required: true },
  howDidYouHearAboutUs: { type: String, required: true },
  agentName: { type: String },
});

const paymentInformationSchema = new Schema({
  paymentMethod: { type: String, required: true },
  accountHolderName: { type: String, required: true },
  bankName: { type: String, required: true },
  bankAddress: { type: String, required: true },
  sortCode: { type: String, required: true },
  accountNumber: { type: String, required: true },
});

const subscriptionSchema = new Schema({
  subscriptionPackageId: { type: Schema.Types.ObjectId, ref: 'SubscriptionPackage', required: true },
  status: { type: String, enum: ['active', 'expired'], required: true },
  lastBilledAt: { type: Date, required: true },
  expireDate: { type: Date, required: true },
});

const commissionSchema = new Schema({
  rate: { type: Number, required: true },
  effectiveFrom: { type: Date, required: true },
  minimum: { type: Number, required: true },
  maximum: { type: Number, required: true },
});

const organizationSchema = new Schema<TOrganization>(
  {
    organizationType: {
      type: String,
      enum: ['venue', 'supplier'],
      required: true,
    },
    status: {
      type: String,
      enum: ['inactive', 'active', 'disabled'],
      default: 'inactive',
    },
    companyInformation: { type: companyInformationSchema, required: true },
    contactInformation: { type: contactInformationSchema, required: true },
    deliveryInformation: { type: deliveryInformationSchema, required: true },
    referenceInformation: { type: referenceInformationSchema, required: true },
    paymentInformation: { type: paymentInformationSchema, required: true },
    subscription: { type: subscriptionSchema },
    commission: { type: commissionSchema },
  },
  {
    timestamps: true,
  },
);

export const Organization = model<TOrganization>('Organization', organizationSchema);
