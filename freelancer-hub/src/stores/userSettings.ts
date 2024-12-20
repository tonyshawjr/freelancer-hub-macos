import { create } from 'zustand';

interface UserSettings {
  firstName: string;
  lastName: string;
  email: string;
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
  setEmail: (email: string) => void;
}

export const useUserSettings = create<UserSettings>((set) => ({
  firstName: '',
  lastName: '',
  email: '',
  setFirstName: (name) => set({ firstName: name }),
  setLastName: (name) => set({ lastName: name }),
  setEmail: (email) => set({ email: email }),
}));
