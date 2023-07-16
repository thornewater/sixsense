export type CartRaw = {
  cartId: number;
  productQuantity: string;
  productId: number;
  productName: string;
  productPrice: string;
  productDiscountRate: string;
  productImages: string[];
  userId: number;
  userPoint: string;
  discountedPrice: string;
}[];

export type Carts = {
  /**
   * cart의 id
   * @type int
   */
  cartId: number;

  /**
   * 카트에 담김 상품의 id
   *
   * @type int
   */
  productId: number;

  /**
   * 카트에 담김 상품의 수량
   *
   * @type int
   */
  productQuantity: number;

  /**
   * 카트에 담김 상품의 이름
   *
   * @type string
   */
  productName: string;

  /**
   *
   * 상품의 가격
   *
   * @type unit
   */
  productPrice: number;

  /**
   * 상품의 할인가
   *
   * discountRate가 0인경우 productPrice와 동일한 가격
   *
   * @type unit
   */
  discountedPrice: number;

  /**
   * 상품의 할인율
   */
  discountRate: number;

  /**
   * 토큰에 담긴 유저의 iD
   *
   */
  userId: number;

  /**
   * user가 가지고있는 point
   *
   * 제품을 구매할때 사용
   *
   * @default 100000
   */
  userPoint: number;

  /**
   * 상품의 대표이미지. 호버이미지
   *
   * 배열에서 홀수인 값이 대표이미지 표시
   */
  productImages: string[];

  /**
   * get carts 의 Response값
   */
}[];
