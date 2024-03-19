import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Create in zustand. it can create a store to manage state application
// create useUserStore to mange auth app 
// persist is middleware of Zustand. It can be save sate to localstore or seession store
export const useUserStore = create(persist((set, get) => ({
    token: null,
    current: null,
    setToken: (newToken) => set(() => ({ token : newToken })) // function token have token. use set in zustand set value token in 
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
