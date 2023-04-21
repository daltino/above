import http from "../http-util";
import IShoe from "../types/Shoe";

const getAll = () => {
  return http.get<{ shoes: Array<IShoe> }>("/shoes");
};

const filterByBrand = (brand: string) => {
  return http.get<{ shoes: Array<IShoe> }>(`/shoes?brand=${brand}`);
};

const ShoeService = {
  filterByBrand,
  getAll,
};

export default ShoeService;
