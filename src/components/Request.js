/* eslint-disable no-unused-vars */
import { useState } from "react";
import Dropdown from "./Dropdown";
import RequestParameters from "./RequestParameters";
import axios from "axios";

const api_methods = [
  { id: 1, name: "get" },
  { id: 2, name: "post" },
  { id: 3, name: "put" },
  { id: 4, name: "patch" },
  { id: 5, name: "delete" },
];

function Request({ setResponse }) {
  const [method, setMethod] = useState(api_methods[0].name);
  const [url, setUrl] = useState("");
  const [params, setParams] = useState([]);
  const [postBody, setPostBody] = useState([]);
  const [putBody, setPutBody] = useState([]);
  const [patchBody, setPatchBody] = useState([]);
  const [deleteBody, setDeleteBody] = useState([]);

  function handleUrlChange(e) {
    setUrl(e.target.value);
  }

  async function sendRequest() {
    const request_config = {};
    request_config["url"] = url;
    request_config["method"] = method;
    if (method === "get") {
      const paramObject = {};
      params.forEach((param) => {
        if (param.key && param.value) paramObject[param.key] = param.value;
      });

      request_config["params"] = paramObject;
    }
    const res = await axios(request_config);
    setResponse(res);
  }

  return (
    <div className="">
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
          placeholder="eg : https://httpbin.org/get"
        />
        <button
          className="border w-24 px-4 py-2 font-semibold"
          onClick={sendRequest}
        >
          send
        </button>
      </div>
      {method === "get" && (
        <RequestParameters
          params={params}
          setParams={setParams}
          name="query parameters"
        />
      )}
      {method === "post" && (
        <RequestParameters
          params={postBody}
          setParams={setPostBody}
          name="request body"
        />
      )}
      {method === "put" && (
        <RequestParameters
          params={putBody}
          setParams={setPutBody}
          name="request body"
        />
      )}
      {method === "patch" && (
        <RequestParameters
          params={patchBody}
          setParams={setPatchBody}
          name="request body"
        />
      )}
      {method === "delete" && (
        <RequestParameters
          params={deleteBody}
          setParams={setDeleteBody}
          name="request body"
        />
      )}
    </div>
  );
}

export default Request;
