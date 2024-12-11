// src/utils/adminAuth.ts
import { User } from 'firebase/auth';

const ADMIN_EMAILS = ['krishnashekhar27@gmail.com',
  'shekhar.ginnihouse@gmail.com']; // Add your admin email(s)

export const isAdmin = (user: User | null): boolean => {
  return user?.email ? ADMIN_EMAILS.includes(user.email) : false;
};