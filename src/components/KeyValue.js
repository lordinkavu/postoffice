import React from "react";
import {TrashIcon} from '@heroicons/react/solid'

function KeyValue({ id, removeParam, keyParam, valueParam, onKeyValueChange }) {
  function handleDelete() {
    removeParam(id);
  }
  function handleKeyChange(e) {
    onKeyValueChange(id, e.target.value, valueParam);
  }
  function handleValueChange(e) {
    onKeyValueChange(id, keyParam, e.target.value);
  }
  return (
    <div className="flex w-full">
      <input
        type="text"
        placeholder="key"
        className="w-1/2 py-2 px-4 mb-1 mr-1 bg-gray-900 rounded"
        onChange={handleKeyChange}
        value={keyParam}
      
      />
      <input
        type="text"
        placeholder="value"
        className="w-1/2 mb-1 mr-1 py-2 px-4 bg-gray-900 rounded"
        onChange={handleValueChange}
        value={valueParam}
      />
      <button className=" w-16 py-2 mb-1 rounded px-4 flex bg-gray-700 justify-center items-center" onClick={handleDelete}>
        <TrashIcon className="w-6 h-5"/>
      </button>
    </div>
  );
}

export default KeyValue;
