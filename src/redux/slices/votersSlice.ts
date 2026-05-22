import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  votersList: [],
};

const voterSlice = createSlice({
  name: 'voter',
  initialState,
  reducers: {
    setVotersList: (state, action) => {
      state.votersList = action.payload;
    },
  },
});

export const { setVotersList } = voterSlice.actions;

export default voterSlice.reducer;
