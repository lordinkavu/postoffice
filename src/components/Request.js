import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import axios from "axios";
import Dropdown from "./Dropdown";
import RequestParameters from "./RequestParameters";
import ButtonTab from "./ButtonTab";
import generateAxiosConfig from "../helpers/generateAxiosConfig";
import persistHistory from "../helpers/persistHistory";

function Request({ setResponse, request, setRequest, dropdownLists }) {
  //Request props
  const { method, url, queryParams, body, contentType, headers } = request;
  const {
    setMethod,
    setUrl,
    setQueryParams,
    setBody,
    setContentType,
    setHeaders,
  } = setRequest;
  const { api_methods, content_types } = dropdownLists;

  //UI states
  const [parameterToggle, setParameterToggle] = useState("parameters");

  function handleUrlChange(e) {
    setUrl(e.target.value);
  }

  async function sendRequest() {
    setResponse(null);
    const requestConfig = generateAxiosConfig(request);
    try {
      let axiosRes = await axios(requestConfig);

      // Hack for rendering image response
      // generating image from unicode response failed. So requesting binary response instead.
      if (axiosRes["headers"]["content-type"].substr(0, 2) === "im") {
        requestConfig["responseType"] = "arraybuffer";
        axiosRes = await axios(requestConfig);
      }
      const res = {
        data: axiosRes.data,
        headers: axiosRes.headers,
        status: axiosRes.status,
        statusText: axiosRes.statusText,
      };
      
      persistHistory(request, res);
      setResponse(res);
    } catch (e) {
      // do not proceed with updating states and writing to localStorage when res in undefined.
      // can happen in case of network failure or cors errors.
      if (!e.response) {
        alert("oops, some error occured.");
      } else {
        persistHistory(request, e.response);
        setResponse(e.response);
      }
    }
  }

  return (
    <div className=" mx-auto w-full  md:m-0  bg-gray-800 rounded-md px-4 pb-4 ">
      <div className="flex flex-col lg:space-x-2 lg:flex-row md:w-full">
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
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-x-2 lg:space-y-0">
            <input
              type="text"
              className=" py-2 px-4 w-full rounded   bg-gray-900"
              value={url}
              onChange={handleUrlChange}
            />
            <button
              className=" w-full px-4 py-2 rounded  font-semibold bg-gradient-to-t from-green-200 to-green-500  text-gray-900 lg:w-1/5 "
              onClick={sendRequest}
            >
              send
            </button>
          </div>
        </div>
      </div>
      <Transition
        show={method !== "get"}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="space-y-4">
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
      </Transition>

      <div>
        <div className="flex space-x-2 pt-4 pb-2 mb-2 ">
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
        <Transition show={parameterToggle !== "parameters"}>
          <div>
            <RequestParameters
              params={queryParams}
              setParams={setQueryParams}
              name="query parameter list"
              type="parameter"
            />
          </div>
        </Transition>
        <Transition show={parameterToggle !== "headers"}>
          <div>
            <RequestParameters
              params={headers}
              setParams={setHeaders}
              name="header list"
              type="header"
            />
          </div>
        </Transition>
      </div>
    </div>
  );
}

export default Request;
