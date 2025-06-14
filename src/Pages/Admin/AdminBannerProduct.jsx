import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../../config/api.js';
import AddBannerProductModal from './AddBannerProductModal'; 

function AdminBannerProduct() {
    const [photoData, setPhotoData] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingImageUrl, setEditingImageUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/api/categories');
                
                setAllCategories(response.data.categories);

                const filteredCategories = response.data.categories.filter((photo) => photo.bannerPhoto !== null);
                setPhotoData(filteredCategories);
            } catch (error) {
                console.log(error.message);
                toast.error(error.message);
            }
        };

        fetchData();
    }, []);

    const handleSave = async (categoryId, imageUrl) => {
        try {
            await apiClient.put(`/api/categories/${categoryId}`, { bannerPhoto: imageUrl });
            setIsModalOpen(false);
            const updatedResponse = await apiClient.get('/api/categories');
            
            setAllCategories(updatedResponse.data.categories);

            const filteredCategories = updatedResponse.data.categories.filter((photo) => photo.bannerPhoto !== null);
            setPhotoData(filteredCategories);

            setEditingCategoryId(null);
            setEditingImageUrl('');
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEdit = (categoryId, imageUrl) => {
        setEditingCategoryId(categoryId);
        setEditingImageUrl(imageUrl);
        setIsModalOpen(true);
    };

    const handleDelete = async (categoryId) => {
        try {
            await apiClient.put(`/api/categories/${categoryId}`, { bannerPhoto: null });
            const updatedResponse = await apiClient.get('/api/categories');
            
            setAllCategories(updatedResponse.data.categories);

            const filteredCategories = updatedResponse.data.categories.filter((photo) => photo.bannerPhoto !== null);
            setPhotoData(filteredCategories);
            toast.success('Banner Product deleted Successfully');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='flex flex-col mt-14 p-4 sm:p-6 md:p-8'>
            <button
                onClick={() => setIsModalOpen(true)}
                className="mb-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
            >
                Add Banner Product
            </button>

            <div className='flex flex-wrap gap-5 justify-center'>
                {photoData.map((photo, index) => (
                    <div key={index} className='w-full sm:w-[48%] md:w-[45%] lg:w-[30%] h-[170px] relative'>
                        <Link to={`/product-category?category=${photo._id}`} className='flex w-full h-full z-10'>
                            <img src={photo.bannerPhoto} alt={photo.name} className="w-full h-full object-contain" />
                        </Link>
                        <button
                            onClick={() => handleEdit(photo._id, photo.bannerPhoto)}
                            className="absolute top-2 right-12 bg-yellow-500 hover:bg-yellow-600 text-white mx-10 px-3 py-1 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(photo._id)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            <AddBannerProductModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingCategoryId(null);
                    setEditingImageUrl('');
                }}
                onSave={handleSave}
                categories={allCategories}
                currentCategoryId={editingCategoryId}
                currentImageUrl={editingImageUrl}
            />
        </div>
    );
}

export default AdminBannerProduct;
