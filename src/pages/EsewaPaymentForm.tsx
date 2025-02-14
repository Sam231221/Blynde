import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { Order } from "../types";

const SECRET_KEY = "8gBm/:&EnhH.1/q";

export const EsewaPaymentForm = ({ order }: { order: Order }) => {
  const transaction_uuid = useMemo(() => uuidv4(), []);

  const signature = useMemo(() => {
    const hashString = `total_amount=${order.totalPrice},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`;
    const hash = CryptoJS.HmacSHA256(hashString, SECRET_KEY);
    return CryptoJS.enc.Base64.stringify(hash);
  }, [order.totalPrice, transaction_uuid]);

  return (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
    >
      <input
        type="hidden"
        name="amount"
        value={order.itemsPrice !== null ? order.itemsPrice : "0"}
        required
      />
      <input
        type="hidden"
        name="tax_amount"
        value={order.taxPrice !== null ? order.taxPrice : "0"}
        required
      />
      <input
        type="hidden"
        name="total_amount"
        value={order.totalPrice}
        required
      />
      <input
        type="hidden"
        name="transaction_uuid"
        value={transaction_uuid}
        required
      />
      <input type="hidden" name="product_code" value="EPAYTEST" required />
      <input type="hidden" name="product_service_charge" value="0" required />
      <input
        type="hidden"
        name="product_delivery_charge"
        value={order.shippingPrice !== null ? order.shippingPrice : "0"}
        required
      />
      <input
        type="hidden"
        name="success_url"
        value={`http://localhost:5173/payment/success/?order_id=${order._id}&`}
        required
      />
      <input
        type="hidden"
        name="failure_url"
        value={`http://localhost:5173/payment/error/?order_id=${order._id}&`}
        required
      />
      <input
        type="hidden"
        name="signed_field_names"
        value="total_amount,transaction_uuid,product_code"
        required
      />
      <input type="hidden" name="signature" value={signature} required />

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 transition-colors duration-200 justify-center ease-out mt-2 w-full flex items-center rounded-md font-medium px-3 py-1 text-white"
      >
        <img src="/esewa.png" className="w-10 h-10 rounded-full" alt="Esewa" />
        <span className="ml-2">Pay With Esewa</span>
      </button>
    </form>
  );
};
