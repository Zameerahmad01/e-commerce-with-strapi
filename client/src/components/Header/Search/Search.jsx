import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from '../../../hooks/useFetch'

import "./Search.scss";
import { MdClose } from "react-icons/md";

const Search = ({ setShowSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onChange = (e)=>{
    setQuery(e.target.value);
  }

  let {data} = useFetch(`/api/products?populate=*&filters[title][$contains]=${query}`)

  if (!query.length) {
    data=null;
  }
  return (
    <div className="search_modal">
      <div className="form_field">
        <input type="text" 
        autoFocus 
        placeholder="Search for products" 
        value={query}
        onChange={onChange}
        />

        <MdClose
          className="close_btn"
          onClick={() => {
            setShowSearch(false);
          }}
        />
      </div>

      <div className="search_result-content">
        <div className="search_result">
         {data?.data?.map(item => (
           <div key={item.id} className="search_result-item" onClick={()=>{
            navigate("/product/" + item.id)
            setShowSearch(false)
           }}>
           <div className="img_container">
             <img src={process.env.REACT_APP_STRIPE_DEV_URL + item.attributes.img.data[0].attributes.url} alt="" />
           </div>
           <div className="prod_details">
             <span className="name">{item.attributes.title}</span>
             <span className="desc">{item.attributes.desc}</span>
           </div>
         </div>
         ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
