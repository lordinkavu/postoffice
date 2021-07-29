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
    <li className={`bg-gray-700 rounded border-l-4 ${(historyObj.response.status.toString()[0]==="2") ? "border-green-500":"border-red-500"}`}   >
      <div className={`flex  justify-between items-center `}>
      <div className="pl-4 tracking-widest">{historyObj.request.method.toUpperCase()} - {historyObj.response.status}</div>
        <div className="flex flex-row-reverse items-center  py-2 pr-2">
          <button className=" pl-4" onClick={handleRemoveClick}>
            <XIcon className="w-6 h-5" />
          </button>
          <button className="pl-4 " onClick={handleUpdateStates}>
            <ReplyIcon className="w-6 h-5 " />
          </button>
        </div>
      </div>
      <div className="pl-4 pt-1 pb-4 text-sm pr-4 truncate">
          {historyObj.request.url}
      </div>

     
    </li>
  );
}
