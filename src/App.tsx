import BaseLayout from '@/layouts/BaseLayout';
import BoardGameDetailsPage from '@/views/BoardGameDetailsPage';
import BoardGamePage from '@/views/BoardGamePage';
import CreateRoomPage from '@/views/CreateRoomPage';
import CreateStatusPage from '@/views/CreateStatusPage';
import CreateTopicsPage from '@/views/CreateTopicsPage';
import HomePage from '@/views/HomePage';
import LoginPage from '@/views/LoginPage';
import ProfilePage from '@/views/ProfilePage';
import RegisterPage from '@/views/RegisterPage';
import RoomDashboardPage from '@/views/RoomDashboardPage';
import StatusDashboardDetailsPage from '@/views/StatusDashboardDetailsPage';
import StatusDashboardPage from '@/views/StatusDashboardPage';
import TopicsDashboardDetailsPage from '@/views/TopicsDashboardDetailsPage';
import TopicsDashboardPage from '@/views/TopicsDashboardPage';
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
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/board-games' element={<BoardGamePage />} />
          <Route path='/board-game/:id' element={<BoardGameDetailsPage />} />
          <Route path='/dashboard/room' element={<RoomDashboardPage />} />
          <Route path='/dashboard/create-room' element={<CreateRoomPage />} />
          <Route path='/dashboard/topics' element={<TopicsDashboardPage />} />
          <Route
            path='/dashboard/topics/:id'
            element={<TopicsDashboardDetailsPage />}
          />
          <Route
            path='/dashboard/create-topics'
            element={<CreateTopicsPage />}
          />
          <Route path='/dashboard/status' element={<StatusDashboardPage />} />
          <Route
            path='/dashboard/create-status'
            element={<CreateStatusPage />}
          />
          <Route
            path='/dashboard/status/:id'
            element={<StatusDashboardDetailsPage />}
          />
        </Route>
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
