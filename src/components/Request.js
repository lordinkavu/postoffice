/* eslint-disable no-unused-vars */
import { useState } from "react";
import Dropdown from "./Dropdown";
import RequestParameters from "./RequestParameters";
import KeyValue from "./KeyValue";
import axios from "axios";
import qs from "qs";
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
const auth_options = [
  { id: 1, name: "none" },
  { id: 2, name: "basic auth" },
];

function Request({ setResponse }) {
  //Request states
  const [method, setMethod] = useState(api_methods[0].name);
  const [url, setUrl] = useState("https://httpbin.org/");
  const [queryParams, setQueryParams] = useState([]);
  const [postBody, setPostBody] = useState([]);
  const [putBody, setPutBody] = useState([]);
  const [patchBody, setPatchBody] = useState([]);
  const [deleteBody, setDeleteBody] = useState([]);
  const [contentType, setContentType] = useState(content_types[0].name);
  const [headers, setHeaders] = useState([]);
  const [authStrat, setAuthStrat] = useState(auth_options[0].name);
  const [basicAuthValue, setBasicAuthValue] = useState({
    user: "",
    password: "",
  });

  //UI states
  const [parameterToggle, setParameterToggle] = useState("parameters");

  function handleUrlChange(e) {
    setUrl(e.target.value);
  }

  function generateKeyValuePairs(arr) {
    const obj = {};
    arr.forEach((item) => {
      if (item.key && item.value) obj[item.key] = item.value;
    });
    return obj;
  }

  async function sendRequest() {
    const request_config = {};
    request_config["url"] = url;
    request_config["method"] = method;
    request_config["params"] = generateKeyValuePairs(queryParams);
    request_config["headers"] = generateKeyValuePairs(headers);
    /*  if (authStrat === "basic auth") {
      request_config["auth"] = {
        username: basicAuthValue["user"],
        password: basicAuthValue["password"],
      };
      
    } */
    if (method !== "get") {
      switch (method) {
        case "post":
          request_config["data"] = generateKeyValuePairs(postBody);
          break;
        case "put":
          request_config["data"] = generateKeyValuePairs(putBody);
          break;
        case "patch":
          request_config["data"] = generateKeyValuePairs(patchBody);
          break;
        case "delete":
          request_config["data"] = generateKeyValuePairs(deleteBody);
          break;
        default:
          break;
      }
      if (
        contentType === "application/x-www-form-urlencoded" &&
        request_config["data"] !== {}
      ) {
        request_config["data"] = qs.stringify(request_config["data"]);
        request_config["headers"]["content-type"] =
          "application/x-www-form-urlencoded;charset=utf-8";
      }
    }

    try {
      const res = await axios(request_config);
      setResponse(res);
    } catch (e) {
      alert("oops, some error occured :( ");
    }
  }

  function handleAuthValueChange(id, key, value) {
    setBasicAuthValue({ user: key, password: value });
  }

  return (
    <div className=" mx-auto w-full md:w-1/2 md:m-0 space-y-4 bg-gray-800 rounded-lg px-4 py-2 ">
      <div className="flex flex-col  lg:flex-row md:w-full">
        <div className=" w-full lg:w-1/5">
          <h2 className="pb-2 pt-4  font-medium">method</h2>
          <Dropdown
            selectedOption={method}
            setSelectedOption={setMethod}
            options={api_methods}
            width="w-full"
          />
        </div>
        <div className="w-full lg:w-4/5">
          <h2 className="pb-2 pt-4  font-medium">URL</h2>
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
        <div>
          <h2 className=" pb-2 pt-4  font-semibold">request body</h2>
          <Dropdown
            selectedOption={contentType}
            setSelectedOption={setContentType}
            options={content_types}
            width="w-full"
          />{" "}
        </div>
      )}
      <div>
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
        <div className="flex space-x-2 py-4 ">
          <button
            className={`px-4 py-2 focus:outline-none bg-gray-700  ${
              parameterToggle === "parameters" ? " bg-gray-700" : "bg-gray-800"
            }`}
            onClick={() => setParameterToggle("parameters")}
          >
            parameters
          </button>
          <button
            className={` px-4  py-2 focus:outline-none  ${
              parameterToggle === "headers" ? " bg-gray-700" : "bg-gray-800"
            }`}
            onClick={() => setParameterToggle("headers")}
          >
            headers
          </button>
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

      {/*   <div>
        <h2 className="font-semibold mt-4  mb-2">authentication</h2>
        <Dropdown
          selectedOption={authStrat}
          setSelectedOption={setAuthStrat}
          options={auth_options}
          width="w-72"
        />
        {authStrat === "basic auth" && (
          <KeyValue
            keyParam={basicAuthValue["user"]}
            valueParam={basicAuthValue["password"]}
            onKeyValueChange={handleAuthValueChange}
          />
        )}
      </div> */}
    </div>
  );
}

export default Request;
