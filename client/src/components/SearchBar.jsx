import React, { useState, useRef } from "react";
import "./SearchBar.css";
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({data,selectedProduct}) {

  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef(null);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm,item) => {
    setValue(searchTerm);
    selectedProduct([item])
    console.log("search ", searchTerm);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (value.length > 0) {
        setFocused(true);
        if (focusedIndex === -1) {
          setFocusedIndex(0);
          const firstDropdownItem = document.querySelector(".dropdown-row");
          if (firstDropdownItem) {
            firstDropdownItem.focus();
          }
        } else {
          const nextDropdownItem = document.querySelectorAll(".dropdown-row")[focusedIndex + 1];
          if (nextDropdownItem) {
            setFocusedIndex(focusedIndex + 1);
            nextDropdownItem.focus();
          }
        }
      }
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setFocused(false);
      setFocusedIndex(-1);
    }, 200);
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
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="הקלד מספר מקט או שם מוצר"
                    ref={inputRef}
                  />
                  <div className="input-group-btn">
                    <button
                      type="button"
                      onClick={() => console.log('Clicked')}
                      className="btn btn-search btn-danger"
                    >
                      <span><FaSearch/></span>
                      <span className="label-icon">חפש</span>
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
                 .map((item, index)=>(
                    <div 
                      tabIndex={focused && index === focusedIndex ? "0" : "-1"}
                      onClick={(e)=>{
                        e.preventDefault()
                        onSearch(item.description,item)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          onSearch(item.description,item)
                        }
                      }}
                      className="dropdown-row"
                      key={item._id}
                    >
                      <span>{item.company}</span> 
                      <span>{item.description}</span> 
                      <span>{item.cn_s2p}</span> 
                    </div>
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
