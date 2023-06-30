import { Carts } from 'src/common/entity/carts.entity';
import typia from 'typia';

type RenameKey<T, OldKey extends keyof T, NewKey extends string> = Pick<
  T,
  Exclude<keyof T, OldKey>
> & { [Key in NewKey]: T[OldKey] };

export type NewCartDto = Pick<Carts, 'quantity' | 'productId'>;

export type UpdatedCartDto = RenameKey<
  Pick<Carts, 'id' | 'quantity'>,
  'id',
  'cartId'
>;
export type CartDeleteDto = CartIdListDto;

export const validateNewCartDto = typia.createAssertEquals<NewCartDto>();

export interface CartIdListDto {
  cartIdList: string[];
}
