import React, { ChangeEvent, useEffect, useState } from "react";

import IOrder from "../../types/Order";
import OrderService from "../../service/OrderService";
import ShoeService from "../../service/ShoeService";
import IShoe from "../../types/Shoe";

const CreateOrder = () => {
  const initialState = {
    size: "",
    client: "",
    shoeId: "",
    shippingInfo: {
      Destination: "",
      DeliveryDate: "",
    },
  };

  const [order, setOrder] = useState<IOrder>(initialState);
  const [saved, setSaved] = useState<boolean>(false);
  const [shoes, setShoes] = useState<Array<IShoe>>([]);

  const retrieveShoes = async () => {
    try {
      let shoes = await ShoeService.getAll();
      let shoesData = shoes.data.shoes;
      setShoes(shoesData);
      setOrder({
        ...order,
        shoeId: shoesData[0].ShoeId,
      });
    } catch (e) {
      // USE A LOGGER OR SEND TO LOGGING TOOL LIKE SENTRY
      console.error(e);
    }
  };

  useEffect(() => {
    retrieveShoes();
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "Destination" || name === "DeliveryDate") {
      setOrder({
        ...order,
        shippingInfo: {
          ...order.shippingInfo,
          [name]: value,
        },
      });
    } else {
      setOrder({ ...order, [name]: value });
    }
  };

  const saveOrder = async () => {
    let data = {
      size: order.size,
      client: order.client,
      shoeId: order.shoeId,
      shippingInfo: {
        Destination: order.shippingInfo.Destination,
        DeliveryDate: order.shippingInfo.DeliveryDate,
      },
    };

    try {
      const savedOrder = await OrderService.create(data);
      setSaved(true);
    } catch (e) {
      // USE A LOGGER OR SEND TO LOGGING TOOL LIKE SENTRY
      console.error(e);
    }
  };

  const newOrder = () => {
    setOrder(initialState);
    setSaved(false);
  };

  return (
    <div className="submit-form">
      {saved ? (
        <div>
          <h4>Your order was created successfully!</h4>
          <button className="btn btn-success" onClick={newOrder}>
            Create Another Order
          </button>
        </div>
      ) : (
        <form>
          <div>
            <div className="form-group">
              <label htmlFor="client">Client</label>
              <input
                name="client"
                id="client"
                type="text"
                className="form-control"
                placeholder="Client Name"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="size">Size</label>
              <input
                name="size"
                id="size"
                type="number"
                className="form-control"
                placeholder="Size"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="shippingDestination">
                Shipping Destination Address
              </label>
              <input
                name="Destination"
                id="shippingDestination"
                type="text"
                className="form-control"
                placeholder="Shipping Destination Address"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="shippingDeliveryDate">
                Shipping Delivery Date
              </label>
              <input
                name="DeliveryDate"
                id="shippingDeliveryDate"
                type="date"
                className="form-control"
                placeholder="Shipping Delivery Date"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="shoeId">Select Shoe</label>
              <select
                name="shoeId"
                id="shoeId"
                placeholder="Select Shoe"
                required
                className="form-control"
                onChange={handleInputChange}
              >
                {shoes &&
                  shoes.map((shoe, index) => (
                    <option value={shoe.ShoeId} key={index}>
                      {shoe.Brand}
                    </option>
                  ))}
              </select>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={saveOrder}
            >
              Create Order
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateOrder;
