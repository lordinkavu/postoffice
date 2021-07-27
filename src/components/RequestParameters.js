import { nanoid } from "nanoid";
import KeyValue from "./KeyValue";

function RequestParameters({ params, setParams, name }) {
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
    <div>
      <h2 className="font-semibold mt-4  mb-2">{name}</h2>
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
      <button className="border w-48 py-2 px-4 my-2" onClick={addParam}>
        add new
      </button>
    </div>
  );
}

export default RequestParameters;
