// src/features/homeRoom/components/HomeRoomList.tsx
import React from 'react';
import HomeRoomCard from './HomeRoomCard';
import NoHomeRooms from './NoHomeRooms';
import type { HomeRoom } from '../types/homeRoom';

interface Props {
  homeRooms: HomeRoom[];
}

const HomeRoomList: React.FC<Props> = ({ homeRooms }) => {
  if (!homeRooms || homeRooms.length === 0) {
    return <NoHomeRooms />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {homeRooms.map((hr) => (
        <HomeRoomCard key={hr.homeRoomId} homeRoom={hr} />
      ))}
    </div>
  );
};

export default HomeRoomList;
