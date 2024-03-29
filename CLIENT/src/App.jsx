import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import path from './utils/path';
import { AboutUs, Home, OurAgents, Properties, PublicLayout, Search } from './pages/public';
import { Modal } from './components';
import { useAppStore } from './store/useAppStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserStore } from './store/useUserStore';

const App = () => {
    const { isShowModal } = useAppStore();

    const { getCurrentUser, current, token } = useUserStore();
    useEffect(() => {
        if (token) {
            getCurrentUser()
        }
    }, [token])

    return (
        <>
            {isShowModal && <Modal />}

            <Routes>
                <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />} > // parent
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.ABOUT_US} element={<AboutUs />} />
                    <Route path={path.OUR_AGENTS} element={<OurAgents />} />
                    <Route path={path.PROPERTIES} element={<Properties />} />
                    <Route path={path.SEARCH} element={<Search />} />
                </Route>
                {/* Trang lồng trang  */}
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition:Bounce
            />
        </>
    );
};

export default App;