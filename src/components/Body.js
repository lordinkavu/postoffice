/* eslint-disable no-unused-vars */
import { Fragment, useState } from "react";
import Response from "./Response";
import Request from "./Request";
import History from "./History";

function Body(props) {
  const [response, setResponse] = useState();


  return (
    <section className="flex flex-col space-y-4 lg:flex-row lg:justify-between relative lg:space-x-4 lg:space-y-0">
      <div className="text-gray-300   flex flex-col space-y-4 lg:w-8/12  border-gray-200">
        <Request setResponse={setResponse} />
        <Response response={response} />
      </div>
    <div className=" border-gray-200 lg:w-4/12 relative">
      <History response={response} />
      </div>
    </section>
  );
}

export default Body;
