import Header from '@/components/Header/Header';
import NotistackProvider from '@/providers/notistack.provider';
import { Outlet } from 'react-router-dom';

export default function BaseLayout() {
  return (
    <div className='flex flex-col min-h-screen font-Ubuntu'>
      <NotistackProvider>
        <Header />
        <Outlet />
      </NotistackProvider>
    </div>
  );
}
