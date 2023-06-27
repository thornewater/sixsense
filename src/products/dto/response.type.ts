export type Products = {
  /**
   * 상품의Id
   */
  productId: number;
  /**
   * 상품의 이름
   */
  productName: string;
  /**
   * 상품의 상세설명
   */
  productDescription: string;
  /**
   * 상품의 가격
   */
  productPrice: number;
  /**
   * 상품의 할인가
   *
   * discountRate가 0인경우 productPrice와 동일한 가격
   */
  discountPrice: number;
  /**
   * 상품의 할인율
   */
  discountRate: number;
  /**
   * 상품의 categoryId
   */
  categoryId: number;
  /**
   * 상품의 category 이름
   */
  categoryName: string;
  /**
   * 상품의 인센스 종류
   *
   * 세트상품이나 홀더등 인세스제품이 아닌경우 null
   */
  incenseName: string | undefined;
  /**
   * 상품의 상세정보에 들어가는 이미지
   */
  productDetailImage: string | null;
  /**
   * 상품의 대표이미지 및 호버이미지
   */
  productImages: string[];
  /**
   *  get /products의 response 데이터 타입
   */
}[];

/**
 * findProductOne함수의 response 타입
 */
export type Product = {
  /**
   * 상품의Id
   */
  productId: number;
  /**
   * 상품의 이름
   */
  productName: string;
  /**
   * 상품의 가격
   */
  productPrice: number;
  /**
   * 상품의 상세설명
   */
  productDescription: string;
  /**
   * 상품의 재고수량
   */
  productStock: number;
  /**
   * 상품의 상세정보에 들어가는 이미지
   */
  productDetailImage: string | null;
  /**
   * 상품의 대표이미지 및 호버이미지
   */
  productImages: string[];
  /**
   * 상품의 할인율
   */
  discountRate: number;
  /**
   * 상품의 할인가
   *
   * discountRate가 0인경우 productPrice와 동일한 가격
   */
  discountedPrice: number;

  /**
   * get /products/:id의 response 데이터 타입
   */
};

export type productRaw = {
  productId: number;
  productName: string;
  productPrice: string;
  productDescription: string;
  productStock: number;
  productDetailImage: string | null;
  productImages: string[];
  discountRate: string;
  discountedPrice: string;
};
