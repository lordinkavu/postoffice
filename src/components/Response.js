import { useState } from "react";

function generateImage(response) {
  const b64 = Buffer.from(response.data,'binary').toString('base64');
  const src = `data:${response["headers"]["content-type"]};base64,${b64}`;
  return src;
}

function Response({ response }) {
  const [responseToggle, setResponseToggle] = useState("data");
  if (!response) {
    return (
      <div className="mx-auto w-full md:w-1/2 md:m-0  bg-gray-800 rounded-lg px-4 py-2 ">
        <div className="flex flex-col ">
          <h2 className=" pb-4 pt-4 font-bold">response</h2>
          <div className="pb-2   font-semibold ">
            {" "}
            status : <span className="font-mono  ">no request sent</span>
          </div>
        </div>
       
        <div className="w-full h-36 flex justify-center items-center font-mono">nothing here :( </div>
      </div>
    );
  } else {
    const content_type = response["headers"]["content-type"].substr(0, 2);
   
 
    return (
      <div className="mx-auto w-full md:w-1/2 md:m-0  bg-gray-800 rounded-lg px-4 py-2 ">
        <div className="flex flex-col">
          <h2 className=" pb-4 pt-4 font-bold">response</h2>
          <div className=" pb-2  font-semibold ">
            {" "}
            status :{" "}
            <span className="font-mono ">{response.status}</span>
          </div>
        </div>
        <div className="flex space-x-2 pt-1 py-4 ">
          <button
            className={` px-4 font-semibold focus:outline-none   ${
              responseToggle === "data" ? " bg-gray-700" : "bg-gray-800"
            }`}
            onClick={() => setResponseToggle("data")}
          >
            data
          </button>
          <button
            className={` px-4 py-2 font-semibold focus:outline-none   ${
              responseToggle === "headers" ? " bg-gray-700" : "bg-gray-800"
            }`}
            onClick={() => setResponseToggle("headers")}
          >
            headers
          </button>
        </div>
        {response.data && (
          <div className="focus:outline-none">
           
            <pre className="overflow-auto bg-gray-900 h-96 p-4 rounded-md">
              <code>
                
                {content_type === "ap" &&
                  JSON.stringify(response.data, null, 2)}{" "}
                {content_type === "te" && response.data}
                {content_type === "im" && <img className="max-h-48 max-w-48" src={generateImage(response)} alt="response data"/>}
               
              </code>
            </pre>
           
          </div>
           
        )}
      </div>
    );
  }
}
export default Response;
