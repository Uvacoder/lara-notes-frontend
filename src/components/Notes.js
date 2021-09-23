import { Box, Center, Divider, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { AddIcon } from "@chakra-ui/icons";
import React from "react";
import Notecard from "./Notecard";
import { useDispatch, useSelector } from "react-redux";
import { addNote, setActiveNote } from "../features/notes/notesSlice";

function Notes({ notes }) {
  const activeTag = useSelector((state) => state.tags.activeTag);
  const dispatch = useDispatch();
  const handleAddIcon = () => {
    dispatch(addNote({ id: null, title: "", body: null }));
    dispatch(setActiveNote({ id: null, title: "", body: null ,tags:[] }));
  };

  
  return (
    <Box bg="#ffffff" pt="1rem" >
      <Flex px="6" alignItems="center" mb="0.5rem">
        <Heading as="h3" size="sm" color="green.500">
          {activeTag.name?.toUpperCase()}
        </Heading>
        <Spacer />
        <Box bg="#32A05F" py='0.3rem' px='0.6rem' color='white' style={{borderRadius:"20px"}} mb="0.5rem" onClick={handleAddIcon}>
          <AddIcon  mr={'0.5rem'}></AddIcon>
          <span>New Note</span>
        </Box>
      </Flex>

      <Center bg="gray.400">
        <Divider orientation="horizontal" />
      </Center>

      {notes?.map((note, i) => (
        <>
          <Notecard key={note.id} note={note} />
          <Center bg="gray.400">
            <Divider orientation="horizontal" />
          </Center>
        </>
      ))}
    </Box>
  );
}

export default Notes;
