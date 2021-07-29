/* eslint-disable no-unused-vars */
import { useState, Fragment } from "react";
import Dropdown from "./Dropdown";
import RequestParameters from "./RequestParameters";
import ButtonTab from "./ButtonTab";
import axios from "axios";
import generateAxiosConfig from "../helpers/request_config";

const api_methods = [
  { id: 1, name: "get" },
  { id: 2, name: "post" },
  { id: 3, name: "put" },
  { id: 4, name: "patch" },
  { id: 5, name: "delete" },
];
const content_types = [
  { id: 1, name: "application/json" },
  { id: 2, name: "application/x-www-form-urlencoded" },
];

function Request({ setResponse }) {
  //Request states
  const [method, setMethod] = useState(api_methods[0].name);
  const [url, setUrl] = useState("https://httpbin.org/get");
  const [queryParams, setQueryParams] = useState([]);
  const [body, setBody] = useState([]);
  const [contentType, setContentType] = useState(content_types[0].name);
  const [headers, setHeaders] = useState([]);
  //UI states
  const [parameterToggle, setParameterToggle] = useState("parameters");

  function handleUrlChange(e) {
    setUrl(e.target.value);
  }

  async function sendRequest() {
    setResponse(null)
    const request_config = generateAxiosConfig(url,method,queryParams,headers, contentType, body);
    try {
      let res = await axios(request_config);
      if (res["headers"]["content-type"].substr(0, 2) === "im") {
        request_config["responseType"] = "arraybuffer";
        res = await axios(request_config);
      }
      setResponse(res);
    } catch (e) {
      setResponse(e.response);
    }
  }

  return (
    <div className=" mx-auto w-full md:w-1/2 md:m-0 space-y-4 bg-gray-800 rounded-lg px-4 py-2 ">
      <div className="flex flex-col  lg:flex-row md:w-full">
        <div className=" w-full lg:w-1/5">
          <Dropdown
            selectedOption={method}
            setSelectedOption={setMethod}
            options={api_methods}
            width="w-full"
            name="method"
          />
        </div>
        <div className="w-full lg:w-4/5">
          <h2 className="pb-2 pt-4  font-semibold">URL</h2>
          <div className="flex flex-col lg:flex-row ">
            <input
              type="text"
              className="font-mono text-sm py-2 px-4 w-full border border-gray-500 bg-gray-900"
              value={url}
              onChange={handleUrlChange}
              placeholder="eg : https://httpbin.org/get"
            />
            <button
              className="border w-full px-4 py-2 font-semibold bg-green-200 text-black lg:w-1/5 "
              onClick={sendRequest}
            >
              send
            </button>
          </div>
        </div>
      </div>

      {method !== "get" && (
        <div className="space-y-4 py-2">
          <Dropdown
            selectedOption={contentType}
            setSelectedOption={setContentType}
            options={content_types}
            width="w-full"
            name="request body"
          />{" "}
          <RequestParameters
            params={body}
            setParams={setBody}
            name="request body"
          />
        </div>
      )}

      <div className="">
        <div className="flex space-x-2 pt-2 pb-4 ">
          <ButtonTab
            state={parameterToggle}
            value="parameters"
            updateState={setParameterToggle}
          />
          <ButtonTab
            state={parameterToggle}
            value="headers"
            updateState={setParameterToggle}
          />
        </div>
        {parameterToggle === "parameters" && (
          <div>
            <RequestParameters
              params={queryParams}
              setParams={setQueryParams}
              name="query parameter list"
              type="parameter"
            />
          </div>
        )}
        {parameterToggle === "headers" && (
          <div>
            <RequestParameters
              params={headers}
              setParams={setHeaders}
              name="header list"
              type="header"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Request;
