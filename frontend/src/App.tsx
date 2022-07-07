import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Header from "./Header";
import SearchFilter from "./SearchFilter";
import Table from "./Table";
import Pagination from "./Pagination";
import "./index.css";

type InsuranceType = "HEALTH" | "LIABILITY" | "HOUSEHOLD";
type Provider = "BARMER" | "AOK" | "TK";
export type Status = "ACTIVE" | "PENDING" | "CANCELLED" | "DROPPED_OUT";

interface Customer<T> {
  dataOfBirth: T,
  firstName: T,
  id: T,
  lastName: T,
}

export interface Data {
  customer: Customer<string>,
  endDate: null,
  id: string,
  insuranceType: InsuranceType,
  provider: Provider,
  startDate: string,
  status: Status,
}

const App = () => {
  const [allData, setAllData] = useState<Data[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(5);
  const [currentResults, setCurrentResults] = useState<Data[]>([]);
  const [allResults, setAllResults] = useState<Data[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const getData = await axios.get("http://localhost:4000/policies");
      setAllData(getData.data);
    }
    fetchAllData();
  }, []);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const getFilterdPosts = (filterData: Data[]) => {
    if (filterData) {
      setAllResults(filterData);
      setCurrentPage(1);
    }
  }

  useEffect(() => {
    setCurrentResults(allResults.slice(indexOfFirstPost, indexOfLastPost))
  }, [currentPage, indexOfFirstPost, indexOfLastPost, allResults])
  
  return (
    <div>
      <Navbar />
      <div className="w-full p-8">
        <Header />
        <SearchFilter 
          data={allData} 
          filterPosts={getFilterdPosts} 
        />
        <Table 
          results={currentResults} 
          indexOfFirstPost={indexOfFirstPost}
        />
        <Pagination
          postsPerPage={postsPerPage} 
          allResults={allResults.length}
          paginate={paginate}
          currentPage={currentPage} 
        />
      </div>
    </div>
  );
};

export default App;
