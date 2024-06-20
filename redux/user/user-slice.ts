import { createSlice } from "@reduxjs/toolkit";

interface IUserInitialState {
  userAddress: string | null;
  isLoading: boolean;
  prevConnector: number | null; // Chain ID Number Order of ArgentX , Bravoos, ArgentMobile
  isFlipping: boolean;
}
const initialState: IUserInitialState = {
  userAddress: null,
  isLoading: false,
  prevConnector: null,
  isFlipping: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAdress: (state, action) => {
      state.userAddress = action.payload;
    },
    setUserLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setConnector: (state, action) => {
      state.prevConnector = action.payload;
    },
    setFlipping: (state, action) => {
      state.isFlipping = action.payload;
    },
    logout: (state) => {
      state.userAddress = null;
      state.prevConnector = null;
      state.isLoading = false;
    },
  },
});
export const {
  setUserAdress,
  setUserLoading,
  setConnector,
  logout,
  setFlipping,
} = userSlice.actions;
