import React from "react";
import { useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import ClipElement from "../components/clipElement/ClipElement";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import MessageBox from "../components/message/MessageBox";

function Clipboard() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [clips, setClips] = React.useState([]);
  const [clipId, setClipId] = React.useState("");
  const [messageSent, setMessageSent] = React.useState(false);
  const [clipName, setClipName] = React.useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      } else {
        console.log("notsignedin");
      }
    });
  }, []);

  const dbCall = async () => {
    let allClips = [];
    const clipsRef = collection(db, "clips");
    const clipsQuery = query(clipsRef, where("userID", "==", currentUser?.uid));

    //getting clips that match the current userID
    await getDocs(clipsQuery).then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        let oneClipCollection = { ...doc.data(), id: doc.id, messages: [] };

        //getting messages for each clip
        const messagesRef = collection(db, "clips", doc.id, "messages");
        const messagesQuery = query(messagesRef, orderBy("time", "asc"));
        const messagesSnapshot = await getDocs(messagesQuery);

        messagesSnapshot.forEach((doc) => {
          let message = { ...doc.data(), id: doc.id };
          oneClipCollection.messages.push(message);
        });

        let alreadyExists = allClips.find(
          (clip) => clip.id === oneClipCollection.id
        );

        if (!alreadyExists) {
          allClips.push(oneClipCollection);
        }

        setClips(allClips);
        setMessageSent(false);
      });
    });
  };

  useEffect(() => {
    if (isLoggedIn == true) {
      // setClips([]);
      dbCall();
    }
  }, [currentUser, messageSent]);

  const addCollection = async () => {
    const clipsRef = collection(db, "clips");
    await addDoc(clipsRef, {
      clip_name: clipName,
      createdAt: serverTimestamp(),
      userID: currentUser.uid,
    });
    console.log("collection added");
    setClipName("");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div className="mt-40">
            <div className="container mx-auto mt-[-128px] flex justify-center items-center">
              <div className="py-6 h-[80vh] md:w-2/3">
                <div className="flex border border-grey rounded shadow-lg h-full">
                  <div className="w-1/3 border flex flex-col">
                    <div className="py-2 px-2 bg-slate-100 font-semibold pl-4 text-lg  border-b border-grey-lighter flex justify-between">
                      <span>YOUR CLIPS</span>{" "}
                      <Button
                        onPress={onOpen}
                        size="sm"
                        className="mr-3"
                        color="primary"
                      >
                        + Add
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
                                Add Collection
                              </ModalHeader>
                              <ModalBody>
                                <Input
                                  autoFocus
                                  placeholder="Enter your Clip name"
                                  variant="bordered"
                                  value={clipName}
                                  onChange={(e) => setClipName(e.target.value)}
                                />
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="danger"
                                  variant="flat"
                                  onPress={onClose}
                                >
                                  Close
                                </Button>
                                <Button
                                  color="primary"
                                  onPress={() => {
                                    onClose();
                                    addCollection();
                                    dbCall();
                                  }}
                                >
                                  Create
                                </Button>
                              </ModalFooter>
                            </>
                          )}
                        </ModalContent>
                      </Modal>
                    </div>

                    <div className="bg-grey-lighter flex-1 overflow-auto">
                      {clips.map((clip) => {
                        return (
                          <ClipElement
                            key={clip.id}
                            clipName={clip.clip_name}
                            setClipId={setClipId}
                            clip={clip}
                            clipId={clipId}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* message box */}
                  <MessageBox
                    clips={clips}
                    clipId={clipId}
                    setMessageSent={setMessageSent}
                    setClipId={setClipId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 justify-center items-center h-[85vh]">
          <h1 className="text-5xl font-semibold">Login to use Clipboard</h1>
        </div>
      )}
    </div>
  );
}

export default Clipboard;
