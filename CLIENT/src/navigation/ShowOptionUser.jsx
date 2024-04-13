import path from "~/utils/path";

export const showOptionsUser = [
    {
        id: 'personal' ,
        name: 'Personal',
        cole: 'CUSTOMER',
        path: `/${path.USER_LAYOUT}/${path.PERSONAL}`
    },
    {
        id: 'agent' ,
        name: 'Agent',
        cole: 'AGENT',
        path: `/${path.AGENT_LAYOUT}/${path.AGENT_DASHBOAR}`
    },
    {
        id: 'owner' ,
        name: 'Owner',
        cole: 'PROPERTY_OWNER',
        path: `/${path.OWNER_LAYOUT}/${path.OWNER_DASHBOAR}`
    },
    {
        id: 'admin' ,
        name: 'ADMIN',
        cole: 'ADMIN',
        path: `/${path.ADMIN_LAYOUT}/${path.ADMIN_DASHBOARD}`
    }
    

]