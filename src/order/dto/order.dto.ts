interface CartItem {
  /**
   * 카트의 PK값
   *
   * @type int
   */
  cartId: number;

  /**
   * 카트에 담긴 productId
   *
   * @type int
   */
  productId: number;

  /**
   * 주문 아이템의 수량.
   * 해당 주문에서 구매한 해당 제품의 수량
   *
   * @type uint
   */
  quantity: number;
}

export interface CreateOrderReqDto {
  /**
   * 주문한 상품의 전체가격
   *
   * @type uint
   */
  totalPrice: number;

  /**
   *
   * 해당 주문에서 구매한 해당 productId와 quantity
   *
   */
  carts: CartItem[];

  /**
   * cartId, productId, quantity 값이 포함된 obj형태
   */
}
