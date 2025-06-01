// src/features/homeRoom/components/MeetItem.tsx
import React from 'react';
import type { MeetDTO } from '../types/homeRoom';

interface Props {
    meet: MeetDTO;
}

const MeetItem: React.FC<Props> = ({ meet }) => {
    const start = new Date(meet.startAt).toLocaleString();
    const end = new Date(meet.endAt).toLocaleString();
    const participants = meet.participants.map((u) => u.name).join(', ');

    return (
        <tr className="border-b hover:bg-gray-50 transition-colors duration-150">
            <td className="py-2 px-4 text-sm text-gray-700">{meet.meetId}</td>
            <td className="py-2 px-4 text-sm text-gray-700">{start}</td>
            <td className="py-2 px-4 text-sm text-gray-700">{end}</td>
            <td className="py-2 px-4 text-sm text-gray-700">{participants}</td>
        </tr>
    );
};

export default MeetItem;
