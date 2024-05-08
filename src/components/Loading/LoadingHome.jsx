import React from 'react';
import { PacmanLoader, RotateLoader, SyncLoader } from 'react-spinners';
import { useLoading } from '~/hooks/LoadingContext';

const LoadingHome = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
        }}>
            <RotateLoader
                color="black"
                loading={true}
                margin={8}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
                speedMultiplier={2}
            />
        </div>
    );
};

export default LoadingHome;
