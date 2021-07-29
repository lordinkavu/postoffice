import { ReplyIcon, XIcon } from "@heroicons/react/solid"
export default function HistoryCard({historyObj,removeElement,updateStates}){
    function handleRemoveClick(){
        removeElement(historyObj["request time"]);
    }
    function handleUpdateStates(){
        updateStates(historyObj)
    }
    
    return <li className=" px-2 py-4 bg-gray-700 rounded-md" >
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between"> 
            <span className="font-semibold"> {historyObj.request.method}  <span className="font-mono">{historyObj.request.url}</span> </span>
            <span className="space-x-2">
            <button><ReplyIcon className="w-6 h-5" onClick={handleUpdateStates}/></button>
            <button onClick={handleRemoveClick}><XIcon className="w-6 h-5"/></button>
            
            </span>
            
        </div>
        
    </li>
}