import BaseLayout from '@/layouts/BaseLayout';
import HomePage from '@/views/HomePage';
import LoginPage from '@/views/LoginPage';
import RegisterPage from '@/views/RegisterPage';
import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const NoPage = lazy(() => import('@/views/NoPage'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
