import { create } from "zustand";

type BearStore = {
	bears: number;
	increasePopulation: () => void;
	removeAllBears: () => void;
	updateBears: (newBears: number) => void;
};

const useBear = create<BearStore>((set) => ({
	bears: 0,
	increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
	removeAllBears: () => set({ bears: 0 }),
	updateBears: (newBears) => set({ bears: newBears }),
}));
