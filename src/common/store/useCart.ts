import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CART } from "@/common/constants/general";
import { OrderRes } from "@/common/types/general";

type State = { phones: number[]; quantities: number[]; isAnonymous: boolean };

type Actions = {
  setCart: (data: OrderRes) => void;
  setAnonCart: (data: { phones: number[]; quantities: number[] }) => void;
  removeCart: () => void;
};

const useCart = create(
  persist<State & Actions>(
    (set) => ({
      phones: [],
      quantities: [],
      isAnonymous: true,
      setCart: (data) =>
        set({
          phones: data.items.map((item) => item.mobile.id),
          quantities: data.items.map((item) => item.quantity),
          isAnonymous: false,
        }),
      setAnonCart: (data) =>
        set({
          phones: data.phones,
          quantities: data.quantities,
          isAnonymous: true,
        }),
      removeCart: () => set({ phones: [], quantities: [] }),
    }),
    {
      name: CART,
    },
  ),
);

export default useCart;
