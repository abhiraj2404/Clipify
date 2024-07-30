import React, { useState } from "react";
import ImageMsg from "./ImageMsg";
import TextMsg from "./TextMsg";
import { db, storage } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDoc,
  getDocs,
  doc,
  writeBatch,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Listbox, ListboxItem, cn } from "@nextui-org/react";
import { DeleteDocumentIcon } from "./DeleteDocumentIcon.jsx";

function MessageBox({ clips, clipId, setMessageSent }) {
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [imageURL, setImageURL] = useState("");
  const filteredClip = clips.filter((clip) => clip.id === clipId);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const messageHandler = async (e, type, downloadURL) => {
    console.log("inside messageHandler");
    if (type == "text") {
      if (inputMessage.trim() === "") return;
      const messageRef = collection(db, "clips", clipId, "messages");
      await addDoc(messageRef, {
        textMsg: inputMessage,
        time: serverTimestamp(),
        type_of_msg: "text",
        photoURL: "",
      });
      console.log("message sent");
      setInputMessage("");
    }
    if (type == "image") {
      const messageRef = collection(db, "clips", clipId, "messages");
      await addDoc(messageRef, {
        textMsg: "",
        time: serverTimestamp(),
        type_of_msg: "image",
        photoURL: downloadURL,
      });
      console.log("image sent");
      setImageURL("");
      setSelectedFile();
    }
    setMessageSent(true);
  };

  const fileUploadHandler = async () => {
    const storageRef = ref(
      storage,
      "clips/" + clipId + "/" + selectedFile.name
    );

    uploadBytes(storageRef, selectedFile).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        console.log("File available at", downloadURL);
        // setImageURL(downloadURL);
        const type = "image";
        await messageHandler(null, type, downloadURL);
      });
    });
  };

  const deleteClipAndCollection = async () => {
    const clipRef = doc(db, "clips", clipId);
    const clipSnap = await getDoc(clipRef);
    const clip = { id: clipSnap.id, ...clipSnap.data() };

    const messagesRef = collection(db, "clips", clip.id, "messages");
    const messagesQuery = query(messagesRef);
    const messagesSnapshot = await getDocs(messagesQuery);

    const totalDocs = messagesSnapshot.size;
    if (totalDocs === 0) {
      console.log("Collection is already empty.");
    }

    await batchDelete(messagesSnapshot, 500);
    console.log(`Deleted ${totalDocs} documents`);

    await deleteDoc(doc(db, "clips", clipId));
    console.log("successfully deleted clip");
    setMessageSent((prev) => !prev);
  };

  async function batchDelete(querySnapshot, batchSize) {
    const batch = writeBatch(db);
    let count = 0;

    for (const doc of querySnapshot.docs) {
      batch.delete(doc.ref);
      count++;

      if (count >= batchSize) {
        await batch.commit();
        console.log(`Committed batch of ${batchSize} deletions.`);
        count = 0; // Reset count for the next batch
      }
    }

    // Commit any remaining batch
    if (count > 0) {
      await batch.commit();
      console.log(`Committed final batch of ${count} deletions.`);
    }

    if (querySnapshot.size >= batchSize) {
      // Recursively handle the next batch of documents
      const nextSnapshot = await getDocs(querySnapshot.query);
      await batchDelete(nextSnapshot, batchSize);
    }
  }

  return (
    <div className="w-2/3 border flex flex-col">
      <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
        <div className="flex items-center">
          <div className="ml-4">
            <p className="text-grey-darkest">{filteredClip[0]?.clip_name}</p>
          </div>
        </div>

        {/* //svg beside clip name */}
        <div className="flex">
          <div>
            <Dropdown>
              <DropdownTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="#263238"
                    fillOpacity=".6"
                    d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                  ></path>
                </svg>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  onClick={deleteClipAndCollection}
                  key="delete"
                  className="text-danger"
                  color="danger"
                  description="Permanently delete the file"
                  startContent={
                    <DeleteDocumentIcon
                      className={cn(
                        "text-xl text-default-500 pointer-events-none flex-shrink-0",
                        "text-danger"
                      )}
                    />
                  }
                >
                  Delete file
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-[#DAD3CC]">
        {filteredClip[0]?.messages?.length === 0
          ? "no messages yet"
          : filteredClip[0]?.messages?.map((message) => {
              if (message.type_of_msg === "text")
                return <TextMsg key={message.id} message={message} />;
              if (message.type_of_msg === "image")
                return <ImageMsg key={message.id} message={message} />;
            })}
      </div>

      <div>
        {/* image upload button */}
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
          <Button onPress={onOpen} color="" variant="faded" isIconOnly>
            <svg
              className="w-[1.30rem] h-[1.30rem]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                fill="currentColor"
                d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
              />
            </svg>
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Choose a file
                  </ModalHeader>
                  <ModalBody>
                    <label for="file-input" className="sr-only">
                      Choose file
                    </label>
                    <input
                      type="file"
                      name="file-input"
                      id="file-input"
                      className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                       file:bg-gray-200 file:border-0 
                        file:me-4
                        file:py-3 file:px-4
                      dark:file:bg-neutral-700 dark:file:text-neutral-400"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => {
                        onClose();
                        fileUploadHandler();
                      }}
                    >
                      Upload
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <input
            id="chat"
            rows="1"
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-gray-500"
            placeholder="Your message..."
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              const type = "text";
              messageHandler(e, type);
            }}
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <svg
              className="w-5 h-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
