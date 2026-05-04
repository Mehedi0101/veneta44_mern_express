import { Model, Types } from 'mongoose';
import { PERMISSION_LEVEL, USER_ROLE, USER_STATUS } from './user.constant';
import { TOrganizationType } from '../organization/organization.interface';

/**
 * Basic Types
 */
export type TPermissionLevel = (typeof PERMISSION_LEVEL)[keyof typeof PERMISSION_LEVEL];
export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
export type TUserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

/**
 * User Permissions
 */
export type TUserPermissions = {
  accountPermission: TPermissionLevel;
  orderPermission: TPermissionLevel;
  postOrderPermission: TPermissionLevel;
  communicationPermission: TPermissionLevel;
  priceListPermission: TPermissionLevel; // supplier only
};

/**
 * Main User Type
 */
export type TUser = {
  organizationId: Types.ObjectId;
  organizationType: TOrganizationType;
  name: string;
  role: TUserRole;
  email: string;
  password: string;
  phone: string;
  status: TUserStatus;
  permissions: TUserPermissions;
  isDeleted: boolean;
};

/**
 * User Model Type (with static methods)
 */
export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser | null>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
