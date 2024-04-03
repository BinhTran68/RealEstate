import path from "~/utils/path";
import { RiDashboardLine } from "react-icons/ri";
import { BsFillHouseGearFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

export const adminNavigations = [
    {
        id: 'admin-dashboard',
        name: 'Dashboard',
        path: `/${path.ADMIN_LAYOUT}/${path.DASHBOARD}`,
        icon: <RiDashboardLine />,
        type: 'SINGLE'

    },
    {
        id: 13,
        name: 'Property type',
        path: ``,
        icon: <BsFillHouseGearFill />,
        type: 'PARENT',
        subs: [
            {
                id: 'create-property',
                name: 'Create new',
                path: `/${path.ADMIN_LAYOUT}/${path.CREATE_PROPERTY_TYPE}`,
            },
            {
                id: 'manage-property',
                name: 'Manage',
                path: `/${path.ADMIN_LAYOUT}/${path.MANAGE_PROPERTY_TYPE}`,
            },

        ]
    },
    {
        id: 'home-client',
        name: 'Go Home Page',
        path: `/${path.HOME}`,
        icon: <FaHome />,
        type: 'SINGLE'

    },
]