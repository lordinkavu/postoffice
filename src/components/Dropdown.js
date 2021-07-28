import { Listbox } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
function Dropdown({
  selectedOption,
  setSelectedOption,
  options,
  width,
  
}) {
  function updateOption(value) {
    setSelectedOption(value.name);
  }
  return (
    <Listbox value={selectedOption} onChange={updateOption}>
      <div className={`${width}  relative bg-gray-900 font-mono`}>
        <Listbox.Button className=" pr-2 pl-4 py-2 border border-gray-500 flex items-center justify-between w-full">
          <span className="  truncate pr-2 text-gray-300">
            {selectedOption}
          </span>
          <span>
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>{" "}
        </Listbox.Button>
        <Listbox.Options
          className={`border z-50  py-2 w-full  overflow-auto max-h-72 absolute  bg-gray-800  text-gray-300`}
        >
          {options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              className="cursor-pointer  px-4 py-1  font-semibold "
            >
              {option.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export default Dropdown;
