import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AddBannerProductModal({ isOpen, onClose, onSave, categories, currentCategoryId, currentImageUrl }) {
    const [selectedCategory, setSelectedCategory] = useState(currentCategoryId || '');
    const [imageUrl, setImageUrl] = useState(currentImageUrl || '');

    useEffect(() => {
        setSelectedCategory(currentCategoryId || '');
        setImageUrl(currentImageUrl || '');
    }, [currentCategoryId, currentImageUrl]);

    const handleSave = () => {
        onSave(selectedCategory, imageUrl);
        toast.success('Banner Product Saved Successfully');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-6">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                <h2 className="text-xl mb-4">{currentCategoryId ? 'Edit Banner Product' : 'Add Banner Product'}</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        disabled={!!currentCategoryId}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Image URL
                    </label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddBannerProductModal;
