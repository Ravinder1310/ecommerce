import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import axios from "axios";
import { Link, json, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import "../style/cards.css"
import "../style/sidebar.css"
import Swipper from "../components/Swipper";

const Landing = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const min = 10;
  const max = 75;

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //getall products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    
    let allCecked = [...checked];
    if (value) {
      allCecked.push(id);
    } else {
      allCecked = allCecked.filter((c) => c !== id);
    }
    setChecked(allCecked);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filteredProducts();
  }, [checked, radio]);

  // get filtered products
  const filteredProducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filter`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Layout title={"Home - U-Look"}>
        <div className="row bigContainer">
          <div className="col-md-2 sidebar">
            <h4 className="text-center">Filter by Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  style={{fontSize:"13px" }}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center mt-4">Filter by Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-md-9 container1">
            <img src="/images/prod1.gif" alt="error" width={'95%'} height={'150px'}/>
           
            <div>
              {
               loading ? <div style={{textAlign:"center"}}> <img width={'300px'} height={'300px'} src='/images/spinner.gif'/></div> : 
               <div>
                 <div className="d-flex flex-wrap">
                 {products?.map((p) => (
                  <div style={{ width: "13rem",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className="card m-2">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top zoom-image"
                      height={'170px'}
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h6 className="card-title">{p.name.substring(0, 17)}...</h6>
                      <p className="card-text">
                        {p.description.substring(0, 30)}...
                      </p>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                        <p className="card-text offer">Offer: {Math.floor(Math.random() * (max - min + 1)) + min}%</p>
                      <p className="card-text price">Price:- ${p.price}</p>
                      </div>
                      
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/product/${p.slug}`)}
                        style={{fontSize:"11px"}}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-secondary ms-1"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem('cart',JSON.stringify([...cart, p]))
                          toast.success("Item added to Cart");
                        }}
                        style={{fontSize:"11px"}}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
                 </div>
                 <div className="container text-center m-2 p-3">
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
             </div>
               </div>
               
              }
                
            </div>
            
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Landing;
