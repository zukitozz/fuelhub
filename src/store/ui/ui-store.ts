import { create } from 'zustand';

interface State {
  isSideMenuOpen: boolean;
  isVisible: boolean;
  message?: string;
  type?: 'undefined' | 'info' | 'success' | 'warning' | 'error';

  openSideMenu: () => void;
  closeSideMenu: () => void;

  showAlert: (mensaje: string, type: 'undefined' | 'info' | 'success' | 'warning' | 'error', duration?: number) => void;
  closeAlert: () => void;
}


export const useUIStore = create<State>()((set) => ({
  isSideMenuOpen: false,
  isVisible: false,

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
  showAlert: (message: string, type: 'undefined' | 'info' | 'success' | 'warning' | 'error', duration = 3000) => {
    set({message, type, isVisible: true })
    if (duration > 0) {
      setTimeout(() => {
        set({ isVisible: false, message: '', type: 'undefined' });
      }, duration);
    }    
  },
  closeAlert: () => set({ 
    message: '',
    type: 'undefined',
    isVisible: false
  }),
}));