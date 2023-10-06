"use client";
import { Combobox, Transition } from "@headlessui/react";
import { SearchManufacturerProps } from "@/Types";
import Image from "next/image";
import { useState, Fragment } from "react";
import { manufacturers } from "@/constants";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");

  const getFilteredItems = (query: string) => {
    if (query === "") return [];
    return manufacturers.filter((item) =>
      item
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(query.toLowerCase().replace(/\s+/g, ""))
    );
  };

  const manufacturerOptions = () => {
    const filteredItems = getFilteredItems(query);
    return filteredItems.map((item) => (
      <Combobox.Option
        key={item}
        value={item}
        className={({ active }) =>
          `relative search-manufacturer__option ${
            active ? "bg-primary-blue text-white" : "text-gray-900"
          }`
        }
      >
        {item}
      </Combobox.Option>
    ));
  };

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="car logo"
            />
          </Combobox.Button>
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          ></Combobox.Input>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options>{manufacturerOptions()}</Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
