import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save } from "lucide-react";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createNewProduct } from "../../redux/slices/productSlice";
import toast from "react-hot-toast";

export const AdminCreateProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector((state) => state.products.categories);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      sku: `SKU-${Math.floor(100000 + Math.random() * 900000)}`,
      Category: "Fruits & Vegetables",
      subCategory: "",
      brand: "EcoBazar Organic",
      price: 15,
      discountPrice: 10, // percentage
      stock: 50,
      status: "active",
      shortDescription: "",
      description: "",
      AdditionalInfo: "",
      tagsString: "Organic, Fresh",
      imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const tags = data.tagsString
      ? data.tagsString.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const mainImageUrl = data.imageUrl || "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80";

    const payload = {
      title: data.title,
      name: data.title,
      sku: data.sku,
      Category: data.Category,
      category: data.Category,
      subCategory: data.subCategory,
      brand: data.brand,
      price: Number(data.price),
      discountPrice: Number(data.discountPrice || 0),
      finalPrice: Number(data.price) - (Number(data.price) * Number(data.discountPrice || 0)) / 100,
      stock: Number(data.stock),
      status: data.status,
      shortDescription: data.shortDescription,
      description: data.description,
      AdditionalInfo: data.AdditionalInfo,
      tag: tags,
      tags,
      images: [
        { url: mainImageUrl, isMain: true },
        mainImageUrl
      ],
      ratings: 4.8,
      numOfReviews: 0,
      isFeatured: true,
    };

    const result = await dispatch(createNewProduct(payload));
    setIsSubmitting(false);

    if (createNewProduct.fulfilled.match(result)) {
      toast.success("Product created successfully!");
      navigate("/admin/products");
    } else {
      toast.error("Failed to create product.");
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/products"
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Create New Product
          </h1>
          <p className="text-xs text-slate-500">
            Publish a new item using Mongoose schema fields
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Title *" placeholder="e.g. Organic Honeycrisp Apples" {...register("title", { required: true })} />
          <Input label="SKU *" placeholder="e.g. SKU-APP-001" {...register("sku", { required: true })} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
              Category *
            </label>
            <select
              {...register("Category")}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500 font-semibold text-slate-800 dark:text-slate-200"
            >
              {categories.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <Input label="Sub Category" placeholder="e.g. Fresh Produce" {...register("subCategory")} />
          <Input label="Brand" placeholder="e.g. EcoBazar Organics" {...register("brand")} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Price ($) *" type="number" step="0.01" {...register("price", { required: true })} />
          <Input label="Discount Price (% 0-100)" type="number" step="1" min="0" max="100" {...register("discountPrice")} />
          <Input label="Stock *" type="number" {...register("stock", { required: true })} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500 font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <Input label="Tags (Comma separated)" placeholder="e.g. Organic, Fresh, Vegan" {...register("tagsString")} />
        </div>

        <Input label="Main Image URL" placeholder="https://images.unsplash.com/..." {...register("imageUrl")} />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
            Short Description
          </label>
          <input
            {...register("shortDescription")}
            placeholder="Brief 1-line product highlight..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Detailed description of the product..."
            {...register("description")}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
            Additional Info
          </label>
          <textarea
            rows={2}
            placeholder="Storage instructions, origin, nutritional facts..."
            {...register("AdditionalInfo")}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          isLoading={isSubmitting}
          className="w-max mt-2"
          leftIcon={<Save className="w-4 h-4" />}
        >
          Publish Product
        </Button>
      </form>
    </div>
  );
};

