import { useState, useEffect } from "react";
import HistoryCard from "./HistoryCard";

function History({ response, setRequest, setResponse }) {
  const [history, setHistory] = useState();
  const {setMethod, setUrl, setQueryParams,setBody,setContentType,setHeaders} = setRequest;
  
  useEffect(() => {
    setHistory(localStorage.getItem("history"));
    
  }, [response]);
  
  function removeElement(id) {
    const newHistoryArr = historyArr.filter(
      (elem) => elem.id !== id
    );
    localStorage.setItem("history", JSON.stringify(newHistoryArr));
    setHistory(localStorage.getItem("history"));
  }

  function updateStates({request,response}){
    setMethod(request.method);
    setUrl(request.url);
    setQueryParams(request.queryParams);
    setBody(request.body);
    setContentType(request.contentType);
    setHeaders(request.headers);
    setResponse(response);
  }

  if (!history) {
    return (
      <div className=" bg-gray-800 rounded px-4 pb-4  overflow-auto h-96 max-h-screen ">
        <h2 className=" pt-4 pb-2 font-bold">history</h2>
        <div className="w-full h-96 flex justify-center items-center font-mono">
          nothing here :({" "}
        </div>
      </div>
    );
  }

  const historyArr = JSON.parse(history);

  return (
    <div className="bg-gray-800 rounded px-4 pb-4  overflow-auto h-96 max-h-screen  ">
      <h2 className=" pt-4 pb-2 font-bold">history</h2>
      <ul className="space-y-4">
        {historyArr.map((item) => (
          <HistoryCard
            historyObj={item}
            key={item.id}
            removeElement={removeElement}
            updateStates={updateStates}
          />
        ))}
      </ul>
    </div>
  );
}

export default History;
