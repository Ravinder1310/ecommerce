import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryProducts = () => {
   const params = useParams();
   const [products, setProducts] = useState([]);
   const [category, setCategory] = useState([]);
   const navigate = useNavigate()
   
  useEffect(() => {
   if(params?.slug) getProductByCategory()
  },[params?.slug])

   const getProductByCategory = async() => {
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
        setProducts(data?.products);
        setCategory(data?.category)
    } catch (error) {
        console.log(error);
    }
   }

  return (
    <Layout title={'Category - Ecommerce app'}>
        <div className='container mt-3'>
            <h4 className='text-center'>Category :- {category?.name}</h4>
            <h6 className='text-center'>{products?.length} result found</h6>
            <div className='row'>
            <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 40)}...
                      </p>
                      <p className="card-text">Price:- ${p.price}</p>
                      <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>
                        More Details
                      </button>
                      <button className="btn btn-secondary ms-1">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Loadmore"}
                </button>
              )}
            </div> */}
          </div>
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProducts