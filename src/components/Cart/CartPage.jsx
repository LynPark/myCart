import "./CartPage.css";
import remove from "../../assets/remove.png";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { checkoutAPI } from "../../services/orderServices";
import config from "../../config.json";

const CartPage = () => {
  //배송비 뺀 합계
  const [subTotal, setSubTotal] = useState(0);
  const user = useContext(UserContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);

  const checkout = () => {
    const oldCart = [...cart];
    setCart([]); //카트 비우기
    checkoutAPI()
      .then(() => {
        toast.success("Order Succeed!");
      })
      .catch(() => {
        toast.error("Error");
        setCart(oldCart);
      });
  };

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setSubTotal(total); //제품 합계 가격을 계산해서 카트가 바뀔 때마다 저장
  }, [cart]);

  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`${config.backendURL}/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">{user?.name}</p>
          <p className="user_email">{user?.email}</p>
        </div>
      </div>

      {/* 테이블 컴포넌트는 테이블의 제목 부분을 배열로 입력하면 생성됨! */}
      <Table headings={["Product", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>￦ {product.price.toLocaleString("ko-KR")}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  CartPage={true}
                  productId={product._id}
                />
              </td>
              <td>￦ {(quantity * product.price).toLocaleString("ko-KR")}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* 단순 계산 테이블 추가 */}
      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Item</td>
            <td>￦ {subTotal.toLocaleString("ko-KR")}</td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td>￦ 3,000</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Order Total</td>
            <td>￦ {(subTotal + 3000).toLocaleString("ko-KR")}</td>
          </tr>
        </tbody>
      </table>

      <button className="search_button checkout_button" onClick={checkout}>
        Purchase
      </button>
    </section>
  );
};

export default CartPage;
