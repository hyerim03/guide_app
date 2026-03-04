import { create } from 'zustand';

const useMenuStore = create(set => ({
  num: 0,
  setNum: text => set({ num: text }),
}));

export default useMenuStore;
