import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DureeKey } from "@/lib/utils/formatDuree";

type FiltreState = {
  themeChoisi: string | null;
  dureeChoisie: DureeKey | null;
  prix: number | null;
  nbPersonnes: number | null;
};

const initialState: FiltreState = {
  themeChoisi: null,
  dureeChoisie: null,
  prix: null,
  nbPersonnes: null,
};

const filtreSlice = createSlice({
  name: "filtre",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<string | null>) {
      state.themeChoisi = action.payload;
    },
    setDuree(state, action: PayloadAction<DureeKey | null>) {
      state.dureeChoisie = action.payload;
    },
    setPrix(state, action: PayloadAction<number | null>) {
      state.prix = action.payload;
    },
    setNbPersonnes(state, action: PayloadAction<number | null>) {
      state.nbPersonnes = action.payload;
    },
    resetFiltres() {
      return initialState;
    },
  },
});

export const { setTheme, setDuree, setPrix, setNbPersonnes, resetFiltres } =
  filtreSlice.actions;
export default filtreSlice.reducer;
