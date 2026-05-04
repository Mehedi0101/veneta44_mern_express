import { Model, Types } from 'mongoose';
import { ORGANIZATION_STATUS, ORGANIZATION_TYPE } from './organization.constant';

/**
 * Basic Types
 */
export type TOrganizationType = (typeof ORGANIZATION_TYPE)[keyof typeof ORGANIZATION_TYPE];
export type TOrganizationStatus = (typeof ORGANIZATION_STATUS)[keyof typeof ORGANIZATION_STATUS];

/**
 * Company Information
 */
export type TCompanyInformation = {
  companyName: string;
  companyAddress: string;
  registrationNumber: string;
  vatNumber: string;
  tradingName: string;
  tradingAddress: string;
  yearsInBusiness: string;
};

/**
 * Contact Details
 */
export type TContactDetails = {
  name: string;
  role: string;
  email: string;
  phone: string;
};

/**
 * Contact Information
 */
export type TContactInformation = {
  ownerContactDetails: TContactDetails;
  accountContact: TContactDetails;
};

/**
 * Delivery Information
 */
export type TDeliveryInformation = {
  contactName: string;
  role: string;
  email: string;
  phone: string;
  minimumOrderForDelivery?: string;
  deliveryTimesAvailable?: string[];
  deliveryAreas?: string[];
  deliveryDays?: string[];
  offDays?: string[];
};

/**
 * Reference Details
 */
export type TReference = {
  companyName: string;
  contactName: string;
  email: string;
};

/**
 * Reference Information
 */
export type TReferenceInformation = {
  reference1: TReference;
  reference2: TReference;
  howDidYouHearAboutUs: string;
  agentName?: string;
};

/**
 * Payment Information
 */
export type TPaymentInformation = {
  paymentMethod: string;
  accountHolderName: string;
  bankName: string;
  bankAddress: string;
  sortCode: string;
  accountNumber: string;
};

/**
 * Subscription Details
 */
export type TSubscription = {
  subscriptionPackageId: Types.ObjectId;
  status: 'active' | 'expired';
  lastBilledAt: Date;
  expireDate: Date;
};

/**
 * Commission Details
 */
export type TCommission = {
  rate: number;
  effectiveFrom: Date;
  minimum: number;
  maximum: number;
};

/**
 * Main Organization Type
 */
export type TOrganization = {
  organizationType: TOrganizationType;
  status: TOrganizationStatus;
  companyInformation: TCompanyInformation;
  contactInformation: TContactInformation;
  deliveryInformation: TDeliveryInformation;
  referenceInformation: TReferenceInformation;
  paymentInformation: TPaymentInformation;
  subscription?: TSubscription;
  commission?: TCommission;
};

/**
 * Organization Model Type
 */
export type OrganizationModel = Model<TOrganization>;
