import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import axios from "axios";
import { Link, json, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import "../style/cards.css";
import "../style/sidebar.css";
import Swipper from "../components/Swipper";
import { Header1 } from "../components/header1";

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
      toast.error("Something went wrong in getting category");
    }
  };

  // const handleRangeChange = (e) => {
  //   setRadio([parseFloat(e.target.value), parseFloat(e.target.value) + 1.9]);
  // };

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
      setProducts(data?.products);
      console.log(data?.products[0].photo1);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something Went Wrong");
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
    // console.log(products[0].photos);
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

  const baseURL = process.env.REACT_APP_API;

  return (
    <div>
      <Header1 />
      <Layout title={"Home - U-Look"}>
        <img width={"100%"} src="/images/saleLive1.png" />
        <div className="row bigContainer">
          {/* <div className="col-md-2 sidebar">
            <h4 className="text-center">Filter by Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  style={{ fontSize: "13px" }}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center mt-4">Filter by Price</h4>
            <div className="d-flex flex-column">
              <input
                type="range"
                min={0}
                max={8}
                step={1} // Adjust the step as needed
                value={radio[0]}
                onChange={handleRangeChange}
              />
              <output>{`$${radio[0]} to $${radio[0] + 1.9}`}</output>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div> */}
          <div className="col-md-15 ">
            <img
              src="/images/bnr3.webp"
              alt="error"
              width={"100%"}
              height={"300px"}
              className="topBanner"
              style={{ marginTop: "40px" }}
            />
            <div className="bannerSlider">
              <Swipper /> 
            </div>
            <div>
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  {" "}
                  <img
                    width={"300px"}
                    height={"300px"}
                    src="/images/spinner.gif"
                  />
                </div>
              ) : (
                <div className="container1">
                  <h4>Hot List</h4>
                  <div className="container2"> 
                    {products?.map((p) => (
                      <div
                        onClick={() => navigate(`/product/${p.slug}`)}
                        className="card "
                      >
                        <img
                          src={`${baseURL}/${p.photo1}`}
                          className="card-img zoom-image"
                          height={"220px"}
                          alt={p.name}
                        />
                        <div className="card-body">
                          <p className="card-title">
                            {p.name.substring(0, 40)}...
                          </p>
                          {/* <p className="card-text">
                            {p.description.substring(0, 37)}...
                          </p> */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div className="price-offer">
                            <p className="price"><i class="fa fa-inr"></i>{p.price}</p>
                            <p className="offerPrice"><i class="fa fa-inr"></i>{Math.floor(p.price - ((p.price * p.offer)/100))}</p>
                            {/* <div className="verticleLine"></div> */}
                            <p className="offer"> {p.offer}%</p>
                            </div>
                            
                            {/* <p className="card-text price">
                              OfferPrice:- {p.offerPrice}
                            </p> */}
                          </div>
                        
                         
                        </div>
                        {/* <div className="btns-cart-container">
                        <div className="btns-cart-details">
                         <button
                            className="detailsBtn"
                            onClick={() => navigate(`/product/${p.slug}`)}
                          >
                            More Details
                          </button>
                          <button
                            className="cartBtn"
                            onClick={() => {
                              setCart([...cart, p]);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, p])
                              );
                              toast.success("Item added to Cart");
                            }}
                          >
                            👜
                          </button>
                         </div>
                        </div> */}
                        
                      </div>
                    ))}
                  </div>
                  <div className="container text-center m-2 p-3">
                    {products && products.length < total && (
                      <button
                        className="btn btn-warning "
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
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Landing;
