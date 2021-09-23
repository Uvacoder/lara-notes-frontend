import { Counter } from "../features/counter/Counter";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { SimpleGrid, Box, Flex, Center, Text } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Notes from "../components/Notes";
import NoteEditor from "../components/NoteEditor";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncGetAllNotes } from "../features/notes/notesSlice";

export default function Home() {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetAllNotes());
  }, []);
  return (
    <>
      <Flex h="100vh" bg="#F4F4F4">
        <Box w="250px" bg="#F4F4F4" border="1px">
          <Sidebar />
        </Box>
        <Box
          w="500px"
          pt="10px"
          border="1px solid #00FFFF"
          style={{
            "overflowY": "scroll",
            "-ms-overflow-style": "none" /* Internet Explorer 10+ */,
            "scrollbar-width": "none" /* Firefox */,
          }}
        >
          <Notes notes={notes} bg="#ffffff"/>
        </Box>
        <Box w="100%" border="1px" bg="#ffffff">
          <NoteEditor />
        </Box>
      </Flex>
    </>
  );
}
