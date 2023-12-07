import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUserConversation: null
}

const userChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setSelectedUserConversation: (state, action) => {
            state.selectedUserConversation = action.payload;
            localStorage.setItem('selectedUserConversation', JSON.stringify(action.payload));
        },
    }
})



export const { setSelectedUserConversation } = userChatSlice.actions

export default userChatSlice.reducer;