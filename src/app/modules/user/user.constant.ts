/**
 * User Roles
 */
export const USER_ROLE = {
  OWNER: 'owner',
  USER: 'user',
  ADMIN: 'admin',
} as const;

/**
 * User Statuses
 */
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

/**
 * Permission Levels
 */
export const PERMISSION_LEVEL = {
  NONE: 'none',
  BASIC: 'basic',
  FULL: 'full',
} as const;
