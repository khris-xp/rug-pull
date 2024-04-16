import { LinkType } from '@/types/link.type';

export const Links: LinkType[] = [
  {
    name: 'Login',
    path: '/login',
  },
  {
    name: 'Register',
    path: '/register',
  },
];

export const UserLinks: LinkType[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Board Games',
    path: '/board-games',
  },
  {
    name: 'About us',
    path: '/about-us',
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
