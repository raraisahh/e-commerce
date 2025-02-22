import React from 'react';

function NotFound() {
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <h2 className="text-3xl font-bold text-red-500 mb-4">404 Not Found</h2>
            <p className="text-lg text-gray-600">Halaman tidak ditemukan</p>
        </div>
    );
}

export default NotFound;
