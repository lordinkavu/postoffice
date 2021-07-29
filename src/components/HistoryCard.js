import { ReplyIcon, XIcon } from "@heroicons/react/solid"
export default function HistoryCard({history,removeElement}){
    function handleRemoveClick(){
        removeElement(history["request time"]);
    }
    
    return <li className=" px-2 py-4 bg-gray-700 rounded-md" >
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between"> 
            <span className="font-semibold"> {history.request.method}  <span className="font-mono">{history.request.url}</span> </span>
            <span className="space-x-2">
            <button><ReplyIcon className="w-6 h-5"/></button>
            <button onClick={handleRemoveClick}><XIcon className="w-6 h-5"/></button>
            
            </span>
            
        </div>
        
    </li>
}