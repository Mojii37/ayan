export type UserRole = 'admin' | 'user' | 'moderator' | 'guest' | 'support';
export type UserStatus = 'active' | 'inactive' | 'banned' | 'pending';

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: boolean;
  emailNotifications: boolean;
  timezone: string;
}

export interface UserProfile {
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  title?: string;
  skills?: string[];
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    [key: string]: string | undefined;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string;
  role?: UserRole;
  status?: UserStatus;
  profile?: UserProfile;
  settings?: UserSettings;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  metadata?: Record<string, unknown>;
}

export interface UserResponse {
  success: boolean;
  data?: {
    user?: User;
    users?: User[];
    total?: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

export const isUser = (user: unknown): user is User => {
  return (
    typeof user === 'object' &&
    user !== null &&
    'id' in user &&
    'name' in user &&
    'email' in user
  );
};

export const isUserResponse = (response: unknown): response is UserResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    typeof response.success === 'boolean'
  );
};

export const MOCK_USER: User = {
  id: 'usr_mojii37',
  name: 'Mojtaba',
  email: 'mojii37@example.com',
  username: 'Mojii37',
  avatar: 'https://github.com/Mojii37.png',
  role: 'admin',
  status: 'active',
  profile: {
    bio: 'Full Stack Developer',
    location: 'Iran',
    website: 'https://github.com/Mojii37',
    company: 'Ayan',
    title: 'Senior Developer',
    skills: ['TypeScript', 'React', 'Node.js'],
    social: {
      github: 'Mojii37'
    }
  },
  settings: {
    theme: 'dark',
    language: 'fa',
    notifications: true,
    emailNotifications: true,
    timezone: 'Asia/Tehran'
  },
  lastLoginAt: '2025-02-20T08:07:29Z',
  createdAt: '2024-02-20T08:07:29Z',
  updatedAt: '2025-02-20T08:07:29Z',
  deletedAt: null
};