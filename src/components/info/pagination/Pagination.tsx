import React, { useState } from 'react';

type Props = {
  page: string | null;
  elementCount: number;
  onPageChange: (key: string, value: string) => void;
  onLimitChange: (key: string, value: string) => void;
};

const Pagination = ({
  page,
  elementCount,
  onLimitChange,
  onPageChange,
}: Props) => {
  const [limit, setLimit] = useState(10);
  // const [searchParams, setSearchParams] = useSearchParams();

  const handleItemsPerPageChange = (e: { target: { value: string } }) => {
    const selectedItemsPerPage = Number(e.target.value);
    setLimit(selectedItemsPerPage);
    onLimitChange('limit', limit.toString());
  };

  const handleClick = (page: number) => {
    onPageChange('page', page.toString());
  };

  // console.log('pagebtns', pageButtons);
  console.log(elementCount);
  return (
    <div>
      <h1></h1>
      <label>
        Items per page:
        <select value={limit} onChange={handleItemsPerPageChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={elementCount}>All</option>
        </select>
      </label>
      <div className="page__buttons">
        {Array.from({
          length: Math.ceil(elementCount / limit),
        }).map((_item, index) => (
          <button
            key={index}
            className={page === String(index + 1) ? 'active' : ''}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
