import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null,
}

export const tvSlice = createSlice({
  name: 'TV',
  initialState,
  reducers: {
    loadTV:(state, action)=>{
        state.info=action.payload;
    },
    removeTV:(state, action)=>{
        state.info = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { loadTV, removeTV } = tvSlice.actions

export default tvSlice.reducer