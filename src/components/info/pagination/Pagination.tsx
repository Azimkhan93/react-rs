import { useDispatch, useSelector } from 'react-redux';
import ErrorTestButton from '@/components/errorBoundary/errorTestButton';
import styles from './Pagination.module.css';
import { AppDispatch, RootState } from '@/store/store';
import { setItemsPerPage } from '@/store/itemsPerPageSlice';
import React from 'react';

type Props = {
  page: string | null;
  onPageChange: (key: string, value: string) => void;
  onLimitChange: (key: string, value: string) => void;
  elementCount: number;
};
// const initialLimit = 10;
const Pagination = ({
  page,
  elementCount,
  onLimitChange,
  onPageChange,
}: Props) => {
  const itemsPerPage = useSelector(
    (state: RootState) => state.items.itemsPerPage
  );
  const dispatch: AppDispatch = useDispatch();
  const handleItemsPerPageChange = (e: { target: { value: string } }) => {
    dispatch(setItemsPerPage(Number(e.target.value)));
    onLimitChange('limit', e.target.value.toString());
    onPageChange('page', '1');
  };

  const handleClick = (page: number) => {
    onPageChange('page', page.toString());
  };

  return (
    <div className={styles.display_options}>
      <label className={styles.label_class}>
        <span className={styles.select_title}>Items per page:</span>
        <select
          data-testid="limit-selector"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className={styles.select_class}
        >
          <option className={styles.option_class} value={10}>
            10
          </option>
          <option className={styles.option_class} value={20}>
            20
          </option>
          <option className={styles.option_class} value={30}>
            30
          </option>
          <option className={styles.option_class} value={elementCount}>
            All
          </option>
        </select>
      </label>
      <div className={styles.page__buttons}>
        {Array.from({
          length: Math.ceil(elementCount / itemsPerPage),
        }).map((_item, index) => (
          <button
            data-testid={`page-button-${index + 1}`}
            key={index}
            className={
              page === String(index + 1)
                ? `${styles.page_clicked}`
                : `${styles.page}`
            }
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
