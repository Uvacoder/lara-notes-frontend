import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import {
  Center,
  Heading,
  Box,
  Divider,
  Flex,
  Spacer,
  HStack,
  Badge,
  Text,
} from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { Input } from "@chakra-ui/input";
import { asyncSaveNote } from "../features/notes/notesSlice";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import Autocomplete from "react-autocomplete";
import { CheckCircleIcon, CheckIcon } from "@chakra-ui/icons";
import {

  setActiveNote
} from "../features/notes/notesSlice";
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

function NoteEditor() {
  const activeNote = useSelector((state) => state.notes.activeNote);
  const dispatch = useDispatch();
  const [content, setContent] = useState(activeNote?.body);
  const [title, setTitle] = useState();
  const tags = useSelector((state) => state.tags.tags);
  const [formattedTags,setFormattedTags] = useState([]);
  const activeTag = useSelector((state) => state.tags.activeTag);
  const [pickerItems, setPickerItems] = useState(formattedTags);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");


  useEffect(() => {
    setContent(activeNote?.body);
    setTitle(activeNote?.title);
    setSelectedTags([])
    activeNote?.tags?.map(tag => {

      tag.name != 'All' && setSelectedTags((old) => [...old, {"id" : tag.id,"label":tag.name,"value":tag.name}]);
    })
    // setTags(activeNote?.tags);
  }, [activeNote]);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  useEffect(() => {
    let preformattedTags = []
    if (tags.length > 0) {
        preformattedTags = tags.map((tag) => ({
          value: tag.name,
          label: tag.name,
          id: tag.id,
        }));
      }
      setFormattedTags(preformattedTags)
  }, [tags]);

  useEffect(() => {
    setPickerItems(formattedTags);
  }, [formattedTags]);

    useEffect(() => {
        setTitle('');
  }, [activeTag]);

    useEffect(() => {
        console.log(selectedTags,'selected tags')
  }, [selectedTags]);
  const handleSave = () => {
    const note = {
    
        id: activeNote.id,
        title,
        body: content,
   
      tag_id: selectedTags.map(t => t.id),
    };
   console.log(note)
    dispatch(asyncSaveNote(note));
 
  };
  const handleSelect = (value) => {
    const tag = pickerItems.filter(t => t.label == value)[0]
  
    if(tag){
      setSelectedTags((old) => [...old, tag]);
    }
    
  };
  return (
    <div>
      {/* Note Title */}
      <Flex alignItems="center" px="1rem">
        <Heading as="h3" size="lg" my="2rem" ml="1rem">
          <Input
            variant="filled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Heading>
        <Spacer />
        <Button colorScheme="green" variant="solid" onClick={handleSave}>
          Save
        </Button>
      </Flex>

      <Center>
        <Box>
          {selectedTags?.map((t) => (
            <Badge colorScheme="green" mx="0.5rem">
              {t.label}
            </Badge>
          ))}
        </Box>
      </Center>
      <HStack fontSize="md" spacing="24px" p="1rem">
        <Box>Tags</Box>

        <Autocomplete
          className="autocomplete"
          getItemValue={(item) => item.label}
          items={pickerItems}
          renderItem={(item, isHighlighted) => {
          
            const isSelected = selectedTags.filter(t => t.label == item.label)
            return(
              <div style={{ background: isHighlighted ? "#EAEAEA" : "white" , padding:"0.5rem"}}>
              {isSelected.length > 0 && <CheckCircleIcon color='green.400' mr='1rem' /> }
              {item.label}
            </div>
            )
}}
          inputProps={{
            style: {
              border: "1px solid green",
              borderRadius: "10px",
              outline: "none",
            },
          }}
          value={selectedTag}
          menuStyle={{
            borderRadius: "3px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "2px 0",
            fontSize: "90%",
            position: "absolute",
            zIndex: "10",
            overflow: "scroll",
            maxHeight: "50%",
            paddingTop:"1rem"
          }}
          onChange={(e) => setSelectedTag(e.target.value)}
          onSelect={(val) => handleSelect(val)}
        />
      </HStack>

      <Box h="75vh" mt="2rem">
        <MDEditor value={content} onChange={(e) => setContent(e)} />
      </Box>
    </div>
  );
}

export default NoteEditor;
