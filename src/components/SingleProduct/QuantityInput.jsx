import "./QuantityInput.css";
import CartPage from "../Cart/CartPage";

const QuantityInput = ({
  quantity,
  setQuantity,
  stock,
  CartPage,
  productId,
}) => {
  return (
    <div className="qinput">
      <button
        className="quantity_input_button"
        onClick={() => {
          CartPage
            ? setQuantity("decrease", productId)
            : setQuantity((prev) => prev - 1);
        }}
        disabled={quantity <= 1}
      >
        {" "}
        -{" "}
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button
        className="quantity_input_button"
        onClick={() => {
          CartPage
            ? setQuantity("increase", productId)
            : setQuantity((prev) => prev + 1);
        }}
        disabled={quantity >= stock}
      >
        {" "}
        +{" "}
      </button>
    </div>
  );
};

export default QuantityInput;
