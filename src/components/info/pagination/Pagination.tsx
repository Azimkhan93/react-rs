import { useDispatch, useSelector } from 'react-redux';
import ErrorTestButton from '../../errorBoundary/errorTestButton';
import './Pagination.css';
import { AppDispatch, RootState } from '../../../store/store';
import { setItemsPerPage } from '../../../store/itemsPerPageSlice';

type Props = {
  page: string | null;
  limitParam: string | null;
  onPageChange: (key: string, value: string) => void;
  onLimitChange: (key: string, value: string) => void;
  elementCount: number;
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
  const itemsPerPage = useSelector(
    (state: RootState) => state.items.itemsPerPage
  );
  const dispatch: AppDispatch = useDispatch();
  const handleItemsPerPageChange = (e: { target: { value: string } }) => {
    dispatch(setItemsPerPage(Number(e.target.value)));
    onLimitChange('limit', itemsPerPage.toString());
    onPageChange('page', '1');
  };

  const handleClick = (page: number) => {
    onPageChange('page', page.toString());
  };

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
