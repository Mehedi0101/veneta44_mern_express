import { Schema, model } from 'mongoose';
import { ORGANIZATION_STATUS, ORGANIZATION_TYPE } from './organization.constant';
import { OrganizationModel, TOrganization } from './organization.interface';

/**
 * Company Information Schema
 */
const companyInfoSchema = new Schema({
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  vatNumber: { type: String, required: true },
  tradingName: { type: String, required: true },
  tradingAddress: { type: String, required: true },
  yearsInBusiness: { type: String, required: true },
}, { _id: false });

/**
 * Contact Details Schema
 */
const contactDetailsSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
}, { _id: false });

/**
 * Contact Information Schema
 */
const contactInfoSchema = new Schema({
  ownerContactDetails: { type: contactDetailsSchema, required: true },
  accountContact: { type: contactDetailsSchema, required: true },
}, { _id: false });

/**
 * Delivery Information Schema
 */
const deliveryInfoSchema = new Schema({
  contactName: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  minimumOrderForDelivery: { type: String },
  deliveryTimesAvailable: { type: [String] },
  deliveryAreas: { type: [String] },
  deliveryDays: { type: [String] },
  offDays: { type: [String] },
}, { _id: false });

/**
 * Reference Schema
 */
const referenceSchema = new Schema({
  companyName: { type: String, required: true },
  contactName: { type: String, required: true },
  email: { type: String, required: true },
}, { _id: false });

/**
 * Main Organization Schema
 */
const organizationSchema = new Schema<TOrganization, OrganizationModel>(
  {
    organizationType: {
      type: String,
      enum: Object.values(ORGANIZATION_TYPE),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ORGANIZATION_STATUS),
      default: ORGANIZATION_STATUS.INACTIVE,
    },
    companyInformation: { type: companyInfoSchema, required: true },
    contactInformation: { type: contactInfoSchema, required: true },
    deliveryInformation: { type: deliveryInfoSchema, required: true },
    referenceInformation: {
      reference1: { type: referenceSchema, required: true },
      reference2: { type: referenceSchema, required: true },
      howDidYouHearAboutUs: { type: String, required: true },
      agentName: { type: String },
    },
    paymentInformation: {
      paymentMethod: { type: String, required: true },
      accountHolderName: { type: String, required: true },
      bankName: { type: String, required: true },
      bankAddress: { type: String, required: true },
      sortCode: { type: String, required: true },
      accountNumber: { type: String, required: true },
    },
    subscription: {
      subscriptionPackageId: { type: Schema.Types.ObjectId, ref: 'SubscriptionPackage' },
      status: { type: String, enum: ['active', 'expired'] },
      lastBilledAt: { type: Date },
      expireDate: { type: Date },
    },
    commission: {
      rate: { type: Number },
      effectiveFrom: { type: Date },
      minimum: { type: Number },
      maximum: { type: Number },
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Organization Model
 */
export const Organization = model<TOrganization, OrganizationModel>('Organization', organizationSchema);
