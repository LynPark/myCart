import "./ProductsSidebar.css";
import LinkWithIcon from "../Navbar/LinkWithIcon";
import useData from "../../Hook/useData";
import { NavLink } from "react-router-dom";
import config from "../../config.json";

const ProductsSidebar = () => {
  const { data: categories, error } = useData("category");
  return (
    <aside className="products_sidebar">
      <NavLink to="/products">
        <h2>Category</h2>
      </NavLink>
      <div className="category_links">
        {error && <em className="form_error">{error}</em>}
        {categories.map((category) => (
          <LinkWithIcon
            key={category._id}
            title={category.name}
            link={`/products?category=${category.name}`}
            emoji={`${config.backendURL}/category/${category.image}`}
            sidebar={true}
          />
        ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
