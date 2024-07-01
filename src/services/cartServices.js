import apiClient from "../utils/api-client";

export function addToCartAPI(id, quantity) {
  //제품 id와 수량을 입력하여 장바구니 추가
  return apiClient.post(`/cart/${id}`, { quantity });
}

//카트 데이터를 가져옴
export async function getCartAPI() {
  return await apiClient.get("/cart");
}

//상품(id)을 삭제
export function removeFromCartAPI(id) {
  return apiClient.patch(`/cart/remove/${id}`);
}

//장바구니의 상품 수량 + 1
export function increaseProductAPI(id) {
  return apiClient.patch(`/cart/increase/${id}`);
}

//장바구니의 상품 수량 - 1
export function decreaseProductAPI(id) {
  return apiClient.patch(`/cart/decrease/${id}`);
}