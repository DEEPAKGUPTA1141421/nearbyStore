import React, { Fragment, useRef, useState } from "react";
import { categoriesData } from "./StaticData";
import { Link } from "react-router-dom";
import { server } from "../FixedUrl";
import './styles/CategoryHeader.css';

const MultiVendorWebsite = () => {
  const toggleMenu = (e) => {
    e.stopPropagation();
    let SubMenu = e.target.querySelector("ul");
    if (!SubMenu) return;
    if (SubMenu.style.display === "none" || !SubMenu.style.display) {
      SubMenu.style.display = "block";
    } else {
      SubMenu.style.display = "none";
    }
  };

  const handleClick = (e) => {
    const SubMenu = e.currentTarget.querySelector("ul");
    if (!SubMenu) return;
    if (SubMenu.style.display === "none" || !SubMenu.style.display) {
      SubMenu.style.display = "block";
    } else {
      SubMenu.style.display = "none";
    }
  };

  const recursion = (data) => {
    return (
      <ul className="subMenu">
        {data.map((item, i) => (
          <>
            <Link
              className="linkCategory"
              to={`/product/search/category=${item.label}`}
              key={i}
            >
              {item.label}
            </Link>
            {item.subMenu && recursion(item.subMenu)}
          </>
        ))}
      </ul>
    );
  };

  return (
    <Fragment>
      <div className="navbarContainer">
        <div>
          <ul className="directMenu">
            {categoriesData.length > 0 &&
              categoriesData.map((data, index) => (
                <li
                  key={index}
                  onClick={(e) => handleClick(e)}
                >
                  <div className="selected">{data.label}</div>
                  {data.subMenu && recursion(data.subMenu)}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};
export default MultiVendorWebsite;

