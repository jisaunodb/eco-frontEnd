import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Truck, CreditCard, MapPin } from "lucide-react";
import axios from "axios";
import { Badge } from "../../components/common/Badge";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const formatUSD = (n) =>
  `$${(Number(n) || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    : "";

const STATUS_LABEL = {
  placed: "Placed",
  processing: "Processing",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled"
};

export const UserOrderDetailsPage = () => {
  // route: /user/orders/:id  (id = tran_id)
  const { id: tranId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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
    fetchOrder();
  }, [tranId]);

  if (loading) {
    return (
      <div className="py-12 flex justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="py-12 flex flex-col items-center gap-4">
        <p className="text-sm text-slate-500">{error || "Order paoa jayni"}</p>
        <Link to="/user/orders" className="text-xs font-bold text-emerald-600 hover:underline">
          Back to My Orders
        </Link>
      </div>
    );
  }

  const isPaid = order.status === "approved";
  const deliveredAt = order.statusHistory?.find((h) => h.status === "delivered")?.at;
  const statusText =
    order.status === "rejected"
      ? "PAYMENT FAILED"
      : !isPaid
      ? "PAYMENT PENDING"
      : (STATUS_LABEL[order.orderStatus] || order.orderStatus || "").toUpperCase();
  const badgeVariant =
    order.orderStatus === "delivered"
      ? "success"
      : order.orderStatus === "cancelled" || order.status === "rejected"
      ? "danger"
      : "warning";

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/user/orders"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
              Order #{order.tran_id}
            </h2>
            <p className="text-xs text-slate-500">Placed on {formatDate(order.createdAt)}</p>
          </div>
        </div>

        <Badge variant={badgeVariant}>{statusText}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col gap-2 text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-600" /> Shipping Address
          </span>
          <p className="text-slate-600 dark:text-slate-300">{order.shippingAddress?.name}</p>
          <p className="text-slate-500">
            {order.shippingAddress?.address}, {order.shippingAddress?.city}
          </p>
          {order.shippingAddress?.postcode && (
            <p className="text-slate-500">Postcode: {order.shippingAddress.postcode}</p>
          )}
          <p className="text-slate-500">Phone: {order.shippingAddress?.phone}</p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col gap-2 text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-emerald-600" /> Payment & Status
          </span>
          <p className="text-slate-600 dark:text-slate-300 uppercase">
            Method: {order.paymentMethod || "aamarPay"}
          </p>
          <p className={`font-bold ${isPaid ? "text-emerald-600" : "text-amber-600"}`}>
            Is Paid: {isPaid ? "YES" : order.status === "rejected" ? "FAILED" : "NO"}
          </p>
          <p className="text-slate-500">
            Delivered At: {deliveredAt ? formatDate(deliveredAt) : "In Transit"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-bold uppercase text-slate-500">Ordered Items</h4>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {order.products?.map((p, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                {(p.image || p.photo) && (
                  <img
                    src={p.image || p.photo}
                    alt={p.title}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                  />
                )}
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-slate-100">{p.title}</h5>
                  <span className="text-[11px] text-slate-400">Qty: {p.quantity}</span>
                </div>
              </div>

              <span className="font-black text-emerald-600 dark:text-emerald-400">
                {formatUSD(p.totalprice)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
        <div className="flex justify-between">
          <span>Items Price:</span>
          <span>{formatUSD(order.itemsPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>{order.shippingPrice === 0 ? "FREE" : formatUSD(order.shippingPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>{formatUSD(order.taxPrice)}</span>
        </div>
        <div className="flex justify-between text-base font-black text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-700">
          <span>Total {isPaid ? "Paid" : ""}:</span>
          <span className="text-emerald-600 dark:text-emerald-400">{formatUSD(order.totalprice)}</span>
        </div>
      </div>

      <Link
        to={`/user/orders/track/${order.tran_id}`}
        className="w-max inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
      >
        <Truck className="w-4 h-4" /> Track This Order
      </Link>
    </div>
  );
};