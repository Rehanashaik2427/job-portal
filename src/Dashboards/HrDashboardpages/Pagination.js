import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageClick }) => {
  const getDisplayNumbers = () => {
    const displayNumbers = [];
    const maxButtons = 5; // Maximum number of buttons to display
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (totalPages <= maxButtons) {
      // If total pages are less than or equal to maxButtons, display all page numbers
      for (let i = 1; i <= totalPages; i++) {
        displayNumbers.push(i);
      }
    } else {
      // Display first page, page 2, and dots if currentPage is greater than 2
      displayNumbers.push(1, 2);
      if (currentPage > 2) {
        displayNumbers.unshift('...');
      }

      // Display pages around the current page
      for (let i = startPage; i <= endPage; i++) {
        displayNumbers.push(i);
      }

      // Display dots and last page if necessary
      if (endPage < totalPages - 1) {
        displayNumbers.push('...');
      }
      displayNumbers.push(totalPages);
    }

    return displayNumbers;
  };

  const numbers = getDisplayNumbers();

  return (
    <ul className='pagination'>
      {numbers.map(number => (
        <li key={number} className={currentPage === number ? 'active' : ''}>
          {typeof number === 'number' ? (
            <button onClick={() => handlePageClick(number)} className={`page-link ${currentPage === number ? 'active-page' : ''}`}>
              {number}
            </button>
          ) : (
            <span>{number}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
