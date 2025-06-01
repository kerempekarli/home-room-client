// src/features/homeRoom/components/MeetList.tsx
import React from 'react';
import type { MeetDTO } from '../types/homeRoom';
import MeetItem from './MeetItem';

interface Props {
  meets: MeetDTO[];
}

const MeetList: React.FC<Props> = ({ meets }) => {
  if (!meets || meets.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-600">
        Henüz bu dönem için planlanmış toplantı bulunmuyor.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Toplantı ID</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Başlangıç</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Bitiş</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Katılımcılar</th>
          </tr>
        </thead>
        <tbody>
          {meets.map((meet) => (
            <MeetItem key={meet.meetId} meet={meet} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetList;
