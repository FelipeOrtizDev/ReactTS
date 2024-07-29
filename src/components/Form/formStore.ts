import create from 'zustand';
import { Acatamento } from '../../services/models/acatamentoModel';

interface FormState {
  acatamento: Partial<Acatamento>;
  setAcatamento: (data: Partial<Acatamento>) => void;
}

export const useFormStore = create<FormState>((set) => ({
  acatamento: {},
  setAcatamento: (data) => set((state) => ({ acatamento: { ...state.acatamento, ...data } })),
}));