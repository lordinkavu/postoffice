import { useState, useEffect } from "react";
import HistoryCard from "./HistoryCard";

function History({ response }) {
  const [history, setHistory] = useState();
  
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
            history={item}
            key={item["request time"]}
            removeElement={removeElement}
          />
        ))}
      </ul>
    </div>
  );
}

export default History;
