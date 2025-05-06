import { IUser } from '@/interfaces'
import { create } from 'zustand'

const userGlobalStore = create((set) => ({
  user: null,
  setUser: (user: IUser) => set({user})
}))

export default userGlobalStore

export interface IuserGlobalStore {
    user: IUser | null;
    setUser: (user: IUser) => void;
}