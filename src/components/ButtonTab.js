function ButtonTab({ state, value, updateState }) {
  function handleClick() {
    updateState(value);
  }
  return (
    <button
      className={`px-4 py-2 font-semibold focus:outline-none   ${
        state === value ? " bg-gray-700" : "bg-gray-800"
      }`}
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

export default ButtonTab;
