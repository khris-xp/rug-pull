import {
  AdminLinks,
  AuthLinks,
  DropdownLinks,
  UserLinks,
} from '@/constants/link';
import { setAuthState } from '@/store/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

export default function Header() {
  const userData = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  function logout() {
    dispatch(setAuthState({ user: null, accessToken: '', refreshToken: '' }));
    Cookies.remove('token');
    window.location.href = '/';
  }

  let links;

  if (userData?.role === 'admin') {
    links = AdminLinks;
  } else if (userData?.role === 'User') {
    links = AuthLinks;
  } else {
    links = UserLinks;
  }

  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            {links.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
            {userData && userData.role === 'admin' && (
              <li>
                <details>
                  <summary>Dashboard</summary>
                  <ul className='p-2 z-10'>
                    {DropdownLinks.map((link) => (
                      <li key={link.path}>
                        <Link to={link.path}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            )}
          </ul>
        </div>
        <a href='/' className='btn btn-ghost text-xl'>
          Rug Pull
        </a>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          {links.map((link) => (
            <li key={link.path}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
          {userData && userData.role === 'admin' && (
            <li>
              <details>
                <summary>Dashboard</summary>
                <ul className='p-2 z-10'>
                  {DropdownLinks.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          )}
        </ul>
      </div>
      <div className='navbar-end'>
        {userData ? (
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 rounded-full'>
                <img
                  alt='Tailwind CSS Navbar component'
                  src={userData.pictureProfile}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <a className='justify-between' href='/profile'>
                  Profile
                  <span className='badge'>New</span>
                </a>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <ul className='menu menu-horizontal px-1'>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
