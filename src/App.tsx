import BaseLayout from '@/layouts/BaseLayout';
import AboutusPage from '@/views/AboutusPage';
import BoardGameDashboardDetailsPage from '@/views/BoardGameDashboardDetailsPage';
import BoardGameDasgboardPage from '@/views/BoardGameDashboardPage';
import BoardGameDetailsPage from '@/views/BoardGameDetailsPage';
import BoardGamePage from '@/views/BoardGamePage';
import BookingDashboardPage from '@/views/BookingDashboardPage';
import CategoryDashboardDetailsPage from '@/views/CategoryDashboardDetailsPage';
import CateogryDashboradPage from '@/views/CategoryDashboardPage';
import CreateBoardGamePage from '@/views/CreateBoardGamePage';
import CreateCategoryPage from '@/views/CreateCategoryPage';
import CreateRoomPage from '@/views/CreateRoomPage';
import CreateStatusPage from '@/views/CreateStatusPage';
import CreateTablePage from '@/views/CreateTablePage';
import CreateTopicsPage from '@/views/CreateTopicsPage';
import HomePage from '@/views/HomePage';
import LoginPage from '@/views/LoginPage';
import PaymentSuccessPage from '@/views/PaymentSuccess';
import ProfilePage from '@/views/ProfilePage';
import RegisterPage from '@/views/RegisterPage';
import RoomDashboardDetailsPage from '@/views/RoomDashboardDetailsPage';
import RoomDashboardPage from '@/views/RoomDashboardPage';
import StatusDashboardDetailsPage from '@/views/StatusDashboardDetailsPage';
import StatusDashboardPage from '@/views/StatusDashboardPage';
import TabldeDasboardDetailsPage from '@/views/TableDasboardDetailsPage';
import TableDashboardPage from '@/views/TableDashboardPage';
import TopicsDashboardDetailsPage from '@/views/TopicsDashboardDetailsPage';
import TopicsDashboardPage from '@/views/TopicsDashboardPage';
import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookingDashboardDetailsPage from './views/BookingDashboardDetailsPage';

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
          <Route path='/dashboard/booking' element={<BookingDashboardPage />} />
          <Route
            path='/dashboard/board-game'
            element={<BoardGameDasgboardPage />}
          />
          <Route
            path='/dashboard/create-boardgame'
            element={<CreateBoardGamePage />}
          />
          <Route
            path='/dashboard/board-game/:id'
            element={<BoardGameDashboardDetailsPage />}
          />
          <Route path='/dashboard/room' element={<RoomDashboardPage />} />
          <Route
            path='/dashboard/room/:id'
            element={<RoomDashboardDetailsPage />}
          />
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
          <Route
            path='/dashboard/category'
            element={<CateogryDashboradPage />}
          />
          <Route
            path='/dashboard/create-category'
            element={<CreateCategoryPage />}
          />
          <Route
            path='/dashboard/category/:id'
            element={<CategoryDashboardDetailsPage />}
          />
          <Route path='/dashboard/table' element={<TableDashboardPage />} />
          <Route path='/dashboard/create-table' element={<CreateTablePage />} />
          <Route
            path='/dashboard/table/:id'
            element={<TabldeDasboardDetailsPage />}
          />
          <Route path='/about-us' element={<AboutusPage />} />
          <Route path='/payment-success' element={<PaymentSuccessPage />} />
          <Route
            path='/dashboard/booking/:id'
            element={<BookingDashboardDetailsPage />}
          />
        </Route>
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
