export type TLoginUser = {
  email: string;
  password: string;
};

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  organizationId: string;
  organizationType: 'venue' | 'supplier';
};
