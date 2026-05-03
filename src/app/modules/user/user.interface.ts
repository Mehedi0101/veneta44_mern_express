import { Model, Types } from 'mongoose';
import { PERMISSION_LEVEL, USER_ROLE } from './user.constant';

export type TPermissionLevel = (typeof PERMISSION_LEVEL)[keyof typeof PERMISSION_LEVEL];

export type TUserPermissions = {
  accountPermission: TPermissionLevel;
  orderPermission: TPermissionLevel;
  postOrderPermission: TPermissionLevel;
  communicationPermission: TPermissionLevel;
  priceListPermission: TPermissionLevel; // supplier only
};

export type TUser = {
  organizationId: Types.ObjectId;
  organizationType: 'venue' | 'supplier';
  name: string;
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
  email: string;
  password: string;
  phone: string;
  status: 'active' | 'inactive';
  permissions: TUserPermissions;
  isDeleted: boolean;
  _id?: Types.ObjectId;
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser | null>;
  isUserExistsById(id: string): Promise<TUser | null>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
