import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
function Dropdown({ selectedOption, setSelectedOption, options }) {
  function updateOption(value) {
    setSelectedOption(value.name);
  }
  return (
    <Listbox value={selectedOption} onChange={updateOption}>
      <div className="w-24">
        <Listbox.Button className=" pr-2 pl-4 py-2 border flex items-center justify-between w-full">
          <span className=" font-semibold text-gray-600">
            {selectedOption}
          </span>
          <span>
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>{" "}
        </Listbox.Button>
        <Transition
        /*  enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0" */
        >
          <Listbox.Options className="border  py-2 w-24 overflow-auto max-h-72 absolute bg-white ">
            {options.map((option) => (
              <Listbox.Option
                key={option.id}
                value={option}
                className="cursor-pointer  px-4 py-1  font-semibold text-gray-600"
              >
                {option.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default Dropdown;
