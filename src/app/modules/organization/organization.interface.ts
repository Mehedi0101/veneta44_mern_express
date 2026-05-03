import { Types } from 'mongoose';

export type TOrganizationType = 'venue' | 'supplier';
export type TOrganizationStatus = 'inactive' | 'active' | 'disabled';

export type TCompanyInformation = {
  companyName: string;
  companyAddress: string;
  registrationNumber: string;
  vatNumber: string;
  tradingName: string;
  tradingAddress: string;
  yearsInBusiness: string;
};

export type TContactDetails = {
  name: string;
  role: string;
  email: string;
  phone: string;
};

export type TContactInformation = {
  ownerContactDetails: TContactDetails;
  accountContact: TContactDetails;
};

export type TDeliveryInformation = {
  contactName: string;
  role: string;
  email: string;
  phone: string;
  minimumOrderForDelivery?: string; // supplier only
  deliveryTimesAvailable?: string[]; // supplier only
  deliveryAreas?: string[]; // supplier only
  deliveryDays?: string[]; // supplier only
  offDays?: string[]; // supplier only
};

export type TReference = {
  companyName: string;
  contactName: string;
  email: string;
};

export type TReferenceInformation = {
  reference1: TReference;
  reference2: TReference;
  howDidYouHearAboutUs: string;
  agentName?: string;
};

export type TPaymentInformation = {
  paymentMethod: string;
  accountHolderName: string;
  bankName: string;
  bankAddress: string;
  sortCode: string;
  accountNumber: string;
};

export type TSubscription = {
  subscriptionPackageId: Types.ObjectId;
  status: 'active' | 'expired';
  lastBilledAt: Date;
  expireDate: Date;
};

export type TCommission = {
  rate: number;
  effectiveFrom: Date;
  minimum: number;
  maximum: number;
};

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
  _id?: Types.ObjectId;
};
