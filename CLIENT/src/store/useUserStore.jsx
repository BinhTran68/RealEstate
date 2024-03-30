import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { apiGetCurrentByToken, apiGetRoles } from '~/api/user';

// Create in zustand. it can create a store to manage state application
// create useUserStore to mange auth app 
// persist is middleware of Zustand. It can be save sate to localstore or seession store
export const useUserStore = create(persist((set, get) => ({
    token: null,
    current: null,
    roles: [],
    setToken: (newToken) => set(() => ({ token: newToken })), // function token have token. use set in zustand set value token in 
    getCurrentUser: async () => {
        const response = await apiGetCurrentByToken()
        if (response.success) {
            return set(() => ({ current: response.currentUser }))
        }else {
            return set(() => ({ current: null}))
        }
    },
    getRoles: async () => {
        const response = await apiGetRoles()
        if (response.success) {
            return set(() => ({ roles: response.roles }))
        }else {
            return set(() => ({ roles: []}))
        }
    }
}),
    {
        name: 'BatDongSan.com',
        storage: createJSONStorage(() => localStorage),
        // Which object want save to localstorage. return to localstore
        partialize: (state) => {
            const { token, current } = state;
            return { token, current };
        }
    }
))
