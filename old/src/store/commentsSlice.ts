import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CommentsState {
  [commentId: string]: SingleCommentState;
}

export interface SingleCommentState {
  id: string;
  visibleComments?: boolean;
  addingNewComment?: boolean;
}

const initialState = <CommentsState>{};
export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    modifyMany: (state, action: PayloadAction<CommentsState>) => {
      const result = { ...state };
      Object.entries(action.payload).forEach(([id, data]) => {
        result[id] = { ...state[id], ...data };
      });
      return result;
    },
    modifyOne: (state, action: PayloadAction<SingleCommentState>) => {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    },
  },
});

export const { modifyMany, modifyOne } = commentsSlice.actions;

export default commentsSlice.reducer;
