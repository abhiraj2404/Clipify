import React from "react";
import { Image } from "@nextui-org/image";

function ImageMsg({ message }) {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    const now = new Date();
    const diffDays = (now.getTime() - date.getTime()) / (1000 * 3600 * 24);

    if (diffDays < 1) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div className="flex items-start gap-2.5 m-2">
      <div className="flex flex-col gap-1 w-full max-w-[360px] sm:max-w-1/2">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <a href={message.photoURL} target="_blank">
              <Image alt="NextUI hero Image" src={message.photoURL} />
            </a>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 text-right">
              {formatTimestamp(message.time)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageMsg;
