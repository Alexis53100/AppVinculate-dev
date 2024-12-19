import { create } from "zustand";
import { useShallow } from 'zustand/react/shallow'

export interface AppProfileState {
    veda:boolean;
}

const appProfileStore = create<AppProfileState>()(() => ({
    veda:true 
}));

export const isVeda = () => {
    const veda = appProfileStore(useShallow((state) => state.veda))
    return veda;
}

