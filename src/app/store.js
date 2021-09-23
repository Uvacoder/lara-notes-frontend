import { configureStore } from "@reduxjs/toolkit";
import { notesSlice } from "../features/notes/notesSlice";
import { tagsSlice } from "../features/tags/tagSlice";

export const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
    tags:tagsSlice.reducer
  },
});
