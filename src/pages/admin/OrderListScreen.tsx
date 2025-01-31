import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
import { listOrders } from "../../redux/actions/orderActions";
import PageContainer from "../../components/PageContainer";

function OrderListScreen() {
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      redirect("/login");
    }
  }, [dispatch, redirect, userInfo]);

  return (
    <PageContainer>
      <div className="container mx-auto py-2 overflow-auto mt-10">
        <h1>Orders</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
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
                        <i
                          className="fas fa-check"
                          style={{ color: "red" }}
                        ></i>
                        Not Paid Yet
                      </>
                    )}
                  </td>

                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <>
                        <i
                          className="fas fa-check"
                          style={{ color: "red" }}
                        ></i>
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
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default OrderListScreen;
