// src/features/homeRoom/components/HomeRoomCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import type { HomeRoom } from '../types/homeRoom';

interface Props {
  homeRoom: HomeRoom;
}

const HomeRoomCard: React.FC<Props> = ({ homeRoom }) => {
  const start = new Date(homeRoom.cycleStart).toLocaleDateString();
  const end = new Date(homeRoom.cycleEnd).toLocaleDateString();

  return (
    <Link to={`/home-rooms/${homeRoom.homeRoomId}`}>
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-150 cursor-pointer bg-white">
        <h2 className="text-lg font-semibold">
          {start} − {end}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Toplam {homeRoom.meets.length} toplantı
        </p>
      </div>
    </Link>
  );
};

export default HomeRoomCard;
