import path from "./path";
import { RiDashboardLine } from "react-icons/ri";
import { BsFillHouseGearFill } from "react-icons/bs";

export const navigations = [
    {
        id: 1,
        path: `${path.HOME}`,
        text: 'HOME'
    },
    {
        id: 2,
        path: `${path.ABOUT_US}`,
        text: 'ABOUT US'
    },
    {
        id: 3,
        path: `${path.OUR_AGENTS}`,
        text: 'OUR_AGENTS'
    },
    {
        id: 4,
        path: `${path.PROPERTIES}`,
        text: 'PROPERTIES'
    },
    {
        id: 5,
        path: `${path.SEARCH}`,
        text: 'SEARCH'
    }
]

export const URL = "http://localhost:5000";

export const adminSidebar = [
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


]