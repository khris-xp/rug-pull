import BaseLayout from '@/layouts/BaseLayout';
import HomePage from '@/views/HomePage';
import LoginPage from '@/views/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
