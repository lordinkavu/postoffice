import { useState } from "react";
import ButtonTab from "./ButtonTab";
import generateSrc from "../helpers/img_src_generator";

function Response({ response }) {
  const [responseToggle, setResponseToggle] = useState("data");
  if (!response) {
    return (
      <div className="mx-auto w-full  md:m-0  bg-gray-800 rounded-lg px-4 py-2 ">
        <div className="flex flex-col ">
          <h2 className=" pb-4 pt-4 font-bold">response</h2>
          <div className="pb-2   font-semibold ">
            {" "}
            status : <span className="font-mono  ">no request sent</span>
          </div>
        </div>

        <div className="w-full h-36 flex justify-center items-center font-mono">
          nothing here :({" "}
        </div>
      </div>
    );
  } else {
    const content_type = response["headers"]["content-type"].substr(0, 2);
    let display_data = "no data received";
    if (response.data) {
      switch (content_type) {
        case "im":
          display_data = (
            <img
              className="max-h-48 max-w-48"
              src={generateSrc(response)}
              alt="response data"
            />
          );
          break;
        case "te":
          display_data = response.data;
          break;
        default:
          display_data = JSON.stringify(response.data, null, 2);
      }
    }
    return (
      <div className="mx-auto w-full  md:m-0  bg-gray-800 rounded-lg px-4 py-2 ">
        <div className="flex flex-col">
          <h2 className=" pb-4 pt-4 font-bold">response</h2>
          <div className=" pb-2  font-semibold ">
            {" "}
            status : <span className="font-mono ">{response.status}</span>
          </div>
        </div>
        <div className="flex space-x-2 pt-1 py-4 ">
          <ButtonTab
            state={responseToggle}
            value="data"
            updateState={setResponseToggle}
          />
          <ButtonTab
            state={responseToggle}
            value="meta"
            updateState={setResponseToggle}
          />
          <ButtonTab
            state={responseToggle}
            value="headers"
            updateState={setResponseToggle}
          />
        </div>
        {responseToggle === "data" && (
          <div className="focus:outline-none">
            <pre className="overflow-auto bg-gray-900 min-h-72 max-h-screen p-4 rounded-md">
              <code>{display_data}</code>
            </pre>
          </div>
        )}
        {
          responseToggle === "meta" && (
            <div className="bg-gray-900 p-4 rounded-md h-96 overflow-auto" >
              <h3>status text : <span className="font-mono">{response.statusText}</span></h3>
            </div>
          )
        }

        {
          responseToggle === "headers" && (
            <div className="focus:outline-none">
            <pre className="overflow-auto bg-gray-900 h-96 p-4 rounded-md">
              <code>{JSON.stringify(response.headers, null, 2)}</code>
            </pre>
          </div>
          )
        }
      </div>
    );
  }
}
export default Response;
