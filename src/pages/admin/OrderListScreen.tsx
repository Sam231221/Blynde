import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
import PageContainer from "../../components/PageContainer";
import { fetchOrders, fetchOrderById, createOrder } from "../../lib/orderApi";
import {
  addOrder,
  selectOrders,
  setOrders,
} from "../../redux/reducers/OrderSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../hooks/useAuth";

function OrderListScreen() {
  const dispatch = useDispatch();
  const userInfo = useUser();
  const redirect = useNavigate();
  const queryClient = useQueryClient();
  const orders = useSelector(selectOrders);

  // Fetch orders and sync with Redux
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  // Create an order
  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: (newOrder) => {
      dispatch(addOrder(newOrder)); // Sync with Redux
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (data) {
        dispatch(setOrders(data));
      }
    } else {
      redirect("/login");
    }
  }, [dispatch, redirect, userInfo, data]);
  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error fetching orders</p>;
  return (
    <PageContainer>
      <div className="container mx-auto py-2 overflow-auto mt-10">
        <h1>Orders</h1>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>Total</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <>
                      <i className="fas fa-check" style={{ color: "red" }}></i>
                      Not Paid Yet
                    </>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <>
                      <i className="fas fa-check" style={{ color: "red" }}></i>
                      Not Delivered Yet.
                    </>
                  )}
                </td>

                <td>
                  <Link to={`/order/${order._id}`}>
                    <button>Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}

export default OrderListScreen;
