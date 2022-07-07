import React from 'react';

interface DropdownProps<T> {
  list: Array<T>,
  addItem: (arg:T, arg2: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

const Dropdown = <T,>({list, addItem}: DropdownProps<T>) => {
  return (
    <div id="dropdown" className="absolute shadow top-100 bg-white z-40 w-64 lef-0 rounded max-h-select overflow-y-auto">
      <div className="flex flex-col w-full">
        {
          list.map((item: T, key: number) => {
            return (
              <div
                key={key} 
                className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100" 
                onClick={(e) => addItem(item, e)}
              >
                <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                  <div className="w-full items-center flex">
                    <div className="mx-2 leading-6">
                      {item}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Dropdown;
