import React, { useState, ReactNode } from 'react';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import Navigation from '~/components/Navigation';

const DefaultLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="dark:bg-boxdark-2 dark:text-whiten ">
            <div className=" ">
                <div className="relative min-h-screen flex flex-col ">
                    {/* <!-- ===== Header Start ===== --> */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <Navigation />
                    {/* <!-- ===== Main Content Start ===== --> */}
                    <main className="flex-grow mt-0.5 mb-10 ">
                        {children}
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                    <Footer />
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
    );
};

export default DefaultLayout;
