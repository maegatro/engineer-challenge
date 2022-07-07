interface PaginationProps<T> {
  postsPerPage: T,
  allResults: T,
  paginate: (arg: T) => void,
  currentPage: T,
}

const Pagination = ({
  postsPerPage,
  allResults,
  paginate,
  currentPage,
}: PaginationProps<number>) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allResults / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='py-2'>
      <div>
        <p className='text-sm text-gray-700'>
          Showing
          <span className='font-medium'>
            {" "}
            {allResults === 0 ? 0 : currentPage * postsPerPage - 4}{" "}
          </span>
          to
          <span className='font-medium'> {(currentPage * postsPerPage) > allResults ? allResults : currentPage * postsPerPage} </span>
          of
          <span className='font-medium'> {allResults} </span>
          results
        </p>
      </div>
      <nav className='block'>
        <ul className='flex pl-0 rounded list-none flex-wrap'>
          <li>
            {pageNumbers.map((number, index) => (
              <button
                key={index}
                onClick={() => {
                  paginate(number);
                }}
                className={
                  currentPage === number
                    ? "bg-blue border-red-300 text-red-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                }
              >
                {number}
              </button>
            ))}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;