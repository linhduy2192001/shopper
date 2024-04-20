import React, { useState } from "react";
import { Drawer } from "antd";
import { currency, slugify } from "@/utils";
import Search from "antd/es/transfer/search";
import { productService } from "@/services/product.service";
import Skeleton from "../Skeleton";
import { useQuery } from "@/hooks/useQuery";
import { useDebounce } from "@/hooks/useDebounce";
import queryString from "query-string";
import { PATH } from "@/config";
import { Link, generatePath } from "react-router-dom";
import { useCategories, useCategory } from "@/hooks/useCategories";

export default function SearchDrawer({ open, onClose }) {
  const [value, setValue] = useDebounce("");

  const { data: categories } = useCategories();

  const [categoryId, setCategoryId] = useDebounce(0);

  const category = useCategory(parseInt(categoryId));

  const qsSearch = queryString.stringify({
    fields: "real_price,name,price,thumbnail_url",
    limit: 5,
    categories: categoryId || undefined,
    name: value,
  });

  const { data, loading } = useQuery({
    queryFn: ({ signal }) => productService.getProduct(`?${qsSearch}`, signal),
    enabled: !!value,
    queryKey: [qsSearch],
  });

  const qs = queryString.stringify({
    search: value,
  });

  const linkViewAll =
    (category
      ? generatePath(PATH.Category, {
          slug: slugify(category.title),
          id: category.id,
        })
      : PATH.Product) + `?${qs}`;
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);

  return (
    <Drawer
      onClose={onClose}
      width={470}
      open={open}
      headerStyle={{ display: "none" }}
      bodyStyle={{ padding: 0 }}
    >
      <div className="modal-content">
        {/* Close */}
        <button
          onClick={onClose}
          type="button"
          className="close !outline-none"
          data-dismiss="modal"
          aria-label="Close"
        >
          <i className="fe fe-x" aria-hidden="true" />
        </button>
        {/* Header*/}
        <div className="modal-header line-height-fixed font-size-lg">
          <strong className="mx-auto">Search Products</strong>
        </div>
        {/* Body: Form */}
        <div className="modal-body">
          <div className="form-group">
            <label className="sr-only" htmlFor="modalSearchCategories">
              Categories:
            </label>
            <select
              className="custom-select"
              id="modalSearchCategories"
              onChange={(ev) => setCategoryId(ev.target.value)}
            >
              <option value={0} selected>
                All Categories
              </option>
              {categories?.data?.map((e) => (
                <option value={e.id} key={e.id}>
                  {e.title}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group input-group-merge">
            <input
              onChange={(ev) => setValue(ev.target.value)}
              className="form-control"
              type="search"
              placeholder="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-border" type="submit">
                <i className="fe fe-search" />
              </button>
            </div>
          </div>
        </div>
        {/* Body: Results (add `.d-none` to disable it) */}
        <div className="modal-body border-top font-size-sm">
          {/* Heading */}
          <p>Search Results:</p>
          {!loading && !data && (
            <div className="border modal-body">
              {/* Text */}
              <p className="mb-3 text-center font-size-sm">
                Tìm kiếm bất kì sản phẩm nào bạn yêu thích
              </p>
            </div>
          )}
          {/* Items */}
          {loading ? (
            Array.from(Array(5)).map((_, i) => <SearchItemLoading key={i} />)
          ) : data?.data.length === 0 ? (
            <div className="border modal-body">
              {/* Text */}
              <p className="mb-3 text-center font-size-sm">
                Không tìm thấy sản phẩm bạn muốn
              </p>
              <p className="mb-0 text-center font-size-sm">😞</p>
            </div>
          ) : (
            data?.data.map((e) => <SearchItem {...e} key={e.id} />)
          )}

          {/* Button */}
          <Link
            onClick={onClose}
            className="px-0 btn btn-link text-reset"
            to={linkViewAll}
          >
            Tất cả sản phẩm <i className="ml-2 fe fe-arrow-right" />
          </Link>
        </div>
        {/* Body: Empty (remove `.d-none` to disable it) */}
      </div>
    </Drawer>
  );
}

const SearchItem = ({ thumbnail_url, name, real_price, price }) => {
  return (
    <div className="mb-5 row align-items-center position-relative">
      <div className="col-4 col-md-3">
        {/* Image */}
        <img className="img-fluid" src={thumbnail_url} alt={name} />
      </div>
      <div className="col position-static">
        {/* Text */}
        <p className="mb-0 font-weight-bold">
          <a className="stretched-link text-body" href="./product.html">
            {name}
          </a>{" "}
          <br />
        </p>
        <div className="card-product-price">
          {real_price < price ? (
            <>
              <span className="sale text-primary">{currency(real_price)}</span>
              <span className="inline-block ml-1 line-through text-muted">
                {currency(price)}
              </span>
            </>
          ) : (
            <span className="inline-block ml-1 text-muted">
              {currency(real_price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
const SearchItemLoading = () => {
  return (
    <div className="mb-5 row align-items-center position-relative">
      <div className="col-4 col-md-3">
        {/* Image */}
        <Skeleton height={86.81} />
      </div>
      <div className="col position-static">
        {/* Text */}
        <p className="mb-0 font-weight-bold">
          <a className="stretched-link text-body" href="#">
            {" "}
            <Skeleton height={20} />
          </a>{" "}
          <br />
        </p>
        <div className="card-product-price">
          <Skeleton width={150} height={43} />
        </div>
      </div>
    </div>
  );
};
