import React from 'react';
import AdminProductList from '../../Components/Admin/AdminProductList';

const AdminPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
                    <p className="text-gray-600 mt-2">Manage your products and store settings</p>
                </div>
                
                <AdminProductList />
            </div>
        </div>
    );
};

export default AdminPage; 