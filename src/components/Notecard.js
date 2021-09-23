import { DeleteIcon } from "@chakra-ui/icons";
import { Badge, Box, Flex, Spacer } from "@chakra-ui/layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncDeleteNote,
  asyncGetNote,
  setActiveNote,
} from "../features/notes/notesSlice";
import { FaArchive } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";

function Notecard({ note }) {
  const activeNote = useSelector((state) => state.notes.activeNote);
  const activeTag = useSelector((state) => state.tags.activeTag);

  const dispatch = useDispatch();

  const isActiveNote = () => {
    if (note.id == activeNote.id) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Box
        bg={`${isActiveNote() ? "#b6e4c3" : "#ffffff"}`}
        onClick={() => {
          console.log(note,'note.....')
          // dispatch(setActiveNote(note));
          dispatch(asyncGetNote(note.id));
        }}
      >
        <Box p="3">
          <Box d="flex" alignItems="baseline">
            <Box mt="1" ml="2" fontWeight="semibold" as="h4" lineHeight="tight">
              {note.title}
            </Box>
          </Box>

          <Box isTruncated>{note.body}</Box>
        </Box>
        <Flex px="1rem" py="0.5rem">
          <Box></Box>
          <Spacer />
          <DeleteIcon onClick={() => dispatch(asyncDeleteNote(note.id))} />
          <Icon mx="0.5rem" as={FaArchive} />
        </Flex>
      </Box>
    </>
  );
}

export default Notecard;
