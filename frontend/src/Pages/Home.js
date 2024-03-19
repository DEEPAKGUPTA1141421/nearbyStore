import React, { Fragment, useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "./styles/Home.css";
import HomeMain from "./mainsection/HomeMain";
import BestSelling from "./mainsection/BestSelling";
import Products from "./mainsection/Products";
import Events from "./mainsection/Events";
import Faqs from "./mainsection/Faqs";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";
import Footer from "./Footer";
import axios from "axios";
import { server } from "../FixedUrl";
import FeaturedProduct from "./mainsection/FeaturedProduct";
import Sponsered from "./mainsection/Sponsered";
import NavbarMenu from "./NavbarMenu";
import Crousel from "./mainsection/Crousel";
import { useDispatch, useSelector } from "react-redux";
import { loaduser } from "../actions/userAction";
import CityShop from "./mainsection/CityShop";
const Home = () => {
  const [searchText, setSearchText] = useState("");
  const { user } = useSelector((state) => state.userreducer);
  const[role,setRole]=useState();
  console.log("role",role);
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();

  const handlebecomeseller =(e) => {
    navigate("/becomeSeller");
  };
  const handlebecomerider=(e)=>{
    navigate("/becomeRider");
  }
  const handleShopNow = async (e) => {
    navigate("/productPage");
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchText(query);

    if (query) {
      try {
        const response = await axios.get(
          `${server}/product/search?searchTerm=${query}`
        );
        console.log(response);

        setSearchResults(response.data.products);
        setShowResults(true);

        console.log(searchResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleDocumentClick = (e) => {
    if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
      setShowResults(false);
    }
  };

  const submitSearch = () => {
    navigate("/search-products", {
      state: { searchResults: searchResults, searchText: searchText },
    });
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    dispatch(loaduser());
  }, [dispatch]);
  useEffect(() => {
    if(user) {
      setRole(user.role);
    }
  });
  return (
    <Fragment>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="nearByStore" />
        </div>
        <div className="secondclass">
          <div className="searchbox" ref={searchInputRef}>
            <input
              type="text"
              className="search-input"
              onChange={handleSearchChange}
              value={searchText}
              placeholder="Search..."
            />
            <button onClick={submitSearch} className="search-btn">
              <span>Search</span>
            </button>
            {searchText && (
              <div className="result-container">
                {searchResults.map((result) => (
                  <Link to={`/product/${result._id}`}>
                    <div key={result.id} className="search-result-div">
                      <img
                        src="https://www.parivarceremony.com/media/catalog/product/cache/62408a38a401bb86dbe3ed2f017b539f/p/2/p2167sr06.jpg"
                        className="search-result-image"
                      />
                      {result.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="becomeseller">
          {
    user &&  // Check if role is falsy (i.e., undefined or null)
    <React.Fragment> {/* or <></> for short */}
      {role!=="seller"&&<button className="become-seller-btn" onClick={handlebecomeseller}>
        Become Seller
      </button>}
      {
        role!=="rider"&&<button className="become-seller-btn" onClick={handlebecomerider}>
        Become Rider
      </button>
      }
    </React.Fragment>
  }
          </div>
          <div></div>
        </div>
      </div>
      {/* <NavbarMenu active={active} setActive={setActive}/> */}
      <div className="navbar2">
        <div className="allpages">
          <p>All Categories</p>
        </div>
        <div className="allpages">
          <p></p>
        </div>

        <div onClick={(e) => setActive(1)} className="allpages">
          <p>Home</p>
        </div>
        <div onClick={(e) => setActive(2)} className="allpages">
          <p>City Wise Shop</p>
        </div>
        <div onClick={(e) => setActive(3)} className="allpages">
          <p>Products</p>
        </div>
        <div onClick={(e) => setActive(4)} className="allpages">
          <p>Events</p>
        </div>
        <div onClick={(e) => setActive(5)} className="allpages">
          <p>FAQ</p>
        </div>

        <div className="allpages">
          <p></p>
        </div>

        {user ? (
          <div className="cart-wish-profile">
            <div>
              {
                role!=undefined&&role==="user"&&<Link to="/userprofile" className="options">
                <CgProfile />
              </Link>
              }
              {
                role!=undefined&&role==="seller"&&<Link to="/mainsellerpage" className="options">
                <CgProfile />
              </Link>
              }
              {
                role!=undefined&&role==="rider"&&<Link to="/rider" className="options">
                <CgProfile />
              </Link>
              }
              {
                role!=undefined&&role==="admin"&&<Link to="/admin" className="options">
                <CgProfile />
              </Link>
              }
            </div>
            <div>
              <Link to="/cart" className="options">
                <FaShoppingCart />
              </Link>
            </div>
            <div>
              <Link to="/wishlist" className="options">
                <FaHeart />
              </Link>
            </div>
          </div>
        ) : (
          <div className="login-signup">
            <Link to="/sign-up">Sign up</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
      {active === 1 && (
        <>
          <Crousel />
          <Sponsered />
          <FeaturedProduct />
          <BestSelling />
          <div style={{position:"relative",top:"5rem"}}><Footer /></div>
        </>
      )}
      {active === 2 && <CityShop />}
      {active === 3 && <Products />}
      {active === 4 && <Events />}
      {active === 5 && <Faqs />}
    </Fragment>
  );
};
export default Home;
