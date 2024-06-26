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
import { useDispatch, useSelector } from "react-redux";
import { loaduser } from "../actions/userAction";
import CityShop from "./mainsection/CityShop";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Input,
  Skeleton,
  Text,
  Stack,
} from "@chakra-ui/react";
import Crousel from "./mainsection/Crousel";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { categoriesData } from "./StaticData";
import { loadProductOfAShopitem } from "../actions/sellerAction";
import { GiButterToast } from "react-icons/gi";
const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dropdownmenu, setdropdownmenu] = useState(false);
  const { user } = useSelector((state) => state.userreducer);
  const [role, setRole] = useState();
  console.log("role", role);
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [active, setActive] = useState(1);
  const [shop, setShop] = useState([]);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();
  const [searchLoading, setSearchLoading] = useState(false);
  const handlebecomeseller = (e) => {
    navigate("/becomeSeller");
  };
  const handlebecomerider = (e) => {
    navigate("/becomeRider");
  };
  const handleShopNow = async (e) => {
    navigate("/productPage");
  };

  const handleSearchChange = async (e) => {
    setSearchLoading(true);
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
        setSearchLoading(false);
        console.log(searchResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
      setShowResults(false);
      setSearchLoading(false);
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
    dispatch(loadProductOfAShopitem());
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  });
  const nextshop = () => {
    if (currentIndex == 4) {
      setCurrentIndex(0);
      return;
    }
    let d = currentIndex + (1 % 5);
    setCurrentIndex(d);
  };
  const fetchShop = async () => {
    try {
      const { data } = await axios.get(`${server}/shop/gettopshop`);
      setShop(data.shop);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    fetchShop();
  }, []);
  return (
    <Fragment>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="nearByStore" />
        </div>
        <div className="secondclass">
          <div className="searchbox" ref={searchInputRef}>
            <Input
              style={{position:"relative",top:"10px"}}
              color="white"
              type="text"
              className="search-input"
              onChange={handleSearchChange}
              value={searchText}
              placeholder="Search..."
            />
            <button onClick={submitSearch} className="search-btn">
              <Button>
                <span>Search</span>
              </Button>
            </button>
            {searchText && (
              <div className="result-container" style={{ zIndex: "100" }}>
                {searchResults.map((result) => (
                  <Link to={`/product/${result._id}`}>
                    <div
                      key={result.id}
                      className="search-result-div"
                      style={{ zIndex: "100" }}
                    >
                      <img
                        // src="https://www.parivarceremony.com/media/catalog/product/cache/62408a38a401bb86dbe3ed2f017b539f/p/2/p2167sr06.jpg"
                        src={result.images[0]}
                        className="search-result-image"
                      />
                      {result.name}
                    </div>
                  </Link>
                ))}
                {searchLoading && (
                  <Stack>
                    <Skeleton height="50px" />
                    <Skeleton height="50px" />
                    <Skeleton height="50px" />
                    <Skeleton height="50px" />
                    <Skeleton height="50px" />
                    <Skeleton height="50px" />
                    <Skeleton height="50px" />
                    <Skeleton height="50px" />
                    <Skeleton height="50px" />
                  </Stack>
                )}
              </div>
            )}
          </div>
          <div className="becomeseller">
            {user && ( // Check if role is falsy (i.e., undefined or null)
              <React.Fragment>
                {" "}
                {/* or <></> for short */}
                {role !== "seller" &&role!="rider" && (
                  <button
                    className="become-seller-btn"
                    onClick={handlebecomeseller}
                  >
                    <Button style={{position:"relative",right:"10px"}}>Become Seller</Button>
                  </button>
                )}
                {role !== "rider"&&role!="seller" && (
                  <button
                    className="become-seller-btn"
                    onClick={handlebecomerider}
                  >
                    <Button>Become Rider</Button>
                  </button>
                )}
              </React.Fragment>
            )}
          </div>
          <div></div>
        </div>
      </div>
      {/* <NavbarMenu active={active} setActive={setActive}/> */}
      <div className="navbar2">
        <div className="allpages">
          <Menu>
            <MenuButton as={Button} colorScheme="red">
              All Category
            </MenuButton>
            <MenuList>
              {categoriesData &&
                categoriesData.length > 0 &&
                categoriesData.map((d, index) => (
                  <MenuItem>{d.label}</MenuItem>
                ))}
            </MenuList>
          </Menu>
        </div>
        <div className="allpages">
          <p></p>
        </div>

        <div onClick={(e) => setActive(1)} className="allpages">
          <p>Home</p>
        </div>
        <div onClick={(e) => setActive(2)} className="allpages">
          <p>Search Shop</p>
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
              {role != undefined && role === "user" && (
                <Link to="/userprofile" className="options">
                  <CgProfile />
                </Link>
              )}
              {role != undefined && role === "seller" && (
                <Link to="/mainsellerpage" className="options">
                  <CgProfile />
                </Link>
              )}
              {role != undefined && role === "rider" && (
                <Link to="/rider" className="options">
                  <CgProfile />
                </Link>
              )}
              {role != undefined && role === "admin" && (
                <Link to="/admin" className="options">
                  <CgProfile />
                </Link>
              )}
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
            <Link to="/sign-up">
              <Text>Sign up</Text>
            </Link>
            <Link to="/login">
              <Text>Login</Text>
            </Link>
          </div>
        )}
      </div>
      {active === 1 && (
        <>
          {shop &&
            shop.length > 0 &&
            shop.map((s, index) => (
              <>
                <Card
                  align="center"
                  style={{
                    position: "absolute",
                    top: "350px",
                    zIndex: "20",
                    left: "130px",
                    display: currentIndex === index ? "block" : "none",
                  }}
                >
                  <Button colorScheme="red" onClick={nextshop}>
                    Go To Next Shop
                  </Button>
                  <CardHeader>
                    <Heading
                      size="md"
                      style={{ position: "relative", bottom: "20px" }}
                    >
                      Trending Store
                    </Heading>
                    <Heading size="xl">Visit {s.shopname}</Heading>
                    <Button colorScheme="gray">
                      Shop Location {s.location}
                    </Button>
                    <Button
                      colorScheme="red"
                      style={{ position: "relative", top: "10px" }}
                    >
                      Shop Category {s.category}
                    </Button>
                  </CardHeader>
                  <CardBody>
                    <Text>Visit {s.shopname} to Explore Varoius Project</Text>
                  </CardBody>
                  <CardFooter>
                    <Link to={`/shoppage/${s._id}`}>
                      <Button colorScheme="blue">View Store</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </>
            ))}
          <Crousel />
          <Sponsered />
          <FeaturedProduct />
          <BestSelling />
          <div style={{ position: "relative", top: "5rem" }}>
            <Footer />
          </div>
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
