
import { Outlet, type RouteObject } from 'react-router-dom';
import HomeRoomListPage from './pages/HomeRoomListPage';
import HomeRoomDetailPage from './pages/HomeRoomDetailPage';

const homeRoomRoutes: RouteObject[] = [
    {
        path: 'home-rooms',
        element: <Outlet />, // Eğer ayrı bir layout kullanmak istemiyorsanız direk <Outlet /> dönen basit bir component olabilir
        children: [
            { index: true, element: <HomeRoomListPage /> },
            { path: ':id', element: <HomeRoomDetailPage /> },
        ],
    },
];

export default homeRoomRoutes;
