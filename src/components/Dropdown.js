import React from "react";
import { Listbox} from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

function Dropdown({ selectedOption, setSelectedOption, options, width, name }) {
  function updateOption(value) {
    setSelectedOption(value.name);
  }
  return (
    <div>
      <h2 className="pb-2 pt-4  font-semibold">{name}</h2>
      <Listbox value={selectedOption} onChange={updateOption}>
        <div className={`${width} rounded relative bg-gray-900 `}>
          <Listbox.Button className=" pr-2 pl-4 py-2  rounded  flex items-center justify-between w-full">
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
            className={`z-50  py-2 w-full rounded overflow-auto max-h-72 absolute  bg-gray-900  text-gray-300`}
          >
            {options.map((option) => (
              <Listbox.Option
                key={option.id}
                value={option}
                className="cursor-pointer  px-4 py-1"
              >
                {option.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}

export default Dropdown;
