/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import HistoryCard from "./HistoryCard";

function History({ response, setRequest, setResponse }) {
  const [history, setHistory] = useState();
  const {setMethod, setUrl, setQueryParams,setBody,setContentType,setHeaders} = setRequest;
  useEffect(() => {
    setHistory(localStorage.getItem("history"));
    console.log("changing");
  }, [response]);
  
  function removeElement(key) {
    const newHistoryArr = historyArr.filter(
      (elem) => elem["request time"] !== key
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
      <div className=" mx-auto  w-full md:m-0 space-y-4 bg-gray-800 rounded-lg px-4 py-2  ">
        <h2 className=" pb-4 pt-4 font-bold">history</h2>
        <div className="w-full h-96 flex justify-center items-center font-mono">
          nothing here :({" "}
        </div>
      </div>
    );
  }

  const historyArr = JSON.parse(history);

  return (
    <div className="bg-gray-800 rounded-lg px-4 py-2  overflow-auto h-96 max-h-screen  ">
      <h2 className=" pt-4 pb-4 font-bold">history</h2>
      <ul className="space-y-4 text-sm">
        {historyArr.map((item) => (
          <HistoryCard
            historyObj={item}
            key={item["request time"]}
            removeElement={removeElement}
            updateStates={updateStates}
          />
        ))}
      </ul>
    </div>
  );
}

export default History;
