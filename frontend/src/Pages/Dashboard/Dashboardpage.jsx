import React, { useEffect, useState } from "react";
import useTitle from "../../Hooks/useTitle";
import DashboardCard from "./Components/DashboardCard";
import DashboardEmpty from "./Components/DashboardEmpty";
import { getUserOrders } from "../../Services";
import { toast } from "react-toastify";

const Dashboardpage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useTitle("Dashboard");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const orderData = await getUserOrders();
        setOrders(orderData);
      } catch (error) {
        // If no orders found or user not logged in, show empty state
        if (error.message.includes("No orders found")) {
          setOrders([]);
        } else {
          toast.error(error.message || "Failed to load orders");
          setOrders([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <main>
        <section>
          <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
            My Dashboard
          </p>
        </section>
        <section className="text-center my-10">
          <p className="text-lg dark:text-slate-200">Loading your orders...</p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
          My Dashboard
        </p>
      </section>

      <section>
        {orders.length > 0 && (
          <div>
            {orders.map((order) => (
              <DashboardCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </section>

      <section>{orders.length === 0 && <DashboardEmpty />}</section>
    </main>
  );
};

export default Dashboardpage;
