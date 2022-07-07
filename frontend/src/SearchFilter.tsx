import { useEffect, useState } from "react";
import Multiselect from "./MultiSelect";
import { Data } from './App';

interface SearchFilterProps {
  data: Data[],
  filterPosts: (arg: Data[]) => void
}

interface Filter<T> {
  name: T,
  provider: Array<T>,
  type: Array<T>,
  status: Array<T>,
}

const defaultFilter = {
  name: "",
  provider: [],
  type: [],
  status: [],
};

const SearchFilter = ({data, filterPosts}: SearchFilterProps) => {
  const [filter, setFilter] = useState<Filter<string>>(defaultFilter);

  const handleChange = (item: string, inputValue: string, remove: boolean) => {
    if (inputValue === "Provider") {
      if (remove) {
        setFilter((prev) => {
          return {
            ...prev,
            provider: prev.provider.filter((e) => e !== item)
          }
        })
      } else {
        setFilter((prev) => {
          if (prev.provider.indexOf(item) === -1) {
            return {
              ...prev,
              provider: [...prev.provider, item]
            }
          }
          return prev;
        })
      }
    }
    if (inputValue === "Type") {
      if (remove) {
        setFilter((prev) => {
          return {
            ...prev,
            type: prev.type.filter((e) => e !== item)
          }
        })
      } else {
        setFilter((prev) => {
          if (prev.type.indexOf(item) === -1) {
            return {
              ...prev,
              type: [...prev.type, item]
            }
          }
          return prev;
        })
      }
    }
    if (inputValue === "Status") {
      if (remove) {
        setFilter((prev) => {
          return {
            ...prev,
            status: prev.status.filter((e) => e !== item)
          }
        })
      } else {
        setFilter((prev) => {
          if (prev.status.indexOf(item) === -1) {
            return {
              ...prev,
              status: [...prev.status, item]
            }
          }
          return prev;
        })
      }
    }
  }

  const clearFilter = () => {
    setFilter(defaultFilter);
  }

  const filterData = (data:Data[]) => {
    const filteredData = data.filter((item:Data) => {
      if (filter.name) {
        const fullName = `${item.customer.firstName} ${item.customer.lastName}`;
        return item.customer.firstName.toLowerCase().startsWith(filter.name.toLowerCase()) || item.customer.lastName.toLowerCase().startsWith(filter.name.toLowerCase()) || fullName.toLowerCase().startsWith(filter.name.toLowerCase());
      }
      return item;
    })
    .filter((item:Data) => {
      if (filter.provider.length > 0) {
        return Object.values(item).some(r => filter.provider.includes(r));
      }
      return item;
    })
    .filter((item:Data) => {
      if (filter.type.length > 0) {
        return Object.values(item).some(r => filter.type.includes(r));
      }
      return item;
    })
    .filter((item:Data) => {
      if (filter.status.length > 0){
        return Object.values(item).some(r => filter.status.includes(r));
      }
      return item;
    })
    return filteredData;
  }

  useEffect(() => {
    const dataToPosts = filterData(data);
    filterPosts(dataToPosts);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, data])

  return (
    <>
      <div className="flex alight-center">
        <div>
            <label className="m-1">
              Name
              <input
                type="text"
                className="flex justify-center items-center m-1 font-normal py-2 px-2 rounded-md bg-white text-teal-700 bg-teal-100 border border-teal-300"
                value={filter.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFilter({...filter, name: e.currentTarget.value});
                }}
              />
            </label>
        </div>
        <div>
          <Multiselect 
            label="Provider"
            items={["TK", "DAK", "BARMER", "AOK"]}
            onChange={(item: string, remove: boolean) => handleChange(item, "Provider", remove)}
            value={filter.provider}
          />
        </div>
        <div>
          <Multiselect 
            label="Type"
            items={["HEALTH", "LIABILITY", "HOUSEHOLD"]}
            onChange={(item: string, remove: boolean) => handleChange(item, "Type", remove)}
            value={filter.type}
          />
        </div>
        <div>
          <Multiselect 
            label="Status"
            items={["ACTIVE", "PENDING", "CANCELLED", "DROPPED_OUT"]}
            onChange={(item: string, remove: boolean) => handleChange(item, "Status", remove)}
            value={filter.status}
          />
        </div>
        <div className="flex justify-center items-center m-3">
          <button onClick={clearFilter} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
            Clear
          </button>
        </div>
      </div>
    </>
  )
};


export default SearchFilter;