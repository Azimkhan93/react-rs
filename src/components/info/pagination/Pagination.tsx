import ErrorTestButton from '../../errorBoundary/errorTestButton';
import './Pagination.css';
import React from 'react';

type Props = {
  page: string | null;
  limitParam: string | null;
  elementCount: number;
  onPageChange: (key: string, value: string) => void;
  onLimitChange: (key: string, value: string) => void;
};
const initialLimit = 10;
const Pagination = ({
  page,
  limitParam,
  elementCount,
  onLimitChange,
  onPageChange,
}: Props) => {
  const limit = Number(limitParam) || initialLimit;
  const handleItemsPerPageChange = (e: { target: { value: string } }) => {
    const selectedItemsPerPage = Number(e.target.value);
    console.log(selectedItemsPerPage);
    onLimitChange('limit', selectedItemsPerPage.toString());
    onPageChange('page', '1');
  };

  const handleClick = (page: number) => {
    onPageChange('page', page.toString());
  };

  // console.log('pagebtns', pageButtons);
  console.log(elementCount);
  return (
    <div className="display-options">
      <label>
        <span className="select-title">Items per page:</span>
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
            data-testid={`page-button-${index + 1}`}
            key={index}
            className={page === String(index + 1) ? 'page-clicked' : 'page'}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <ErrorTestButton>Error</ErrorTestButton>
    </div>
  );
};

export default Pagination;
