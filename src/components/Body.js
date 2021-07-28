/* eslint-disable no-unused-vars */
import { useState } from "react";
import Response from "./Response";
import Request from "./Request";

function Body(props) {
  const [response, setResponse] = useState();
  return (
    <section className="text-gray-300 min-h-screen">
      <Request setResponse={setResponse} />
      {/* <Response response={response} /> */}
    </section>
  );
}

export default Body;
