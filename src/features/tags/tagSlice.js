import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../components/Axios";

export const asyncGetAllTags = createAsyncThunk(
  "tags/asyncGetAllTags",
  async () => {
    const result = await axios.get("/tags");
    return result.data;
  }
);
export const asyncCreateTag = createAsyncThunk(
  "tags/asyncCreateTag",
  async (tag) => {
    const tagCretaed = await axios.post(`/tags`,{"name":tag});
    const result = await axios.get("/tags");
    return result.data;
  }
);
export const asyncDeleteTag = createAsyncThunk(
  "tags/asyncDeleteTag",
  async (id) => {
    const deletedTag = await axios.delete(`/tags/${id}`);
    const result = await axios.get("/tags");
    return result.data;
  }
);
export const asyncSetActiveTag = createAsyncThunk(
  "tags/asyncSetActiveTag",
  async (tag) => {
    return tag;
  }
);

const options = {
  name: "tags",
  initialState: {
    tags: [],
    activeTag: [{ name: "all", id: null }]
  },
  reducers: {
    addTag: (state, action) => {
      state.tags.push(action.payload.data);
    },
    setActiveTag: (state, action) => {
      state.activeTag = action.payload;
    },
  },
  extraReducers: {
    [asyncGetAllTags.fulfilled]: (state, action) => {
      state.tags = action.payload.data;
    },
    [asyncSetActiveTag.fulfilled]: (state, action) => {
      state.activeTag = action.payload;
    },
    [asyncDeleteTag.fulfilled]: (state, action) => {
      state.tags = action.payload.data;
    },
    [asyncCreateTag.fulfilled]: (state, action) => {
      state.tags = action.payload.data;

    },
  },
};

export const tagsSlice = createSlice(options);
export const { addTag, setActiveTag } = tagsSlice.actions;
