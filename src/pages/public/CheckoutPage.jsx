import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Truck, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { useAppSelector } from "../../redux/hooks";
import toast from "react-hot-toast";
import axios from "axios";

// frontend er .env e: VITE_API_URL=http://localhost:5000
// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = import.meta.env.VITE_API_URL || "https://ecobazar-backend-1qs6.onrender.com";

// backend er paymentController er sathe EKOI
const TAX_RATE = 0.05;
const FREE_SHIPPING_ABOVE = 50;
const SHIPPING_FEE = 5;

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80";

const formatUSD = (n) =>
  `$${(Number(n) || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

// discountPrice = percentage
const getUnitPrice = (product) => {
  const price = Number(product?.price) || 0;
  const discount = Number(product?.discountPrice) || 0;
  return price - (price * discount) / 100;
};

const getLineTotal = (item) => getUnitPrice(item.product) * (Number(item.quantity) || 0);

const getMainImage = (product) =>
  product?.images?.find((img) => img.isMain)?.url ||
  product?.images?.[0]?.url ||
  FALLBACK_IMG;

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().regex(/^(\+?88)?01[3-9]\d{8}$/, "Valid Bangladeshi phone number required"),
  street: z.string().min(5, "Street address required"),
  city: z.string().min(2, "City required"),
  zipCode: z.string().min(3, "ZIP/Postal code required")
});

export const CheckoutPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?._id || user?.id;

  // FIX: item.Product (capital P) chilo, tai items shob shomoy khali hoto
  const items = cartItems.filter((item) => item.product);

  const itemsPrice = items.reduce((acc, item) => acc + getLineTotal(item), 0);
  const shippingPrice = items.length === 0 || itemsPrice > FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;
  const taxPrice = itemsPrice * TAX_RATE;
  const grandTotal = itemsPrice + shippingPrice + taxPrice;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name || "",
      phone: user?.phone || "",
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      zipCode: user?.address?.zipCode || ""
    }
  });

  const onSubmit = async (formData) => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!userId) {
      toast.error("Please login first");
      return;
    }
    if (!user?.email) {
      toast.error("Email paoa jayni, abar login koro");
      return;
    }

    setIsSubmitting(true);

    try {
      // dam backend nijei DB theke hishab kore, shudhu productId + quantity jay
      const { data } = await axios.post(`${API_URL}/payment`, {
        userId,
        items: items.map((i) => ({ productId: i.product._id, quantity: i.quantity })),
        cus_name: formData.fullName,
        cus_email: user.email,
        cus_add1: formData.street,
        cus_add2: "",
        cus_city: formData.city,
        cus_state: formData.city,
        cus_postcode: formData.zipCode,
        cus_phone: formData.phone
      });

      if (data?.payment_url) {
        window.location.href = data.payment_url;
      } else {
        toast.error(data?.message || "Payment link paoa jayni");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error(err?.response?.data?.message || "Failed to process payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <Breadcrumb items={[{ label: "Cart", path: "/cart" }, { label: "Checkout" }]} />

      <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">
        Checkout & Payment
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft flex flex-col gap-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Truck className="w-5 h-5 text-emerald-600" /> Shipping Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" placeholder="Rahim Uddin" error={errors.fullName?.message} {...register("fullName")} />
              <Input label="Phone Number" placeholder="01712345678" error={errors.phone?.message} {...register("phone")} />
            </div>

            <Input label="Street Address" placeholder="House 12, Road 5, Dhanmondi" error={errors.street?.message} {...register("street")} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="City" placeholder="Dhaka" error={errors.city?.message} {...register("city")} />
              <Input label="ZIP / Postal Code" placeholder="1205" error={errors.zipCode?.message} {...register("zipCode")} />
            </div>

            <p className="text-xs text-slate-500">
              Payment method (bKash, Nagad, Card etc.) aamarPay er secure page e select korben.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft flex flex-col gap-6 h-max">
          <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 pb-4 border-b border-slate-100 dark:border-slate-800">
            Order Review ({items.length})
          </h3>

          {items.length === 0 ? (
            <p className="text-sm text-slate-500">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <img
                    src={getMainImage(item.product)}
                    alt={item.product.title}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {item.product.title}
                    </h5>
                    <span className="text-[11px] text-slate-500">
                      Qty: {item.quantity} × {formatUSD(getUnitPrice(item.product))}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {formatUSD(getLineTotal(item))}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Items Total:</span>
              <span>{formatUSD(itemsPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{shippingPrice === 0 ? "FREE" : formatUSD(shippingPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({TAX_RATE * 100}%):</span>
              <span>{formatUSD(taxPrice)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Total Payable:</span>
              <span className="text-emerald-600 dark:text-emerald-400">{formatUSD(grandTotal)}</span>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            disabled={items.length === 0}
            className="w-full mt-2"
            leftIcon={<CheckCircle2 className="w-5 h-5" />}
          >
            Confirm & Place Order
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit Encrypted Secure Checkout</span>
          </div>
        </div>
      </form>
    </div>
  );
};