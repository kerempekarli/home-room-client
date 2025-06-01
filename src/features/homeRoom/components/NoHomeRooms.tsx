// src/features/homeRoom/components/NoHomeRooms.tsx
import React from 'react';

const NoHomeRooms: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2a4 4 0 014-4h8m-4 4v6m0 0h4m-4 0H9m10 0v-6M5 3v3m0 0H3m2 0h2m1 0V3m0 0h2m-2 0h-2m-2 0a1 1 0 00-1 1v3a1 1 0 001 1h2"
                />
            </svg>
            <p className="text-gray-600 text-lg font-medium">
                Henüz HomeRoom eşleşmeniz yok.
            </p>
            <p className="text-gray-500 text-sm mt-2">
                Yeni dönemi bekleyin veya sistemden admin ile görüşün.
            </p>
        </div>
    );
};

export default NoHomeRooms;
