import React from 'react';
import { PacmanLoader } from 'react-spinners';
import { useLoading } from '~/hooks/LoadingContext';

const LoadingWrapper = ({ children }) => {
    const { isLoading } = useLoading();

    return (
        <div className="relative w-full h-full">
            {children}
            {isLoading && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black dark:bg-white  bg-opacity-50  dark:bg-opacity-30 flex items-center justify-center z-50">
                    <PacmanLoader
                        color="#0000ff"  // Tailwind không trực tiếp hỗ trợ biến màu trong các props, nên bạn cần sử dụng mã màu hex hoặc bổ sung tùy chỉnh trong config của Tailwind.
                        loading={true}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            )}
        </div>
    );
};

export default LoadingWrapper;
