/* eslint-disable no-unused-vars */
import { useState } from "react";
import Dropdown from "./Dropdown";
import Response from "./Response";
import axios from "axios";
const api_methods = [
  { id: 1, name: "get" },
  { id: 2, name: "post" },
  { id: 3, name: "put" },
  { id: 4, name: "patch" },
  { id: 5, name: "delete" },
];

function Body(props) {
  const [response,setResponse] = useState();

  // Request details
  const [method, setMethod] = useState(api_methods[0].name);
  const [url, setUrl] = useState("");

  function handleUrlChange(e) {
    setUrl(e.target.value);
  }

  async function sendRequest() {

    let res;
    switch (method) {
      case "get":
        res = await axios.get(url);
        console.log(res);
        break;
      case "post":
        res = await axios.post(url);
        console.log(res);
        break;
      default:
        res = await axios.get(url);
        console.log(res);
    }
    setResponse(res);
    
  }

  return (
    <section>
      <div className="flex">
        <Dropdown
          selectedOption={method}
          setSelectedOption={setMethod}
          options={api_methods}
        />
        <input
          type="text"
          className="py-2 px-4 w-96 border"
          value={url}
          onChange={handleUrlChange}
        ></input>
        <button
          className="border w-24 px-4 py-2 font-semibold"
          onClick={sendRequest}
        >
          send
        </button>
      </div>
      <Response response={response}/>
    </section>
  );
}

export default Body;
