import { useEffect, useState } from "react";
import { Eye, RefreshCw } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Badge } from "../../components/common/Badge";
import { Modal } from "../../components/common/Modal";

const API_URL = import.meta.env.VITE_API_URL || "https://ecobazar-backend-1qs6.onrender.com";

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

const STATUS_OPTIONS = [
  { value: "placed", label: "Placed" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" }
];

const statusLabel = (v) => STATUS_OPTIONS.find((s) => s.value === v)?.label || v;

const paymentBadge = (status) => {
  switch (status) {
    case "approved":
      return <Badge variant="success">Paid</Badge>;
    case "rejected":
      return <Badge variant="danger">Failed</Badge>;
    case "cancelled":
      return <Badge variant="danger">Cancelled</Badge>;
    default:
      return <Badge variant="warning">Pending</Badge>;
  }
};

export const AdminOrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/admin/orders`);
      setOrders(data.orders || []);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Orders load kora jayni");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (order, newStatus) => {
    if (newStatus === order.orderStatus) return;

    try {
      setUpdatingId(order._id);
      const { data } = await axios.patch(`${API_URL}/admin/order/${order._id}/status`, {
        orderStatus: newStatus
      });

      // backend populate kore na, tai user info ager ta-i rakhi
      setOrders((prev) =>
        prev.map((o) =>
          o._id === order._id
            ? { ...o, orderStatus: data.order.orderStatus, statusHistory: data.order.statusHistory }
            : o
        )
      );
      setSelectedOrder((prev) =>
        prev && prev._id === order._id
          ? { ...prev, orderStatus: data.order.orderStatus, statusHistory: data.order.statusHistory }
          : prev
      );
      toast.success(`Order #${order.tran_id} → ${statusLabel(newStatus)}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Status update hoyni");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === "all") return true;
    return o.orderStatus === filterStatus;
  });

  // payment hoy nai ba delivered/cancelled hole bodlano jabe na (backend o eta block kore)
  const isLocked = (o) =>
    o.status !== "approved" || ["delivered", "cancelled"].includes(o.orderStatus);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Order Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track, update delivery status, and review customer order history
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchOrders}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">All Orders ({orders.length})</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-soft">
        {loading && orders.length === 0 ? (
          <div className="py-12 flex justify-center">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="py-12 text-center text-xs text-rose-600">{error}</div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Delivery Status</th>
                  <th className="p-4 text-center">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4 font-black text-slate-900 dark:text-slate-100">
                      #{order.tran_id}
                    </td>

                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {order.user?.name || order.shippingAddress?.name}
                        </span>
                        <span className="text-[10px] text-slate-400">{order.user?.email}</span>
                      </div>
                    </td>

                    <td className="p-4 text-slate-500">{formatDate(order.createdAt)}</td>

                    <td className="p-4 font-black text-emerald-600 dark:text-emerald-400">
                      {formatUSD(order.totalprice)}
                    </td>

                    <td className="p-4">{paymentBadge(order.status)}</td>

                    <td className="p-4">
                      <select
                        value={order.orderStatus || "placed"}
                        disabled={isLocked(order) || updatingId === order._id}
                        onChange={(e) => handleStatusChange(order, e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Order Details #${selectedOrder?.tran_id}`}
      >
        {selectedOrder && (
          <div className="flex flex-col gap-4 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl flex justify-between items-center gap-3">
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {selectedOrder.user?.name || selectedOrder.shippingAddress?.name}
                </span>
                <p className="text-[10px] text-slate-400">{selectedOrder.user?.email}</p>
              </div>
              <div className="flex items-center gap-2">
                {paymentBadge(selectedOrder.status)}
                <Badge variant={selectedOrder.orderStatus === "delivered" ? "success" : "warning"}>
                  {statusLabel(selectedOrder.orderStatus || "placed").toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl flex flex-col gap-0.5">
              <span className="font-bold text-slate-900 dark:text-slate-100">Shipping Address</span>
              <span>{selectedOrder.shippingAddress?.name}</span>
              <span>{selectedOrder.shippingAddress?.phone}</span>
              <span>
                {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}{" "}
                {selectedOrder.shippingAddress?.postcode}
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-48 overflow-y-auto">
              {selectedOrder.products?.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {item.image && (
                      <img src={item.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                    )}
                    <span>
                      {item.title} (x{item.quantity})
                    </span>
                  </div>
                  <span className="font-bold">{formatUSD(item.totalprice)}</span>
                </div>
              ))}
            </div>

            {selectedOrder.statusHistory?.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-slate-900 dark:text-slate-100">Status History</span>
                {selectedOrder.statusHistory.map((h, i) => (
                  <div key={i} className="flex justify-between text-[11px]">
                    <span>{statusLabel(h.status)}</span>
                    <span className="text-slate-400">{formatDate(h.at)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-sm font-black text-slate-900 dark:text-slate-100">
              <span>Grand Total:</span>
              <span className="text-emerald-600">{formatUSD(selectedOrder.totalprice)}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};