import { LinkType } from '@/types/link.type';

export const UserLinks: LinkType[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Login',
    path: '/login',
  },
  {
    name: 'Register',
    path: '/register',
  },
];

export const AdminLinks: LinkType[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    name: 'Logout',
    path: '/logout',
  },
];
