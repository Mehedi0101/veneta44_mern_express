import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { ORGANIZATION_TYPE } from '../organization/organization.constant';
import { PERMISSION_LEVEL, USER_ROLE, USER_STATUS } from './user.constant';
import { IUserModel, TUser } from './user.interface';

/**
 * User Permissions Schema
 */
const userPermissionsSchema = new Schema({
  accountPermission: { type: String, enum: Object.values(PERMISSION_LEVEL), default: PERMISSION_LEVEL.NONE },
  orderPermission: { type: String, enum: Object.values(PERMISSION_LEVEL), default: PERMISSION_LEVEL.NONE },
  postOrderPermission: { type: String, enum: Object.values(PERMISSION_LEVEL), default: PERMISSION_LEVEL.NONE },
  communicationPermission: { type: String, enum: Object.values(PERMISSION_LEVEL), default: PERMISSION_LEVEL.NONE },
  priceListPermission: { type: String, enum: Object.values(PERMISSION_LEVEL), default: PERMISSION_LEVEL.NONE },
}, { _id: false });

/**
 * Main User Schema
 */
const userSchema = new Schema<TUser, IUserModel>(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    organizationType: { type: String, enum: Object.values(ORGANIZATION_TYPE), required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    phone: { type: String, required: true },
    role: { type: String, enum: Object.values(USER_ROLE), required: true },
    status: { type: String, enum: Object.values(USER_STATUS), default: USER_STATUS.ACTIVE },
    permissions: { type: userPermissionsSchema, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

/**
 * Pre-save Hook: Password Hashing
 */
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next();
});

/**
 * Post-save Hook: Remove Password from response
 */
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

/**
 * Static Method: Check if user exists by email
 */
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password');
};

/**
 * Static Method: Verify password match
 */
userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

/**
 * User Model
 */
export const User = model<TUser, IUserModel>('User', userSchema);
