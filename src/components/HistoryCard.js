import React from "react";
import { ReplyIcon, XIcon } from "@heroicons/react/solid";

export default function HistoryCard({
  historyObj,
  removeElement,
  updateStates,
}) {
  function handleRemoveClick() {
    removeElement(historyObj.id);
  }
  function handleUpdateStates() {
    updateStates(historyObj);
  }

  return (
    <li className={` rounded border border-gray-700 `}>
      <div className={`flex bg-gray-700 rounded-x rounded-t  justify-between items-center `}>
        <div className="pl-4  tracking-widest font-bold">
          <span>{historyObj.request.method.toUpperCase()}</span> -{" "}
          <span
            className={`bg-gray-700 rounded  ${
              historyObj.response.status.toString()[0] === "2"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {historyObj.response.status}
          </span>
        </div>
        <div className="flex flex-row-reverse items-center  py-2 pr-2">
          <button className=" pl-4" onClick={handleRemoveClick}>
            <XIcon className="w-6 h-5" />
          </button>
          <button className="pl-4 " onClick={handleUpdateStates}>
            <ReplyIcon className="w-6 h-5 " />
          </button>
        </div>
      </div>
      {/*   <div className="pl-4 pt-1 pb-4 text-sm pr-4 truncate">
          {historyObj.request.url}
      </div>  */}
      <div className="border-gray-400 text-sm truncate px-4 py-2">
      {historyObj.request.url}
      </div>
    </li>
  );
}
