
export enum Screen {
  HOME = 'HOME',
  PERSONAL = 'PERSONAL',
  DRIVERS = 'DRIVERS',
  BUSINESS = 'BUSINESS',
  NEGATIVE = 'NEGATIVE',
  MY_REQUESTS = 'MY_REQUESTS',
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  ADMIN_DETAILS = 'ADMIN_DETAILS'
}

export type LoanStatus = 'Em análise' | 'Aprovado' | 'Recusado';

export interface Application {
  id: string;
  type: Screen;
  typeName: string;
  status: LoanStatus;
  date: string;
  formData: any;
  images: { [key: string]: string }; // Base64 simulated paths
}
