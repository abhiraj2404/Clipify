import React from "react";

function ClipElement({ clipName, setClipId, clip, clipId }) {
  return (
    <div
      className={`${
        clip.id == clipId ? "bg-gray-100" : "bg-white"
      } px-3 flex items-center hover:bg-gray-100 cursor-pointer border-b border-grey-lighter py-4`}
      onClick={() => {
        setClipId(clip.id);
      }}
    >
      <div>
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.3"
            d="M16.153 19 21 12l-4.847-7H3l4.848 7L3 19h13.153Z"
          />
        </svg>
      </div>
      <div className="ml-4 flex-1 ">
        <div className="flex items-bottom justify-between ">
          <p className="text-grey-darkest">{clipName}</p>
        </div>
      </div>
    </div>
  );
}

export default ClipElement;
