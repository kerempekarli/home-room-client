// src/features/homeRoom/components/HomeRoomDetailHeader.tsx
import React from 'react';
import type { HomeRoomDetail } from '../types/homeRoom';

interface Props {
    homeRoom: HomeRoomDetail;
}

const HomeRoomDetailHeader: React.FC<Props> = ({ homeRoom }) => {
    const start = new Date(homeRoom.cycleStart).toLocaleDateString();
    const end = new Date(homeRoom.cycleEnd).toLocaleDateString();

    return (
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-2">HomeRoom Detayları</h1>
            <div className="text-gray-700">
                <span className="font-medium">Dönem:</span> {start} − {end}
            </div>
            <div className="mt-2 text-gray-600">
                <span className="font-medium">Toplam Toplantı:</span> {homeRoom.meets.length}
            </div>
        </div>
    );
};

export default HomeRoomDetailHeader;
