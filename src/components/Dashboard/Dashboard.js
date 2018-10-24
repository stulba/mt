import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({
  handleDelete,
  handleEdit,
  products,
  productsLimit,
  productsCount,
  location,
  match
}) => {
  return (
    <>
      <h1 className="heading">Dashboard</h1>

      <div className="dashboard">
        <div className="dashboard__actions">
          <Link className="btn" to={`${match.url}/add_product`}>
            Add Product
          </Link>
          <Link className="btn" to={`${match.url}/add_category`}>
            Add Category
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
