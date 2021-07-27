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
    <div className="flex ">
      <input
        type="text"
        placeholder="key"
        className="border w-32 py-2 px-4"
        onChange={handleKeyChange}
        value={keyParam}
      />
      <input
        type="text"
        placeholder="value"
        className="border w-32 py-2 px-4"
        onChange={handleValueChange}
        value={valueParam}
      />
      <button className="border w-24 py-2 px-4" onClick={handleDelete}>
        delete
      </button>
    </div>
  );
}

export default KeyValue;
