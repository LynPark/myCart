import "./ProductsList.css";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import useData from "../../Hook/useData";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagination";
import { useEffect, useState } from "react";

const ProductsList = () => {
  const [search, setSearch] = useSearchParams(); // ? 뒤의 쿼리스트링 가져옴
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const category = search.get("category"); //쿼리스트링에서 category=값을 가져옴
  const page = search.get("page");
  const searchQuery = search.get("search"); //검색어 가져옴
  /*서버에서 가져오는 데이터에는 제품 데이터 및 페이지 등 다른 데이터도 있음
  쿼리스트링 넘어온 category 값을 useData에 두번째 파라미터로 보내고
  파라미터가 더 많아질 것을 대비해서 객체로 넘기고
  세번째 파라미터로 [category]를 넘기자*/
  const { data, error, isLoading } = useData(
    "products",
    { params: { search: searchQuery, category, page } },
    [searchQuery, category, page]
  );
  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search]);
    setSearch({ ...currentParams, page: page });
  };
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products];

      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else {
        setSortedProducts(products);
      }
    }
  }, [sortBy, data]);

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products List</h2>
        <select
          name="sort"
          id=""
          className="products_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">SortBy</option>
          <option value="price desc">Price: High to Low</option>
          <option value="price asc">Price: Low to High</option>
          <option value="rate desc">Rate: High to Low</option>
          <option value="rate asc">Rate: Low to High</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
        {data.products &&
          sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      {/* 페이지네이션 넣기 */}
      {data && (
        <Pagination
          total={data.totalProducts}
          perPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )}
    </section>
  );
};

export default ProductsList;
