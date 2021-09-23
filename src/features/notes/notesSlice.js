import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../components/Axios";

export const asyncGetAllNotes = createAsyncThunk(
  "notes/asyncGetAllNotes",
  async () => {
    const result = await axios.get("/notes");

    return result.data.data;
  }
);
export const asyncGetNote = createAsyncThunk(
  "notes/asyncGetNote",
  async (id) => {
    const result = await axios.get(`/notes/${id}`);
    console.log(result.data)
    return result.data.data[0];
  }
);
export const asyncSaveNote = createAsyncThunk(
  "notes/asyncSaveNote",
  async (note) => {
    if(note.id){

      await axios.put(`/notes/${note.id}`,note);
    }else{
      await axios.post(`/notes`,note);
    }
    const result = await axios.get("/notes");
    return result.data.data;
  }
);
export const asyncDeleteNote = createAsyncThunk(
  "notes/asyncDeleteNote",
  async (id) => {
    const deletedNote = await axios.delete(`/notes/${id}`);
    const result = await axios.get("/notes");
    return result.data.data;
  }
);
export const asyncGetTagNotes = createAsyncThunk(
  "notes/asyncGetTagNotes",
  async (id) => {
    let result;
    if (name.toLowerCase() == "all") {
      result = await axios.get(`/notes`);
    } else {
      console.log(id)
      result = await axios.get(`/tags/${id}`);
    }
    return result.data.data[0];
  }
);
const options = {
  name: "notes",
  initialState: {
    notes: [],
    activeNote: { },
  },
  reducers: {
    addNote: (state, action) => {
      state.notes.unshift(action.payload);
    },
    setActiveNote: (state, action) => {
      state.activeNote = action.payload;
    },
  },
  extraReducers: {
    [asyncGetAllNotes.fulfilled]: (state, action) => {
      state.notes = action.payload;
      state.activeNote = state.notes[0]
    },
    [asyncGetNote.fulfilled]: (state, action) => {
      state.activeNote = action.payload;
    },
    [asyncGetTagNotes.fulfilled]: (state, action) => {
      state.notes = action.payload.notes.data;
      console.log(action.payload.notes,"action.payload.notes")
      state.activeNote = state.notes[0]
    },
    [asyncDeleteNote.fulfilled]: (state, action) => {
      state.notes = action.payload;
    },
    [asyncSaveNote.fulfilled]: (state, action) => {
      state.notes = action.payload;
    },
  },
};

export const notesSlice = createSlice(options);
export const { addNote, setActiveNote } = notesSlice.actions;
