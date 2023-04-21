export default interface IOrder {
  id?: string | null,
  size: string,
  client: string,
  shoeId: string,
  shippingInfo: {
    Destination: string,
    DeliveryDate: string,
  },
}