import typia from 'typia';

export enum SortList {
  priceInASC = 'ASC',
  priceInDESC = 'DESC',
}

typia.customValidators.insert('sortList')('string')(() => {
  const enumKeys: string[] = Object.keys(SortList);
  return (value) => {
    return enumKeys.includes(value);
  };
});

export const checkProductFilterDto =
  typia.createAssertEquals<ProductFilterDto>();

export interface ProductFilterDto {
  /**
   * 상품의 categoryId에 따라 상품 필터링시 필요
   *
   * @type string
   */
  categoryId?: string;

  /**
   * 최저가 및 최고가 순으로 정렬시 필요
   *
   * priceInASC: 상품의 높은 가격순정렬
   *
   * priceInDESC: 상품의 낮은 가격순정렬
   *
   * 클라이언트에서 값을 안보내주는경우 ASC순으로 정렬
   *
   * @sortList
   */
  sort?: string;

  /**
   * 페이지네이션시 필요
   *
   *
   * @type int
   */
  limit?: number;

  /**
   *  페이지네이션시 필요
   *
   * @type int
   */
  offset?: number;
}
