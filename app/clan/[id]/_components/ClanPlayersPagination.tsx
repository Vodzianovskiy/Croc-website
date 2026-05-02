"use client";

import ReactPaginate from "react-paginate";
import styles from "./clan-players-pagination.module.css";

interface ClanPlayersPaginationProps {
  page: number;
  pageCount: number;
  isMobile: boolean;
  isDisabled?: boolean;
  onPageChange: (selectedPage: number) => void;
}

export default function ClanPlayersPagination({
  page,
  pageCount,
  isMobile,
  isDisabled = false,
  onPageChange,
}: ClanPlayersPaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <div className={styles.paginationWrapper} aria-disabled={isDisabled}>
      <ReactPaginate
        breakLabel={<span className={styles.pageDots}>…</span>}
        nextLabel={<span className={styles.pageArrow}>›</span>}
        previousLabel={<span className={styles.pageArrow}>‹</span>}
        onPageChange={({ selected }) => {
          if (isDisabled) return;
          if (selected === page) return;
          onPageChange(selected);
        }}
        pageCount={pageCount}
        forcePage={page}
        pageRangeDisplayed={isMobile ? 2 : 4}
        marginPagesDisplayed={isMobile ? 1 : 2}
        containerClassName={styles.pagination}
        pageClassName={`${styles.pageItem} ${
          isDisabled ? styles.pageItemDisabledSoft : ""
        }`}
        pageLinkClassName={styles.pageLink}
        previousClassName={`${styles.pageItem} ${
          isDisabled ? styles.pageItemDisabledSoft : ""
        }`}
        nextClassName={`${styles.pageItem} ${
          isDisabled ? styles.pageItemDisabledSoft : ""
        }`}
        previousLinkClassName={styles.pageLink}
        nextLinkClassName={styles.pageLink}
        breakClassName={styles.pageDotsWrap}
        breakLinkClassName={styles.pageLink}
        activeClassName={styles.pageItemActive}
        disabledClassName={styles.pageItemDisabled}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
