import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save,Upload, Image as ImageIcon, X, Star, Plus, Link as LinkIcon  } from "lucide-react";
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


      // ১. পিকচার লিস্ট স্টেট
      const [imagesList, setImagesList] = useState([
      {
        id: "img-1",
        url: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
        isMain: true // প্রধান ছবি
      }
      ]);
      const [customUrl, setCustomUrl] = useState("");

      // ২. কম্পিউটার থেকে ছবি ব্রাউজ/ড্রাগ-এন্ড-ড্রপ করে আপলোড করার ফাংশন
      const handleFileUpload = (e) => {
      const files = Array.from(e.target.files || []);
      files.forEach((file) => {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image file.`);
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result; // Base64 Preview image
          if (dataUrl) {
            setImagesList((prev) => [
              ...prev,
              {
                id: `img-${Date.now()}-${Math.random()}`,
                url: dataUrl,
                isMain: prev.length === 0
              }
            ]);
            toast.success("Picture added!");
          }
        };
        reader.readAsDataURL(file);
      });
      e.target.value = "";
      };

      // ৩. মেইন ছবি সিলেক্ট করার ফাংশন (Star Icon Click)
      const handleSetMain = (id) => {
      setImagesList((prev) =>
        prev.map((img) => ({
          ...img,
          isMain: img.id === id
        }))
      );
      };

      // ৪. ছবি ডিলিট করার ফাংশন
      const handleRemoveImage = (id) => {
      setImagesList((prev) => {
        const filtered = prev.filter((img) => img.id !== id);
        if (filtered.length > 0 && !filtered.some((img) => img.isMain)) {
          filtered[0].isMain = true;
        }
        return filtered;
      });
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

        <div className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200">
      <label className="text-xs font-bold uppercase text-white flex items-center gap-2">
      <ImageIcon className="w-4 h-4 text-emerald-600" />
      Product Pictures ({imagesList.length})
      </label>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
      {/* File Upload Box */}
      <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl cursor-pointer bg-white transition-all">
        <Upload className="w-7 h-7 text-slate-400 mb-2" />
        <span className="text-xs font-bold text-slate-700">Click or Drag & Drop Pictures</span>
        <span className="text-[11px] text-slate-400">JPG, PNG, WEBP</span>
        <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
      </label>
      </div>

      {/* Picture Grid Preview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
      {imagesList.map((img) => (
        <div key={img.id} className={`relative rounded-2xl overflow-hidden border-2 aspect-square ${img.isMain ? "border-emerald-500" : "border-slate-200"}`}>
          <img src={img.url} alt="Preview" className="w-full h-full object-cover" />
          {img.isMain && <span className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg">Main</span>}

          <div className="absolute inset-0 bg-slate-900/60 opacity-0 hover:opacity-100 flex items-center justify-center gap-2">
            {!img.isMain && (
              <button type="button" onClick={() => handleSetMain(img.id)} className="p-2 bg-emerald-600 text-white rounded-xl">
                <Star className="w-3.5 h-3.5" />
              </button>
            )}
            <button type="button" onClick={() => handleRemoveImage(img.id)} className="p-2 bg-rose-600 text-white rounded-xl">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
      </div>
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

