import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import path from '~/utils/path';
import { AboutUs, Home, OurAgents, Properties, PublicLayout, Search } from '~/pages/public';
import { Modal } from '~/components';
import { useAppStore } from '~/store/useAppStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserStore } from '~/store/useUserStore';
import AdminLayout from '~/pages/admin/AdminLayout';
import Dashboard from '~/pages/admin/Dashboard';
import CreateaPropertyType from '~/pages/admin/property-type/CreateaPropertyType';
import ManagePropertyType from '~/pages/admin/property-type/ManagePropertyType';
import UserLayout from '~/pages/user/UserLayout';
import Personal from '~/pages/user/Personal';


const App = () => {
    const { isShowModal } = useAppStore();

    const { getCurrentUser, current, token, getRoles } = useUserStore();
    useEffect(() => {
        if (token) {
            getCurrentUser()
        }
        getRoles()
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

                {/* ADMIN ROUTES */}
                <Route path={path.ADMIN_LAYOUT} element={<AdminLayout />}>
                    <Route path={path.ADMIN_DASHBOARD} element={<Dashboard />} />
                    <Route path={path.CREATE_PROPERTY_TYPE} element={<CreateaPropertyType />} />
                    <Route path={path.MANAGE_PROPERTY_TYPE} element={<ManagePropertyType />} />
                </Route>

                {/* USER ROUTE */}
                <Route path={path.USER_LAYOUT} element={<UserLayout />}>
                    <Route path={path.PERSONAL} element={<Personal />} />
                </Route>

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