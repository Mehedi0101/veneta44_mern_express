import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser, TRegisterUser } from './auth.interface';
import { createToken } from '../../utils/verifyJWT';
import { Organization } from '../organization/organization.model';
import mongoose from 'mongoose';
import { USER_ROLE, PERMISSION_LEVEL } from '../user/user.constant';

const registerOwner = async (payload: TRegisterUser) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = await User.isUserExistsByEmail(payload?.email);
    if (user) {
      throw new AppError(httpStatus.CONFLICT, 'This user already exists!');
    }

    // 1. Create minimal organization
    // Note: In a real flow, you might already have the organizationId or create it here.
    // For now, I'll assume we are creating a new one.
    const newOrganization = await Organization.create(
      [
        {
          organizationType: payload.organizationType,
          status: 'inactive',
          // Other fields would be filled during "Full Registration"
          companyInformation: {
            companyName: 'Pending...',
            companyAddress: 'Pending...',
            registrationNumber: 'Pending...',
            vatNumber: 'Pending...',
            tradingName: 'Pending...',
            tradingAddress: 'Pending...',
            yearsInBusiness: '0',
          },
          contactInformation: {
            ownerContactDetails: {
              name: payload.name,
              role: 'Owner',
              email: payload.email,
              phone: payload.phone,
            },
            accountContact: {
              name: payload.name,
              role: 'Owner',
              email: payload.email,
              phone: payload.phone,
            },
          },
          deliveryInformation: {
            contactName: payload.name,
            role: 'Owner',
            email: payload.email,
            phone: payload.phone,
          },
          referenceInformation: {
            reference1: { companyName: 'N/A', contactName: 'N/A', email: 'N/A' },
            reference2: { companyName: 'N/A', contactName: 'N/A', email: 'N/A' },
            howDidYouHearAboutUs: 'N/A',
          },
          paymentInformation: {
            paymentMethod: 'N/A',
            accountHolderName: 'N/A',
            bankName: 'N/A',
            bankAddress: 'N/A',
            sortCode: 'N/A',
            accountNumber: 'N/A',
          },
        },
      ],
      { session },
    );

    // 2. Create Owner user
    const newUser = await User.create(
      [
        {
          ...payload,
          organizationId: newOrganization[0]._id,
          role: USER_ROLE.OWNER,
          status: 'active',
          permissions: {
            accountPermission: PERMISSION_LEVEL.FULL,
            orderPermission: PERMISSION_LEVEL.FULL,
            postOrderPermission: PERMISSION_LEVEL.FULL,
            communicationPermission: PERMISSION_LEVEL.FULL,
            priceListPermission: payload.organizationType === 'supplier' ? PERMISSION_LEVEL.FULL : PERMISSION_LEVEL.NONE,
          },
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return newUser[0];
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password!');
  }

  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
  }

  if (user?.status === 'inactive') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is inactive!');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password!');
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const AuthServices = {
  registerOwner,
  loginUser,
};
