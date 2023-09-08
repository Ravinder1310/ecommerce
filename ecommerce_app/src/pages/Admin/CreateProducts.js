import React from 'react'
import Layout from '../../components/layouts/Layout';
import AdminMenu from '../../components/layouts/AdminMenu';

const CreateProducts = () => {
  return (
    <Layout title={'Create product - Admin Dashboard'}>
        <div className='container-fluid m-3 p-3'>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Create Product</h1>
        </div>
      </div>
      </div>
    </Layout>
  );
}

export default CreateProducts