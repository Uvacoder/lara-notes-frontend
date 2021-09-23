import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Center, Divider, Flex, Heading, Spacer } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddIcon } from "@chakra-ui/icons";

import {
  asyncGetAllNotes,
  asyncGetTagNotes,
} from "../features/notes/notesSlice";
import {
  asyncCreateTag,
  asyncDeleteTag,
  asyncGetAllTags,
  asyncSetActiveTag,
} from "../features/tags/tagSlice";
import { Input } from "@chakra-ui/input";

function Sidebar() {
  const [activeView, setactiveView] = useState("all notes");
  const activeTag = useSelector((state) => state.tags.activeTag);
  const [newTag, setnewTag] = useState("");
  const tags = useSelector((state) => state.tags.tags);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetAllTags());
  }, []);
  
 useEffect(() => {
    dispatch(asyncGetAllNotes());
  }, [tags]);

  const isActiveView = (view) => {
    if (activeView == view) {
      return true;
    } else {
      return false;
    }
  };
  const isActiveTag = (tag) => {
    if (activeTag.name?.toLowerCase() == tag.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  };
  const handleAddTag = () => {
    dispatch(asyncCreateTag(newTag ));
    setnewTag("");
  };
  return (
    <>
      <Box mt="3rem">
        <Box
          p="0.5rem"
          onClick={() => setactiveView("all notes")}
          bg={`${isActiveView("all notes") ? "#EAEAEA" : "#F4F4F4"}`}
          fontWeight={`${isActiveView("all notes") ? "800" : "400"}`}
        >
          All Notes
        </Box>
        <Box
          p="0.5rem"
          fontWeight={`${isActiveView("archived") ? "800" : "400"}`}
          onClick={() => setactiveView("archived")}
          bg={`${isActiveView("archived") ? "#EAEAEA" : "#F4F4F4"}`}
        >
          Archived
        </Box>
        <Box
          p="0.5rem"
          onClick={() => setactiveView("trash")}
          bg={`${isActiveView("trash") ? "#EAEAEA" : "#F4F4F4"}`}
          fontWeight={`${isActiveView("trash") ? "800" : "400"}`}
        >
          Trash
        </Box>
      </Box>
      <Divider />
      {/* <Heading p="1rem">Tags</Heading> */}
      <Flex alignItems="center">
        <Box w="70%" my="0.5rem">
          <Input
            variant="filled"
            placeholder="New Tag"
            bg="gray.100"
            value={newTag}
            size="sm"
            onChange={(e) => setnewTag(e.target.value)}
          />
        </Box>
        <Spacer />
        <Box>
          <AddIcon mr={"0.5rem"}   onClick={handleAddTag}></AddIcon>
        </Box>
      </Flex>
    

      <Box>
        <Box
          p="0.5rem"
          onClick={() => {
            dispatch(asyncSetActiveTag([{ name: "All" }]));
            dispatch(asyncGetAllNotes());
          }}
          bg={`${isActiveTag("All") ? "#EAEAEA" : "#F4F4F4"}`}
          fontWeight={`${isActiveTag("All") ? "800" : "400"}`}
        >
          All Notes
        </Box>

        {tags?.map((tag) => (
          <>
            <Flex alignItems="center" px="0.5rem">
              <Box
                justifyItems=""
                p="0.5rem"
                w="100%"
                onClick={() => {
                  dispatch(asyncSetActiveTag([{ name: tag.name, id: tag.id }]));
                  dispatch(asyncGetTagNotes(tag.id));
                }}
                bg={`${isActiveTag(tag.name) ? "#EAEAEA" : "#F4F4F4"}`}
                fontWeight={`${isActiveTag(tag.name) ? "800" : "400"}`}
                key={tag.id}
              >
                {tag.name}
              </Box>
              <Spacer />
              <Box>
                <DeleteIcon onClick={() => dispatch(asyncDeleteTag(tag.id))} />
              </Box>
            </Flex>
          </>
        ))}
      </Box>
    </>
  );
}

export default Sidebar;
