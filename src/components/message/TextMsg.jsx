import React from "react";

function TextMsg() {
  return (
    <>
      <div class="flex items-start gap-2.5 m-2">
        <div class="flex flex-col gap-1 w-full max-w-[360px] sm:max-w-1/2">
          <div class="flex items-center space-x-2 rtl:space-x-reverse">
            <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <p class="text-sm font-normal text-gray-900 dark:text-white">
                {" "}
                That's awesome. I think our users will really appreciate the
                improvements.
              </p>
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400 text-right">
                11:46
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TextMsg;
