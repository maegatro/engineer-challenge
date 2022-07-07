import React, { useEffect, useState } from 'react';
import Dropdown from "./Dropdown";

interface MultiselectProps<T> {
  label: T,
  items: Array<T>,
  onChange: (arg:T, arg2:boolean) => void,
  value: Array<T>
}

const Multiselect = <T,>({label, items, onChange, value}: MultiselectProps<T>) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [selectedItems, setSelected] = useState<Array<T>>(value);

  useEffect(() => {
    setSelected(value)
  }, [value])

  const toogleDropdown = () => {
      setDropdown(!dropdown)
  };

  const addTag = (item: T) => {
    if(selectedItems && selectedItems.indexOf(item) === -1) {
      setSelected(selectedItems.concat(item));
    }
    onChange && onChange(item, false);
    setDropdown(false);
  };

  const removeTag = (item: T) => {
    const filtered = selectedItems.filter((e) => e !== item);
    onChange && onChange(item, true);
    setSelected(filtered);
  }

  return (
    <div className="autcomplete-wrapper">
      <div className="autcomplete">
        <label className="m-1">
          {label}
        </label>
        <div className="w-full flex flex-col items-center mx-auto">
          <div className="w-full">
            <div className="flex flex-col items-center relative">
              <div className="w-full">
                <div className="my-1 p-1 flex border border-gray-200 bg-white rounded ">
                  <div className="flex flex-auto flex-wrap">
                    {
                      selectedItems ? selectedItems.map((tag:T, index:number) => {
                        return (
                          <div key={index} className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300">
                            <div className="text-xs font-normal leading-none max-w-full flex-initial">{ tag }</div>
                            <div className="flex flex-auto flex-row-reverse">
                              <div onClick={() => removeTag(tag)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                                className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </div>
                            </div>
                          </div>
                        )
                      }) : null
                    }
                    <div className="flex-1">
                        <input readOnly placeholder="" className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"/>
                    </div>
                  </div>
                  <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200" onClick={toogleDropdown}>
                    <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </button>
                  </div>
                </div>
              </div>
           </div>
           { dropdown ? <Dropdown list={items} addItem={addTag} />: null }
          </div>
        </div>
      </div>
    </div>
  )
};

export default Multiselect;