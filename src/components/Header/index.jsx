import { PATH } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchDrawer from "../SearchDrawer";

export default function Header() {
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  return (
    <>
      <SearchDrawer
        open={openSearchDrawer}
        onClose={() => setOpenSearchDrawer(false)}
      />{" "}
      <div className="navbar navbar-topbar navbar-expand-xl navbar-light bg-light">
        <div className="container">
          {/* Promo */}
          <div className="mr-xl-8">
            <i className="mr-2 fe fe-truck" />{" "}
            <span className="heading-xxxs">Vận chuyển toàn cầu</span>
          </div>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#topbarCollapse"
            aria-controls="topbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Collapse */}
          <div className="navbar-collapse" id="topbarCollapse">
            {/* Nav */}
            <ul className="mr-auto nav nav-divided navbar-nav">
              <li className="nav-item dropdown">
                {/* Toggle */}
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  <img
                    className="mb-1 mr-1"
                    src="/img/flags/usa.svg"
                    alt="..."
                  />{" "}
                  United States
                </a>
                {/* Menu */}
                <div className="dropdown-menu minw-0">
                  <a className="dropdown-item" href="#!">
                    <img
                      className="mb-1 mr-2"
                      src="/img/flags/usa.svg"
                      alt="USA"
                    />
                    United States
                  </a>
                  <a className="dropdown-item" href="#!">
                    <img
                      className="mb-1 mr-2"
                      src="/img/flags/canada.svg"
                      alt="Canada"
                    />
                    Canada
                  </a>
                  <a className="dropdown-item" href="#!">
                    <img
                      className="mb-1 mr-2"
                      src="/img/flags/germany.svg"
                      alt="Germany"
                    />
                    Germany
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                {/* Toggle */}
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  USD
                </a>
                {/* Menu */}
                <div className="dropdown-menu minw-0">
                  <a className="dropdown-item" href="#!">
                    USD
                  </a>
                  <a className="dropdown-item" href="#!">
                    EUR
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                {/* Toggle */}
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  English
                </a>
                {/* Menu */}
                <div className="dropdown-menu minw-0">
                  <a className="dropdown-item" href="#">
                    English
                  </a>
                  <a className="dropdown-item" href="#">
                    Tiếng Việt
                  </a>
                  <a className="dropdown-item" href="#">
                    China
                  </a>
                </div>
              </li>
            </ul>
            {/* Nav */}
            <ul className="mr-8 nav navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="./shipping-and-returns.html">
                  Quy định giao hàng
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./faq.html">
                  Câu hỏi
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./contact-us.html">
                  Liên hệ
                </a>
              </li>
            </ul>
            {/* Nav */}
            <ul className="flex-row nav navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li className="nav-item ml-xl-n4">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li className="nav-item ml-xl-n4">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-instagram" />
                </a>
              </li>
              <li className="nav-item ml-xl-n4">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-medium" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* NAVBAR */}
      <nav className="bg-white navbar navbar-expand-lg navbar-light">
        <div className="container">
          {/* Brand */}
          <Link className="navbar-brand" to={PATH.Home}>
            <img style={{ width: "50px" }} src="/img/logo.svg" />
            Shopper.
          </Link>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Collapse */}
          <div className="navbar-collapse" id="navbarCollapse">
            {/* Nav */}
            <ul className="mx-auto navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to={PATH.Home}>
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={PATH.Product}>
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="./shop.html">
                  Laptop
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="./shop.html">
                  Máy tính
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./shop.html">
                  Sản phẩm khuyến mãi
                </a>
              </li>
            </ul>
            {/* Nav */}
            <ul className="flex-row navbar-nav">
              <li className="nav-item">
                <a
                  onClick={(ev) => {
                    ev.preventDefault();
                    setOpenSearchDrawer(true);
                  }}
                  className="nav-link"
                  data-toggle="modal"
                  href="#modalSearch"
                >
                  <i className="fe fe-search" />
                </a>
              </li>
              <li className="nav-item ml-lg-n4">
                <Link className="nav-link" to={PATH.Profile.Wishlist}>
                  <i className="fe fe-heart" />
                </Link>
              </li>
              <li className="nav-item ml-lg-n4">
                <a
                  className="nav-link"
                  data-toggle="modal"
                  href="#modalShoppingCart"
                >
                  <span data-cart-items={2}>
                    <i className="fe fe-shopping-cart" />
                  </span>
                </a>
              </li>
              <li className="nav-item ml-lg-n4">
                <Link className="nav-link" to={PATH.Account}>
                  <i className="fe fe-user" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
