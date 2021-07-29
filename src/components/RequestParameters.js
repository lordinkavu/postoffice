import { nanoid } from "nanoid";
import KeyValue from "./KeyValue";
import { PlusIcon } from "@heroicons/react/solid";

function RequestParameters({ params, setParams }) {
  function addParam() {
    const new_params = [...params];
    const id = nanoid();
    new_params.push({ id: id, key: "", value: "" });
    setParams(new_params);
  }

  function removeParam(id) {
    const new_params = params.filter((param) => param.id !== id);
    setParams(new_params);
  }

  function onKeyValueChange(id, key, value) {
    const new_params = [...params];
    const index = new_params.findIndex((item) => item.id === id);
    new_params[index]["key"] = key;
    new_params[index]["value"] = value;
    setParams(new_params);
  }

  return (
    <div className="w-full">
      <div className=" flex flex-col">
        {params.map((param) => (
          <KeyValue
            key={param.id}
            id={param.id}
            removeParam={removeParam}
            keyParam={param.key}
            valueParam={param.value}
            onKeyValueChange={onKeyValueChange}
          />
        ))}
      </div>
      <button
        className="bg-gray-700  rounded  py-2 px-4 my-2 flex items-center justify-center  mx-auto"
        onClick={addParam}
      >
        <PlusIcon className="w-6 h-5" />
      </button>
    </div>
  );
}

export default RequestParameters;
