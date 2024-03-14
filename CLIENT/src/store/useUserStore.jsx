import { create } from 'zustand'

export const useUserStore = create(() => {
    return {
        token: null,
        current: null,
        
    }
})
