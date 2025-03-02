import { Product } from "..";

export interface ProductState {
  allProducts: Product[];
  topProducts: Product[];
  recentProducts: Product[];
  productDetail: Product | null;
  loading: boolean;
  error: string | null;
}
