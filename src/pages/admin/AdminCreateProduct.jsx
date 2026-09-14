

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { ArrowLeft, Save, Upload, Image as ImageIcon, X, Star } from "lucide-react";
// import { Input } from "../../components/common/Input";
// import { Button } from "../../components/common/Button";
// import toast from "react-hot-toast";
// import axios from "axios";

// export const AdminCreateProduct = () => {
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // categories ekhon Redux theke ashto, ekhon direct axios diye anbo (optional, niche note dekho)
//   const categories = [
//     { _id: "1", name: "Fruits & Vegetables" },
//     { _id: "2", name: "Dairy & Eggs" },
//     { _id: "3", name: "Bakery" },
//   ];

//   const { register, handleSubmit } = useForm({
//     defaultValues: {
//       status: "active",
//     },
//   });

//   const [imageFiles, setImageFiles]  = useState([]);

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files || []);
//     files.forEach((file) => {
//       if (!file.type.startsWith("image/")) {
//         toast.error(`${file.name} is not an image file.`);
//         return;
//       }
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const dataUrl = event.target?.result;
//         if (dataUrl) {
//           setImagesList((prev) => [
//             ...prev,
//             { id: `img-${Date.now()}-${Math.random()}`, url: dataUrl, isMain: prev.length === 0 },
//           ]);
//           toast.success("Picture added!");
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//     e.target.value = "";
//   };

//   const handleSetMain = (id) => {
//     setImagesList((prev) => prev.map((img) => ({ ...img, isMain: img.id === id })));
//   };

//   const handleRemoveImage = (id) => {
//     setImagesList((prev) => {
//       const filtered = prev.filter((img) => img.id !== id);
//       if (filtered.length > 0 && !filtered.some((img) => img.isMain)) {
//         filtered[0].isMain = true;
//       }
//       return filtered;
//     });
//   };

//   // ✅ Axios diye direct backend e product create
//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     try {
//       const tags = data.tagsString
//         ? data.tagsString.split(",").map((t) => t.trim()).filter(Boolean)
//         : [];

//       const payload = {
//         title: data.title,
//         Category: data.Category,
//         subCategory: data.subCategory,
//         brand: data.brand,
//         price: Number(data.price),
//         discountPrice: Number(data.discountPrice || 0),
//         stock: Number(data.stock),
//         status: data.status,
//         shortDescription: data.shortDescription,
//         description: data.description,
//         AdditionalInfo: data.AdditionalInfo,
//         tags,
//         images: imagesList.map((img) => ({ url: img.url, isMain: img.isMain })),
//       };


//       const res = await axios.post("http://localhost:5000/createproduct", payload);
//       // ⚠️ tomar actual route ta ki eita boshao, ex: "http://localhost:5000/api/products"

//       console.log(res);
//       toast.success(res?.data?.message || "Product created successfully!");
//       navigate("/admin/products");
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.response?.data?.message || "Failed to create product");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-6 pb-12 max-w-4xl mx-auto">
//       <div className="flex items-center gap-3">
//         <Link
//           to="/admin/products"
//           className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
//         >
//           <ArrowLeft className="w-4 h-4" />
//         </Link>
//         <div>
//           <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Create New Product</h1>
//           <p className="text-xs text-slate-500">Publish a new item using Mongoose schema fields</p>
//         </div>
//       </div>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6"
//       >
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <Input label="Title *" placeholder="e.g. Organic Honeycrisp Apples" {...register("title", { required: true })} />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Category *</label>
//             <select
//               {...register("Category")}
//               className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500 font-semibold text-slate-800 dark:text-slate-200"
//             >
//               {categories.map((c) => (
//                 <option key={c._id} value={c.name}>{c.name}</option>
//               ))}
//             </select>
//           </div>
//           <Input label="Sub Category" placeholder="e.g. Fresh Produce" {...register("subCategory")} />
//           <Input label="Brand" placeholder="e.g. EcoBazar Organics" {...register("brand")} />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <Input label="Price ($) *" type="number" step="0.01" {...register("price", { required: true })} />
//           <Input label="Discount Price (% 0-100)" type="number" step="1" min="0" max="100" {...register("discountPrice")} />
//           <Input label="Stock *" type="number" {...register("stock", { required: true })} />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Status</label>
//             <select
//               {...register("status")}
//               className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500 font-semibold text-slate-800 dark:text-slate-200"
//             >
//               <option value="active">Active</option>
//               <option value="pending">Pending</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>
//           <Input label="Tags (Comma separated)" placeholder="e.g. Organic, Fresh, Vegan" {...register("tagsString")} />
//         </div>

//         <div className="flex flex-col gap-1.5">
//           <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Short Description</label>
//           <input
//             {...register("shortDescription")}
//             placeholder="Brief 1-line product highlight..."
//             className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500"
//           />
//         </div>

//         <div className="flex flex-col gap-1.5">
//           <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Description</label>
//           <textarea
//             rows={3}
//             placeholder="Detailed description of the product..."
//             {...register("description")}
//             className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-xs focus:outline-none focus:border-emerald-500"
//           />
//         </div>

//         <div className="flex flex-col gap-1.5">
//           <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Additional Info</label>
//           <textarea
//             rows={2}
//             placeholder="Storage instructions, origin, nutritional facts..."
//             {...register("AdditionalInfo")}
//             className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-xs focus:outline-none focus:border-emerald-500"
//           />
//         </div>

//         <div className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200">
//           <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 flex items-center gap-2">
//             <ImageIcon className="w-4 h-4 text-emerald-600" />
//             Product Pictures ({imagesList.length})
//           </label>

//           <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl cursor-pointer bg-white transition-all">
//             <Upload className="w-7 h-7 text-slate-400 mb-2" />
//             <span className="text-xs font-bold text-slate-700">Click or Drag & Drop Pictures</span>
//             <span className="text-[11px] text-slate-400">JPG, PNG, WEBP</span>
//             <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
//           </label>

//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
//             {imagesList.map((img) => (
//               <div key={img.id} className={`relative rounded-2xl overflow-hidden border-2 aspect-square ${img.isMain ? "border-emerald-500" : "border-slate-200"}`}>
//                 <img src={img.url} alt="Preview" className="w-full h-full object-cover" />
//                 {img.isMain && <span className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg">Main</span>}
//                 <div className="absolute inset-0 bg-slate-900/60 opacity-0 hover:opacity-100 flex items-center justify-center gap-2">
//                   {!img.isMain && (
//                     <button type="button" onClick={() => handleSetMain(img.id)} className="p-2 bg-emerald-600 text-white rounded-xl">
//                       <Star className="w-3.5 h-3.5" />
//                     </button>
//                   )}
//                   <button type="button" onClick={() => handleRemoveImage(img.id)} className="p-2 bg-rose-600 text-white rounded-xl">
//                     <X className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <Button type="submit" size="lg" isLoading={isSubmitting} className="w-max mt-2" leftIcon={<Save className="w-4 h-4" />}>
//           Publish Product
//         </Button>
//       </form>
//     </div>
//   );
// };



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save, Upload, Image as ImageIcon, X, Star } from "lucide-react";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import toast from "react-hot-toast";
import axios from "axios";

export const AdminCreateProduct = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { _id: "1", name: "Fruits & Vegetables" },
    { _id: "2", name: "Dairy & Eggs" },
    { _id: "3", name: "Bakery" },
  ];



  const { register, handleSubmit } = useForm({
    defaultValues: {
      status: "active",
    },
  });

  // ✅ imageFiles = raw File objects (FormData e pathanor jonno)
  const [imageFiles, setImageFiles] = useState([]);
  // ✅ preview shudhu dekhanor jonno (base64 na, blob URL)
  const [previewList, setPreviewList] = useState([]);
  const [mainIndex, setMainIndex] = useState(0);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const validFiles = [];
    const previews = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file.`);
        return;
      }
      validFiles.push(file);
      previews.push(URL.createObjectURL(file)); // ✅ base64 na, lightweight blob URL
    });

    if (validFiles.length > 0) {
      setImageFiles((prev) => [...prev, ...validFiles]);
      setPreviewList((prev) => [...prev, ...previews]);
      toast.success("Picture added!");
    }
    e.target.value = "";
  };

  const handleSetMain = (index) => {
    setMainIndex(index);
  };

  const handleRemoveImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewList((prev) => prev.filter((_, i) => i !== index));
    if (mainIndex === index) setMainIndex(0);
    else if (mainIndex > index) setMainIndex((prev) => prev - 1);
  };

  // ✅ FormData diye real file backend e pathano
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("Category", data.Category);
      formData.append("subCategory", data.subCategory || "");
      formData.append("brand", data.brand || "");
      formData.append("price", data.price);
      formData.append("discountPrice", data.discountPrice || 0);
      formData.append("stock", data.stock);
      formData.append("status", data.status);
      formData.append("shortDescription", data.shortDescription || "");
      formData.append("description", data.description || "");
      formData.append("AdditionalInfo", data.AdditionalInfo || "");
      formData.append("tags", data.tagsString || "");
      formData.append("mainIndex", mainIndex);
      formData.append("field", data.field || "");

      imageFiles.forEach((file) => {
        formData.append("photos", file);
        // ⚠️ backend multer field name eita e match korte hobe: upload.array("photos")
      });

      const res = await axios.post("http://localhost:5000/createproduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res?.data?.message || "Product created successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to create product");
    } finally {
      setIsSubmitting(false);
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
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Create New Product</h1>
          <p className="text-xs text-slate-500">Publish a new item using Mongoose schema fields</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Title *" placeholder="e.g. Organic Honeycrisp Apples" {...register("title", { required: true })} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Category *</label>
            <select
              {...register("Category")}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500 font-semibold text-slate-800 dark:text-slate-200"
            >
              {categories.map((c) => (
                <option key={c._id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <Input label="Sub Category" placeholder="e.g. Fresh Produce" {...register("subCategory")} />
          <Input label="Brand" placeholder="e.g. EcoBazar Organics" {...register("brand")} />
        </div>

        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Display Field</label>
            <select
              {...register("field")}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500 font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="">None</option>
              <option value="Featured Organic Products">Featured Organic Products</option>
              <option value="Just Arrived This Week">Just Arrived This Week</option>
            </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Price ($) *" type="number" step="0.01" {...register("price", { required: true })} />
          <Input label="Discount Price (% 0-100)" type="number" step="1" min="0" max="100" {...register("discountPrice")} />
          <Input label="Stock *" type="number" {...register("stock", { required: true })} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Status</label>
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

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Short Description</label>
          <input
            {...register("shortDescription")}
            placeholder="Brief 1-line product highlight..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Description</label>
          <textarea
            rows={3}
            placeholder="Detailed description of the product..."
            {...register("description")}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Additional Info</label>
          <textarea
            rows={2}
            placeholder="Storage instructions, origin, nutritional facts..."
            {...register("AdditionalInfo")}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200">
          <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            Product Pictures ({previewList.length})
          </label>

          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl cursor-pointer bg-white transition-all">
            <Upload className="w-7 h-7 text-slate-400 mb-2" />
            <span className="text-xs font-bold text-slate-700">Click or Drag & Drop Pictures</span>
            <span className="text-[11px] text-slate-400">JPG, PNG, WEBP</span>
            <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
            {previewList.map((url, index) => (
              <div key={index} className={`relative rounded-2xl overflow-hidden border-2 aspect-square ${mainIndex === index ? "border-emerald-500" : "border-slate-200"}`}>
                <img src={url} alt="Preview" className="w-full h-full object-cover" />
                {mainIndex === index && <span className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg">Main</span>}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 hover:opacity-100 flex items-center justify-center gap-2">
                  {mainIndex !== index && (
                    <button type="button" onClick={() => handleSetMain(index)} className="p-2 bg-emerald-600 text-white rounded-xl">
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button type="button" onClick={() => handleRemoveImage(index)} className="p-2 bg-rose-600 text-white rounded-xl">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" size="lg" isLoading={isSubmitting} className="w-max mt-2" leftIcon={<Save className="w-4 h-4" />}>
          Publish Product
        </Button>
      </form>
    </div>
  );
};