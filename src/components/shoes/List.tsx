import React, { useEffect } from "react";
import { useState } from "react";
import ShoeService from "../../service/ShoeService";
import "bootstrap/dist/css/bootstrap.min.css";
import IShoe from "../../types/Shoe";

const ListShoes = () => {
  const [shoes, setShoes] = useState<Array<IShoe>>([]);
  const [filteredShoes, setFilteredShoes] = useState<Array<IShoe>>([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brands, setBrands] = useState<Array<string>>([]);

  const retrieveShoes = async () => {
    try {
      let shoes = await ShoeService.getAll();
      let shoesData = shoes.data.shoes;
      setShoes(shoesData);
      setFilteredShoes([...shoesData]);

      const brandMap = {};
      shoesData.map((shoe) => (brandMap[shoe.Brand] += 1));

      setBrands(Object.keys(brandMap));
    } catch (e) {
      // USE A LOGGER OR SEND TO LOGGING TOOL LIKE SENTRY
      console.error(e);
    }
  };

  useEffect(() => {
    retrieveShoes();
  }, []);

  const filterByBrand = async () => {
    console.log(selectedBrand);
    if (selectedBrand === "None") {
      setFilteredShoes(shoes);
    } else {
      try {
        let shoes = await ShoeService.filterByBrand(selectedBrand);
        let shoesData = shoes.data.shoes;
        setFilteredShoes(shoesData);
      } catch (e) {
        // USE A LOGGER OR SEND TO LOGGING TOOL LIKE SENTRY
        console.error(e);
      }
    }
  };

  const handleBrandSelectionChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  return (
    <>
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <select
              className="form-control"
              placeholder="Search by title"
              onChange={handleBrandSelectionChange}
            >
              <option value="None">No Brand Selected</option>
              {brands &&
                brands.map((brand, index) => (
                  <option value={brand} key={index}>
                    {brand}
                  </option>
                ))}
            </select>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={filterByBrand}
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="list row">
        <div className="col-md-8">
          <h4>Shoes List</h4>

          <ul className="list-group">
            {filteredShoes &&
              filteredShoes.map((shoe, index) => (
                <li className="list-group-item" key={index}>
                  <strong>{shoe.Brand}</strong>
                  <br />
                  Available Sizes:
                  {shoe.AvailableSizes.map((size) => ` ${size}`)}
                  <br />
                  Price: ${shoe.Price}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ListShoes;
