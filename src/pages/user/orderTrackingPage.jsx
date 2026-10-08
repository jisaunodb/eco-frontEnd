import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, Circle, Package, Truck, Home, XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import axios from "axios";
import { Breadcrumb } from "../../components/common/Breadcrumb";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = import.meta.env.VITE_API_URL || "https://ecobazar-backend-1qs6.onrender.com";

const formatUSD = (n) =>
  `$${(Number(n) || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

const formatDateTime = (d) =>
  d
    ? new Date(d).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    : "";

const STEPS = [
  { key: "placed", label: "Order Placed", Icon: Package },
  { key: "processing", label: "Processing", Icon: Package },
  { key: "shipped", label: "Shipped", Icon: Truck },
  { key: "out_for_delivery", label: "Out for Delivery", Icon: Truck },
  { key: "delivered", label: "Delivered", Icon: Home }
];

export const OrderTrackingPage = () => {
  const { tranId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/order/track/${tranId}`);
      setOrder(data.order);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Order paoa jayni");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tranId]);

  if (loading && !order) {
    return <div className="min-h-[60vh] flex items-center justify-center text-sm text-slate-500">Loading...</div>;
  }

  if (error || !order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-slate-500">{error || "Order paoa jayni"}</p>
        <Link to="/user/orders" className="text-xs font-bold text-emerald-600 hover:underline">
          Back to My Orders
        </Link>
      </div>
    );
  }

  const isCancelled = order.orderStatus === "cancelled" || order.status === "cancelled";
  const paymentPending = order.status !== "approved";
  const currentIndex = Math.max(0, STEPS.findIndex((s) => s.key === order.orderStatus));

  const timeOf = (key) => order.statusHistory?.find((h) => h.status === key)?.at;

  return (
    <div className="flex flex-col gap-6 pb-12">
      <Breadcrumb
        items={[
          { label: "My Orders", path: "/user/orders" },
          { label: `#${order.tran_id}` }
        ]}
      />

      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            Track Order
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Order <strong className="text-slate-800 dark:text-slate-200">#{order.tran_id}</strong> · Placed on{" "}
            {formatDateTime(order.createdAt)}
          </p>
        </div>
        <button
          onClick={fetchOrder}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft">
          {isCancelled ? (
            <div className="flex items-center gap-3 text-rose-600">
              <XCircle className="w-8 h-8" />
              <div>
                <p className="font-black">Order Cancelled</p>
                <p className="text-xs text-slate-500">Ei order ta cancel hoyeche.</p>
              </div>
            </div>
          ) : paymentPending ? (
            <div className="flex items-center gap-3 text-amber-600">
              <Circle className="w-8 h-8" />
              <div>
                <p className="font-black">
                  {order.status === "rejected" ? "Payment Failed" : "Waiting for Payment"}
                </p>
                <p className="text-xs text-slate-500">
                  Payment confirm hole tracking shuru hobe.
                </p>
              </div>
            </div>
          ) : (
            <ol className="flex flex-col">
              {STEPS.map((step, i) => {
                const done = i <= currentIndex;
                const active = i === currentIndex;
                const time = timeOf(step.key);
                const { Icon } = step;

                return (
                  <li key={step.key} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          done
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400"
                        } ${active ? "ring-4 ring-emerald-100 dark:ring-emerald-900/40" : ""}`}
                      >
                        {done ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      {i < STEPS.length - 1 && (
                        <div
                          className={`w-0.5 flex-1 min-h-[36px] ${
                            i < currentIndex ? "bg-emerald-600" : "bg-slate-200 dark:bg-slate-700"
                          }`}
                        />
                      )}
                    </div>

                    <div className="pb-8">
                      <p
                        className={`text-sm font-bold ${
                          done ? "text-slate-900 dark:text-slate-100" : "text-slate-400"
                        }`}
                      >
                        {step.label}
                      </p>
                      {time && <p className="text-[11px] text-slate-500">{formatDateTime(time)}</p>}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft flex flex-col gap-5 h-max">
          <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
            Order Details
          </h3>

          <div className="flex flex-col gap-3">
            {order.products?.map((p, i) => (
              <div key={i} className="flex justify-between gap-3 text-xs">
                <span className="text-slate-700 dark:text-slate-300 truncate">
                  {p.title} <span className="text-slate-400">× {p.quantity}</span>
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {formatUSD(p.totalprice)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{formatUSD(order.itemsPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{order.shippingPrice === 0 ? "FREE" : formatUSD(order.shippingPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{formatUSD(order.taxPrice)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Total</span>
              <span className="text-emerald-600 dark:text-emerald-400">{formatUSD(order.totalprice)}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <p className="font-bold text-slate-900 dark:text-slate-100 mb-1">Shipping Address</p>
            <p>{order.shippingAddress?.name}</p>
            <p>{order.shippingAddress?.phone}</p>
            <p>
              {order.shippingAddress?.address}, {order.shippingAddress?.city}{" "}
              {order.shippingAddress?.postcode}
            </p>
          </div>
        </div>
      </div>

      <Link
        to="/user/orders"
        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 w-max"
      >
        <ArrowLeft className="w-4 h-4" /> Back to My Orders
      </Link>
    </div>
  );
};