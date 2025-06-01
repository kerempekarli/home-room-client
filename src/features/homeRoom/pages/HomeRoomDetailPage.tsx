import React from 'react';
import { useParams } from 'react-router-dom';
import { useHomeRoomDetail } from '../hooks/useHomeRoomDetail';
import HomeRoomDetailHeader from '../components/HomeRoomDetailHeader';
import MeetList from '../components/MeetList';
import { Spinner } from '@/components/ui/spinner';

const HomeRoomDetailPage: React.FC = () => {
    const { id: homeRoomId } = useParams<{ id: string }>();
    const { data, isLoading, error } = useHomeRoomDetail(homeRoomId!);

    if (isLoading) return <Spinner />;
    if (error || !data) return <div>HomeRoom detayları alınırken hata!</div>;

    return (
        <div className="p-4">
            <HomeRoomDetailHeader homeRoom={data} />
            <MeetList meets={data.meets} />
        </div>
    );
};

export default HomeRoomDetailPage;
