import React from "react";
import { useState } from "react";
import "./SearchBar.css";
import { FaSearch } from 'react-icons/fa';


export default function SearchBar({data,selectedProduct}) {

  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm,item) => {
    setValue(searchTerm);
    selectedProduct([item])
    console.log("search ", searchTerm);
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <nav className="center">
            <div>
              <form role="search">
                <div className="input-group">
                  <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className="form-control"
                  />
                  <div className="input-group-btn">
                    <button
                      type="button"
                      onClick={() => console.log('Clicked')}
                      className="btn btn-search btn-danger"
                    >
                      <span className="label-icon">Search</span>
                      <span><FaSearch/></span>
                    </button>
                  </div>
                </div>
                <div className="dropdown">
                 {data.filter((item)=>{
                    const searchTerm = value.toLowerCase();
                    const description = item.description.toLowerCase()
                    const cnS2p = String(item.cn_s2p)
                    return searchTerm && description !== searchTerm && (description.startsWith(searchTerm) || cnS2p.startsWith(searchTerm))
                 }).slice(0,10)
                 .map((item)=>(
                    <div onClick={()=>onSearch(item.description,item)} className="dropdown-row" key={item._id}> <span>{item.company}</span> <span>{item.description}</span> <span>{item.cn_s2p}</span> </div>
                 ))}
                </div>
              </form>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
