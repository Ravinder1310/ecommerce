import React from "react";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchInput = () => {
    const [values, setValue] = useSearch();
    const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
      try {
         const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`)
         setValue({ ...values, results: data, keyword: '' });
         navigate('/search');
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div style={{marginRight:"150px",marginTop:"7px"}}>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          style={{color:"grey"}}
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValue({...values, keyword: e.target.value})}
        />
        <button className="btn btn-outline-success" style={{fontSize:"13px",backgroundColor:"#e80071",color:"white",border:"transparent"}} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
