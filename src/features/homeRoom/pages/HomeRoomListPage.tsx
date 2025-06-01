import React from 'react';
import { useHomeRooms } from '../hooks/useHomeRooms';
import HomeRoomList from '../components/HomeRoomList';
import {Spinner} from '@/components/ui/spinner';

const HomeRoomListPage: React.FC = () => {
    const { data: homeRooms, isLoading, error } = useHomeRooms();

    if (isLoading) return <Spinner />;
    if (error) return <div>HomeRoom verisi yüklenirken hata oluştu.</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Aktif & Geçmiş HomeRoom’larınız</h1>
            {homeRooms && homeRooms.length > 0
                ? <HomeRoomList homeRooms={homeRooms} />
                : <p>Henüz hiçbir HomeRoom eşleşmeniz yok.</p>
            }
        </div>
    );
};

export default HomeRoomListPage;
