/* eslint-disable no-unused-vars */
import { useState } from "react";
import Response from "./Response";
import Request from "./Request";
import History from "./History";

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

function Body(props) {
  const [response, setResponse] = useState();
  const [method, setMethod] = useState(api_methods[0].name);
  const [url, setUrl] = useState("https://httpbin.org/get");
  const [queryParams, setQueryParams] = useState([]);
  const [body, setBody] = useState([]);
  const [contentType, setContentType] = useState(content_types[0].name);
  const [headers, setHeaders] = useState([]);
  
  const request = {
    method: method,
    url: url,
    queryParams : queryParams,
    body : body,
    contentType : contentType,
    headers : headers
  }

  const setRequest = {
    "setMethod" : setMethod,
    "setUrl":setUrl,
    "setQueryParams":setQueryParams,
    "setBody":setBody,
    "setContentType":setContentType,
   "setHeaders":setHeaders

  }

  const dropdownLists = {
    api_methods:api_methods,
    content_types:content_types
  }
 

  return (
    <section className="flex flex-col space-y-4 lg:flex-row lg:justify-between relative lg:space-x-4 lg:space-y-0">
      <div className="text-gray-300   flex flex-col space-y-4 lg:w-8/12  border-gray-200">
        <Request setResponse={setResponse} request = {request} setRequest = {setRequest} dropdownLists={dropdownLists}/>
        <Response response={response} />
      </div>
    <div className=" border-gray-200 lg:w-4/12 relative">
      <History response={response} setRequest = {setRequest} setResponse={setResponse}/>
      </div>
    </section>
  );
}

export default Body;
