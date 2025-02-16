export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    avatar?: string;
    role: string;
    status: 'active' | 'inactive';
    lastLogin?: string;
  }