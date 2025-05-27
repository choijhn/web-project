import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useScrapbookStore = create(
  persist(
    (set) => ({
      scrapbook: [],

      setScrapbook: (items) => set({ scrapbook: items }),

      addScrapItem: (item) =>
        set((state) => ({ scrapbook: [...state.scrapbook, item] })),
      
      removeScrapItem: (id) =>
        set((state) => ({
          scrapbook: state.scrapbook.filter((item) => item.id !== id),
        })),

      clearScrapbook: () => set({ scrapbook: [] }),
    }),
    {
      name: 'scrapbook-storage', // 스토리지 이름
      getStorage: () => localStorage, // 로컬 스토리지 사용
    }
  )
);
export default useScrapbookStore;