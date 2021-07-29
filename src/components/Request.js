/* eslint-disable no-unused-vars */
import { useState, Fragment } from "react";
import Dropdown from "./Dropdown";
import RequestParameters from "./RequestParameters";
import ButtonTab from "./ButtonTab";
import axios from "axios";
import generateAxiosConfig from "../helpers/request_config";

function writeHistory(req, res) {
  const state = {
    request: req,
    response: res,
    "request time": new Date().getTime().toString(),
  };
  let historyArr = [];
  if (localStorage.getItem("history")) {
    historyArr = JSON.parse(localStorage.getItem("history"));
  }
  historyArr.unshift(state);
  localStorage.setItem("history", JSON.stringify(historyArr));
}

function Request({ setResponse , request, setRequest, dropdownLists }) {
  //Request props
  const {method,url,queryParams,body,contentType,headers} = request;
  const {setMethod, setUrl, setQueryParams,setBody,setContentType,setHeaders} = setRequest;

  //UI states
  const [parameterToggle, setParameterToggle] = useState("parameters");

  const {api_methods, content_types} = dropdownLists;

  function handleUrlChange(e) {
    setUrl(e.target.value);
  }

  async function sendRequest() {
    setResponse(null);
    const requestConfig = generateAxiosConfig(request);
    try {
      let axiosRes = await axios(requestConfig);
      if (axiosRes["headers"]["content-type"].substr(0, 2) === "im") {
        requestConfig["responseType"] = "arraybuffer";
        axiosRes = await axios(requestConfig);
      }
      
      const res = {data:axiosRes.data, headers:axiosRes.headers, status: axiosRes.status,statusText: axiosRes.statusText};
      console.log(res);
      writeHistory(request, res);
      setResponse(res);
    } catch (e) {
      writeHistory(request, e.response);
      setResponse(e.response);
    }
  }

  return (
    <div className=" mx-auto w-full  md:m-0 space-y-4 bg-gray-800 rounded-lg px-4 py-2 ">
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
