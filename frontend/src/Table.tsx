import { useEffect, useState } from "react";
import Badge from "./Badge";
import axios from "axios";

const Table = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const getData = await axios.get("http://localhost:4000/policies");
      setData(getData.data)
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-lg shadow-sm">
              <table className="min-w-full">
                <thead className="border-b bg-gray-100">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      #
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Name
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Provider
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Type
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data ? data.map((item:any, index:number) => {
                    return (
                      <tr key={item.id} className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {`${item.customer.firstName} ${item.customer.lastName}`}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.provider}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.insuranceType}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <Badge status={item.status} />
                        </td>
                      </tr>
                    )
                  }) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};
export default Table;