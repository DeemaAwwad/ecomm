import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function GetAll() {
  const [currentPage, setCurrentPage] = useState(1);
  const [getall, setGetAll] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const getAll = async (page = 1) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
        params: { page },
      });

      setGetAll(data.products);
      setTotalPages(data.totalPages); // Assuming your API response contains the total number of pages
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAll(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1>Products</h1>
      <nav aria-label="Page navigation example">
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
      </li>
      {Array.from({ length: totalPages }, (_, index) => (
        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        </li>
      ))}
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </li>
    </ul>
  </nav>
      {getall.length > 0 ? (
        getall.map((product) => (
          <div className="item" key={product._id}>
            <div>
              <h2>{product.name}</h2>
              <img src={product.mainImage.secure_url} alt={product.name} />
              <p>Price: ${product.finalPrice}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}

 
    </div>
  );
}

