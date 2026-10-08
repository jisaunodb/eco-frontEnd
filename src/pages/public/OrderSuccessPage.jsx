import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, XCircle, Clock, ShoppingBag, ArrowRight } from "lucide-react";
import axios from "axios";
import { useAppDispatch } from "../../redux/hooks";
import { clearCart } from "../../redux/slices/cartSlice";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = import.meta.env.VITE_API_URL || "https://ecobazar-backend-1qs6.onrender.com";

const STATUS_UI = {
  approved: { Icon: CheckCircle2, label: "Order Confirmed!", title: "Thank You For Your Purchase", color: "emerald", paid: "PAID" },
  rejected: { Icon: XCircle, label: "Payment Failed", title: "Your Payment Was Not Completed", color: "rose", paid: "FAILED" },
  pending: { Icon: Clock, label: "Processing", title: "Waiting For Payment Confirmation", color: "amber", paid: "PENDING" }
};

export const OrderSuccessPage = () => {
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const tranId = params.get("tran_id");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tranId) {
      setLoading(false);
      return;
    }
    axios
      .get(`${API_URL}/payment/order/${tranId}`)
      .then(({ data }) => {
        setOrder(data);
        if (data.status === "approved") dispatch(clearCart());
      })
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [tranId, dispatch]);

  if (loading) {
    return <div className="min-h-[75vh] flex items-center justify-center text-sm text-slate-500">Loading...</div>;
  }

  if (!order) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-slate-500">Order paoa jayni.</p>
        <Link to="/shop" className="text-xs font-bold text-emerald-600 hover:underline">Back to Store</Link>
      </div>
    );
  }

  const ui = STATUS_UI[order.status] || STATUS_UI.pending;
  const { Icon } = ui;
  const textColor = { emerald: "text-emerald-600", rose: "text-rose-600", amber: "text-amber-600" }[ui.color];

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-soft flex flex-col items-center text-center gap-6">
        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 ${textColor}`}>
          <Icon className="w-10 h-10" />
        </div>

        <div>
          <span className={`text-xs font-bold uppercase tracking-widest ${textColor}`}>{ui.label}</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">{ui.title}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Order <strong className="text-slate-800 dark:text-slate-200">#{order.tran_id}</strong>
          </p>
        </div>

        <div className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Payment Status:</span>
            <span className={`font-bold ${textColor}`}>{ui.paid}</span>
          </div>
          <div className="flex justify-between">
            <span>Total:</span>
            <span className="font-bold">${Number(order.totalprice).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Address:</span>
            <span className="font-semibold text-right">
              {order.shippingAddress?.address}, {order.shippingAddress?.city}
            </span>
          </div>
          {order.status === "approved" && (
            <div className="flex justify-between">
              <span>Estimated Delivery:</span>
              <span className="font-bold">24 - 48 Hours</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            to={order.status === "rejected" ? "/cart" : "/user/orders"}
            className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{order.status === "rejected" ? "Try Again" : "Track Order"}</span>
          </Link>
          <Link
            to="/shop"
            className="flex-1 py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
          >
            <span>Back to Store</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};