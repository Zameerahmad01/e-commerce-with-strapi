import {Navigate, useNavigate} from "react-router-dom"

import "./Category.scss";



const Category = ({categories}) => {

    const navigate = useNavigate();

    return (
    <div className="shop_by_category">
        <div className="categories">
            {categories?.data?.map((item)=>(
            <div key={item.id} className="category" onClick={()=>{navigate(`/category/${item.id}`)}}>
                <img src={process.env.REACT_APP_STRIPE_DEV_URL + item.attributes?.img?.data?.attributes?.url} alt="" />
            </div>
            ))}
            
        </div>
    </div>
 );
};

export default Category;
