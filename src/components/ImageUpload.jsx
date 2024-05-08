import React, { useState, useRef } from 'react';

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];
            setSelectedImage(URL.createObjectURL(image));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => fileInputRef.current.click()}
            >
                Chọn ảnh
            </button>
            {selectedImage && (
                <img src={selectedImage} alt="Preview" className="max-w-xs max-h-xs rounded" />
            )}
        </div>
    );
};

export default ImageUpload;
