import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: "",
  userName: "",
  id:0,
  refresh:false,
}

export const userSlicer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeToken: (state, action) => {
      state.token = action.payload
    },
    changeName: (state, action) => {
      state.userName = action.payload
    },
    changeId: (state, action) => {
      state.id = action.payload
    },
    changeRefresh: (state, action) => {
      state.refresh = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeToken ,changeName,changeId,changeRefresh} = userSlicer.actions

export default userSlicer.reducer