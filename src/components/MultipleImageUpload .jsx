import React, { useState, useRef } from 'react';

const MultipleImageUpload = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const fileInputRef = useRef(null);

    const handleImagesChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );

            // Cập nhật trạng thái với mảng URL mới, hoặc bạn có thể thêm vào mảng hiện tại
            // setSelectedImages((prevImages) => prevImages.concat(filesArray));
            setSelectedImages([...filesArray]);

            // Optional: Nếu bạn muốn giữ input cho mỗi file để có thể xử lý sau này
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // Dọn dẹp bộ nhớ
            );
        }
    };

    const renderImagePreviews = () =>
        selectedImages.map((image, index) => (
            <img key={index} src={image} alt={`Preview ${index}`} className="max-w-xs max-h-xs rounded m-2" />
        ));

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                ref={fileInputRef}
                className="hidden"
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => fileInputRef.current.click()}
            >
                Chọn ảnh
            </button>
            <div className="flex flex-wrap justify-center">
                {renderImagePreviews()}
            </div>
        </div>
    );
};

export default MultipleImageUpload;
