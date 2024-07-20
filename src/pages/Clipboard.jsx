import React from "react";
import { useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import TextMsg from "../components/message/TextMsg";
import ClipElement from "../components/clipElement/ClipElement";

function Clipboard() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
        console.log(user.displayName);
        // ...
      } else {
        console.log("notsignedin");
      }
    });
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div className="mt-40">
            <div className="container mx-auto mt-[-128px] flex justify-center items-center">
              <div className="py-6 h-[80vh] md:w-2/3">
                <div className="flex border border-grey rounded shadow-lg h-full">
                  <div className="w-1/3 border flex flex-col">
                    <div className="py-2 px-2 bg-slate-100 font-semibold pl-4 text-lg  border-b border-grey-lighter">
                      YOUR CLIPS
                    </div>

                    <div className="bg-grey-lighter flex-1 overflow-auto">
                      <ClipElement />
                      <ClipElement />
                    </div>
                  </div>

                  {/* //clip name */}
                  <div className="w-2/3 border flex flex-col">
                    <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <p className="text-grey-darkest">Passwords</p>
                        </div>
                      </div>

                      {/* //svg beside clip name */}
                      <div className="flex">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path
                              fill="#263238"
                              fillOpacity=".5"
                              d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
                            ></path>
                          </svg>
                        </div>
                        <div className="ml-6">
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
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-auto bg-[#DAD3CC]">
                      <TextMsg />
                      <TextMsg />
                      <TextMsg />
                    </div>

                    <div>
                      <form className=" relative">
                        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                          <button
                            type="button"
                            class="inline-flex justify-center text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              class="w-[1.30rem] h-[1.30rem]"
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
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                              />
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                              />
                            </svg>
                            <span class="sr-only">Upload image</span>
                          </button>
                          <input
                            id="chat"
                            rows="1"
                            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-gray-500"
                            placeholder="Your message..."
                          />
                          <button
                            type="submit"
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
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Login to use clipboard</div>
      )}
    </div>
  );
}

export default Clipboard;
