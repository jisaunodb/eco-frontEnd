// import { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { ArrowLeft, Save } from "lucide-react";
// import { Input } from "../../components/common/Input";
// import { Button } from "../../components/common/Button";
// import { getProductName, getProductCategory, getProductImages, getProductSku, getProductTags } from "../../utils/productHelpers";
// import toast from "react-hot-toast";
// import axios from "axios";

// export const AdminEditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [targetProduct, setTargetProduct] = useState(null);

//   const categories = [
//     { _id: "1", name: "Fruits & Vegetables" },
//     { _id: "2", name: "Dairy & Eggs" },
//     { _id: "3", name: "Bakery" },
//   ];

//   const { register, handleSubmit, reset } = useForm();

//   // ✅ axios diye single product anlam
//   useEffect(() => {
//     async function getProduct() {
//       try {
//         const res = await axios.get(`http://localhost:5000/SingleProduct/${id}`);
//         const product = res?.data?.product || null;
//         setTargetProduct(product);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load product");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     getProduct();
//   }, [id]);

//   useEffect(() => {
//     if (targetProduct) {
//       const images = getProductImages(targetProduct);
//       const tags = getProductTags(targetProduct);

//       reset({
//         title: getProductName(targetProduct),
//         sku: getProductSku(targetProduct),
//         Category: getProductCategory(targetProduct),
//         subCategory: targetProduct.subCategory || "",
//         brand: targetProduct.brand || "",
//         price: targetProduct.price || 0,
//         discountPrice: targetProduct.discountPrice || 0,
//         stock: targetProduct.stock ?? 0,
//         status: targetProduct.status || "active",
//         shortDescription: targetProduct.shortDescription || "",
//         description: targetProduct.description || "",
//         AdditionalInfo: targetProduct.AdditionalInfo || "",
//         tagsString: tags.join(", "),
//         imageUrl: images[0] || "",
//       });
//     }
//   }, [targetProduct, reset]);

//   if (isLoading) {
//     return <div className="py-12 text-center text-slate-400 text-xs">Loading product...</div>;
//   }

//   if (!targetProduct) {
//     return (
//       <div className="py-12 text-center text-slate-500 text-xs">
//         Product not found.{" "}
//         <Link to="/admin/products" className="text-emerald-600 underline">
//           Return to inventory
//         </Link>
//       </div>
//     );
//   }

//   // ✅ axios diye update
//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     try {
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
//         tag: data.tagsString ? data.tagsString.split(",").map((t) => t.trim()).filter(Boolean) : [],
//       };

//       const res = await axios.post(`http://localhost:5000/UpdateProduct/${id}`, payload);
//       toast.success(res?.data?.message || "Product updated successfully!");
//       navigate("/admin/products");
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.response?.data?.message || "Failed to update product.");
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
//           <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
//             Edit Product #{id}
//           </h1>
//           <p className="text-xs text-slate-500">
//             Update product details in Mongoose format
//           </p>
//         </div>
//       </div>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6"
//       >
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <Input label="Title *" {...register("title", { required: true })} />
//           <Input label="SKU *" {...register("sku", { required: true })} />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
//               Category *
//             </label>
//             <select
//               {...register("Category")}
//               className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500 font-semibold text-slate-800 dark:text-slate-200"
//             >
//               {categories.map((c) => (
//                 <option key={c._id} value={c.name}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <Input label="Sub Category" {...register("subCategory")} />
//           <Input label="Brand" {...register("brand")} />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <Input label="Price ($) *" type="number" step="0.01" {...register("price", { required: true })} />
//           <Input label="Discount Price (% 0-100)" type="number" step="1" min="0" max="100" {...register("discountPrice")} />
//           <Input label="Stock *" type="number" {...register("stock", { required: true })} />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
//               Status
//             </label>
//             <select
//               {...register("status")}
//               className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500 font-semibold text-slate-800 dark:text-slate-200"
//             >
//               <option value="active">Active</option>
//               <option value="pending">Pending</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>

//           <Input label="Tags (Comma separated)" {...register("tagsString")} />
//         </div>

//         <Input label="Main Image URL" {...register("imageUrl")} />

//         <div className="flex flex-col gap-1.5">
//           <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
//             Short Description
//           </label>
//           <input
//             {...register("shortDescription")}
//             className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500"
//           />
//         </div>

//         <div className="flex flex-col gap-1.5">
//           <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
//             Description
//           </label>
//           <textarea
//             rows={3}
//             {...register("description")}
//             className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-xs focus:outline-none focus:border-emerald-500"
//           />
//         </div>

//         <div className="flex flex-col gap-1.5">
//           <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
//             Additional Info
//           </label>
//           <textarea
//             rows={2}
//             {...register("AdditionalInfo")}
//             className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-xs focus:outline-none focus:border-emerald-500"
//           />
//         </div>

//         <Button
//           type="submit"
//           size="lg"
//           isLoading={isSubmitting}
//           className="w-max mt-2"
//           leftIcon={<Save className="w-4 h-4" />}
//         >
//           Save Changes
//         </Button>
//       </form>
//     </div>
//   );
// };





// import { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { ArrowLeft, Save, Upload, Image as ImageIcon, X, Star } from "lucide-react";
// import { Input } from "../../components/common/Input";
// import { Button } from "../../components/common/Button";
// import { getProductName, getProductCategory, getProductImages, getProductSku, getProductTags } from "../../utils/productHelpers";
// import toast from "react-hot-toast";
// import axios from "axios";

// export const AdminEditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [targetProduct, setTargetProduct] = useState(null);

//   const categories = [
//     { _id: "1", name: "Fruits & Vegetables" },
//     { _id: "2", name: "Dairy & Eggs" },
//     { _id: "3", name: "Bakery" },
//   ];

//   const { register, handleSubmit, reset } = useForm();

//   // ✅ existing images (database theke asha, already uploaded)
//   const [existingImages, setExistingImages] = useState([]); // [{ url, isMain }]
//   // ✅ notun upload kora image (raw File objects, FormData te jabe)
//   const [newImageFiles, setNewImageFiles] = useState([]);
//   const [newPreviews, setNewPreviews] = useState([]);
//   // ✅ konta main hobe — track kori "existing-<index>" ba "new-<index>" diye
//   const [mainKey, setMainKey] = useState(null);

//   useEffect(() => {
//     async function getProduct() {
//       try {
//         const res = await axios.get(`http://localhost:5000/SingleProduct/${id}`);
//         const product = res?.data?.product || null;
//         setTargetProduct(product);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load product");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     getProduct();
//   }, [id]);

//   useEffect(() => {
//     if (targetProduct) {
//       const images = getProductImages(targetProduct); // ধরে নিচ্ছি এটা [{url, isMain}] অথবা [url,...] দেয়
//       const tags = getProductTags(targetProduct);

//       // images shape normalize kori
//       const normalizedImages = (targetProduct.images || []).map((img) => ({
//         url: img.url || img,
//         isMain: !!img.isMain,
//       }));
//       setExistingImages(normalizedImages);

//       const mainIdx = normalizedImages.findIndex((img) => img.isMain);
//       setMainKey(mainIdx >= 0 ? `existing-${mainIdx}` : normalizedImages.length > 0 ? "existing-0" : null);

//       reset({
//         title: getProductName(targetProduct),
//         sku: getProductSku(targetProduct),
//         Category: getProductCategory(targetProduct),
//         subCategory: targetProduct.subCategory || "",
//         brand: targetProduct.brand || "",
//         price: targetProduct.price || 0,
//         discountPrice: targetProduct.discountPrice || 0,
//         stock: targetProduct.stock ?? 0,
//         status: targetProduct.status || "active",
//         shortDescription: targetProduct.shortDescription || "",
//         description: targetProduct.description || "",
//         AdditionalInfo: targetProduct.AdditionalInfo || "",
//         tagsString: tag.join(", "),
//       });
//     }
//   }, [targetProduct, reset]);

//   // ✅ notun image upload
//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files || []);
//     const validFiles = [];
//     const previews = [];

//     files.forEach((file) => {
//       if (!file.type.startsWith("image/")) {
//         toast.error(`${file.name} is not an image file.`);
//         return;
//       }
//       validFiles.push(file);
//       previews.push(URL.createObjectURL(file));
//     });

//     if (validFiles.length > 0) {
//       setNewImageFiles((prev) => [...prev, ...validFiles]);
//       setNewPreviews((prev) => [...prev, ...previews]);
//       toast.success("Picture added!");
//     }
//     e.target.value = "";
//   };

//   // ✅ existing image remove
//   const handleRemoveExisting = (index) => {
//     setExistingImages((prev) => prev.filter((_, i) => i !== index));
//     if (mainKey === `existing-${index}`) setMainKey(null);
//   };

//   // ✅ notun image remove
//   const handleRemoveNew = (index) => {
//     setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
//     setNewPreviews((prev) => prev.filter((_, i) => i !== index));
//     if (mainKey === `new-${index}`) setMainKey(null);
//   };

//   const handleSetMain = (key) => setMainKey(key);

//   if (isLoading) {
//     return <div className="py-12 text-center text-slate-400 text-xs">Loading product...</div>;
//   }

//   if (!targetProduct) {
//     return (
//       <div className="py-12 text-center text-slate-500 text-xs">
//         Product not found.{" "}
//         <Link to="/admin/products" className="text-emerald-600 underline">
//           Return to inventory
//         </Link>
//       </div>
//     );
//   }

//   // ✅ FormData diye update (image soho)
//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("Category", data.Category);
//       formData.append("subCategory", data.subCategory || "");
//       formData.append("brand", data.brand || "");
//       formData.append("price", data.price);
//       formData.append("discountPrice", data.discountPrice || 0);
//       formData.append("stock", data.stock);
//       formData.append("status", data.status);
//       formData.append("shortDescription", data.shortDescription || "");
//       formData.append("description", data.description || "");
//       formData.append("AdditionalInfo", data.AdditionalInfo || "");
//       formData.append("tag", data.tagsString || "");

//       // ✅ backend ke bujhiye dao purono kon kon image thakche (delete howa gulo bade)
//       formData.append("existingImages", JSON.stringify(existingImages));

//       // ✅ notun file gulo pathao
//       newImageFiles.forEach((file) => {
//         formData.append("photos", file); // ⚠️ backend upload.array("photos", 5) er sathe match
//       });

//       // ✅ main image kon ta (existing-<i> ba new-<i>)
//       formData.append("mainKey", mainKey || "");

//       const res = await axios.post(`http://localhost:5000/UpdateProduct/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success(res?.data?.message || "Product updated successfully!");
//       navigate("/admin/products");
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.response?.data?.message || "Failed to update product.");
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
//           <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
//             Edit Product #{id}
//           </h1>
//           <p className="text-xs text-slate-500">
//             Update product details in Mongoose format
//           </p>
//         </div>
//       </div>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6"
//       >
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <Input label="Title *" {...register("title", { required: true })} />
//           <Input label="SKU *" {...register("sku", { required: true })} disabled />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
//               Category *
//             </label>
//             <select
//               {...register("Category")}
//               className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500 font-semibold text-slate-800 dark:text-slate-200"
//             >
//               {categories.map((c) => (
//                 <option key={c._id} value={c.name}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <Input label="Sub Category" {...register("subCategory")} />
//           <Input label="Brand" {...register("brand")} />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <Input label="Price ($) *" type="number" step="0.01" {...register("price", { required: true })} />
//           <Input label="Discount Price (% 0-100)" type="number" step="1" min="0" max="100" {...register("discountPrice")} />
//           <Input label="Stock *" type="number" {...register("stock", { required: true })} />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
//               Status
//             </label>
//             <select
//               {...register("status")}
//               className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500 font-semibold text-slate-800 dark:text-slate-200"
//             >
//               <option value="active">Active</option>
//               <option value="pending">Pending</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>

//           <Input label="Tags (Comma separated)" {...register("tagsString")} />
//         </div>

//         <div className="flex flex-col gap-1.5">
//           <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
//             Short Description
//           </label>
//           <input
//             {...register("shortDescription")}
//             className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500"
//           />
//         </div>

//         <div className="flex flex-col gap-1.5">
//           <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
//             Description
//           </label>
//           <textarea
//             rows={3}
//             {...register("description")}
//             className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-xs focus:outline-none focus:border-emerald-500"
//           />
//         </div>

//         <div className="flex flex-col gap-1.5">
//           <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
//             Additional Info
//           </label>
//           <textarea
//             rows={2}
//             {...register("AdditionalInfo")}
//             className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-xs focus:outline-none focus:border-emerald-500"
//           />
//         </div>

//         {/* ✅ Image Management Section */}
//         <div className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200">
//           <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 flex items-center gap-2">
//             <ImageIcon className="w-4 h-4 text-emerald-600" />
//             Product Pictures ({existingImages.length + newPreviews.length})
//           </label>

//           <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl cursor-pointer bg-white transition-all">
//             <Upload className="w-7 h-7 text-slate-400 mb-2" />
//             <span className="text-xs font-bold text-slate-700">Click or Drag & Drop Pictures</span>
//             <span className="text-[11px] text-slate-400">JPG, PNG, WEBP</span>
//             <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
//           </label>

//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
//             {/* Existing images */}
//             {existingImages.map((img, index) => {
//               const key = `existing-${index}`;
//               return (
//                 <div key={key} className={`relative rounded-2xl overflow-hidden border-2 aspect-square ${mainKey === key ? "border-emerald-500" : "border-slate-200"}`}>
//                   <img src={img.url} alt="Existing" className="w-full h-full object-cover" />
//                   {mainKey === key && <span className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg">Main</span>}
//                   <div className="absolute inset-0 bg-slate-900/60 opacity-0 hover:opacity-100 flex items-center justify-center gap-2">
//                     {mainKey !== key && (
//                       <button type="button" onClick={() => handleSetMain(key)} className="p-2 bg-emerald-600 text-white rounded-xl">
//                         <Star className="w-3.5 h-3.5" />
//                       </button>
//                     )}
//                     <button type="button" onClick={() => handleRemoveExisting(index)} className="p-2 bg-rose-600 text-white rounded-xl">
//                       <X className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}

//             {/* New images */}
//             {newPreviews.map((url, index) => {
//               const key = `new-${index}`;
//               return (
//                 <div key={key} className={`relative rounded-2xl overflow-hidden border-2 aspect-square ${mainKey === key ? "border-emerald-500" : "border-slate-200"}`}>
//                   <img src={url} alt="New" className="w-full h-full object-cover" />
//                   {mainKey === key && <span className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg">Main</span>}
//                   <span className="absolute top-2 right-2 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-lg">New</span>
//                   <div className="absolute inset-0 bg-slate-900/60 opacity-0 hover:opacity-100 flex items-center justify-center gap-2">
//                     {mainKey !== key && (
//                       <button type="button" onClick={() => handleSetMain(key)} className="p-2 bg-emerald-600 text-white rounded-xl">
//                         <Star className="w-3.5 h-3.5" />
//                       </button>
//                     )}
//                     <button type="button" onClick={() => handleRemoveNew(index)} className="p-2 bg-rose-600 text-white rounded-xl">
//                       <X className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <Button
//           type="submit"
//           size="lg"
//           isLoading={isSubmitting}
//           className="w-max mt-2"
//           leftIcon={<Save className="w-4 h-4" />}
//         >
//           Save Changes
//         </Button>
//       </form>
//     </div>
//   );
// };





import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save, Upload, Image as ImageIcon, X, Star } from "lucide-react";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import toast from "react-hot-toast";
import axios from "axios";

export const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [targetProduct, setTargetProduct] = useState(null);

  const categories = [
    { _id: "1", name: "Fruits & Vegetables" },
    { _id: "2", name: "Dairy & Eggs" },
    { _id: "3", name: "Bakery" },
  ];

  const { register, handleSubmit, reset } = useForm();

  const [existingImages, setExistingImages] = useState([]); // [{ url, isMain }]
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);
  const [mainKey, setMainKey] = useState(null);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await axios.get(`https://ecobazar-backend-1qs6.onrender.com/SingleProduct/${id}`);
        const product = res?.data?.product || null;
        setTargetProduct(product);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product");
      } finally {
        setIsLoading(false);
      }
    }
    getProduct();
  }, [id]);

  useEffect(() => {
    if (targetProduct) {
      const normalizedImages = (targetProduct.images || []).map((img) => ({
        url: img.url || img,
        isMain: !!img.isMain,
      }));
      setExistingImages(normalizedImages);

      const mainIdx = normalizedImages.findIndex((img) => img.isMain);
      setMainKey(mainIdx >= 0 ? `existing-${mainIdx}` : normalizedImages.length > 0 ? "existing-0" : null);

      reset({
        title: targetProduct.title || "",
        sku: targetProduct.sku || "",
        Category: targetProduct.Category || "",
        subCategory: targetProduct.subCategory || "",
        brand: targetProduct.brand || "",
        price: targetProduct.price || 0,
        discountPrice: targetProduct.discountPrice || 0,
        stock: targetProduct.stock ?? 0,
        status: targetProduct.status || "active",
        shortDescription: targetProduct.shortDescription || "",
        description: targetProduct.description || "",
        AdditionalInfo: targetProduct.AdditionalInfo || "",
        tagsString: (targetProduct.tag || []).join(", "),
      });
    }
  }, [targetProduct, reset]);

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
      previews.push(URL.createObjectURL(file));
    });

    if (validFiles.length > 0) {
      setNewImageFiles((prev) => [...prev, ...validFiles]);
      setNewPreviews((prev) => [...prev, ...previews]);
      toast.success("Picture added!");
    }
    e.target.value = "";
  };

  const handleRemoveExisting = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    if (mainKey === `existing-${index}`) setMainKey(null);
  };

  const handleRemoveNew = (index) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
    if (mainKey === `new-${index}`) setMainKey(null);
  };

  const handleSetMain = (key) => setMainKey(key);

  if (isLoading) {
    return <div className="py-12 text-center text-slate-400 text-xs">Loading product...</div>;
  }

  if (!targetProduct) {
    return (
      <div className="py-12 text-center text-slate-500 text-xs">
        Product not found.{" "}
        <Link to="/admin/products" className="text-emerald-600 underline">
          Return to inventory
        </Link>
      </div>
    );
  }

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

      // tag schema te array, tai comma diye split kore each item alada append kori
      const tagArray = (data.tagsString || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      tagArray.forEach((t) => formData.append("tag", t));

      formData.append("existingImages", JSON.stringify(existingImages));

      newImageFiles.forEach((file) => {
        formData.append("photos", file); // backend upload.array("photos", 5) er sathe match thakte hobe
      });

      formData.append("mainKey", mainKey || "");

      const res = await axios.post(`https://ecobazar-backend-1qs6.onrender.com/UpdateProduct/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res?.data?.message || "Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to update product.");
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
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Edit Product #{id}
          </h1>
          <p className="text-xs text-slate-500">
            Update product details in Mongoose format
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Title *" {...register("title", { required: true })} />
          <Input label="SKU *" {...register("sku", { required: true })} disabled />
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

          <Input label="Sub Category" {...register("subCategory")} />
          <Input label="Brand" {...register("brand")} />
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

          <Input label="Tags (Comma separated)" {...register("tagsString")} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
            Short Description
          </label>
          <input
            {...register("shortDescription")}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
            Description
          </label>
          <textarea
            rows={3}
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
            {...register("AdditionalInfo")}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200">
          <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            Product Pictures ({existingImages.length + newPreviews.length})
          </label>

          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl cursor-pointer bg-white transition-all">
            <Upload className="w-7 h-7 text-slate-400 mb-2" />
            <span className="text-xs font-bold text-slate-700">Click or Drag & Drop Pictures</span>
            <span className="text-[11px] text-slate-400">JPG, PNG, WEBP</span>
            <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
            {existingImages.map((img, index) => {
              const key = `existing-${index}`;
              return (
                <div key={key} className={`relative rounded-2xl overflow-hidden border-2 aspect-square ${mainKey === key ? "border-emerald-500" : "border-slate-200"}`}>
                  <img src={img.url} alt="Existing" className="w-full h-full object-cover" />
                  {mainKey === key && <span className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg">Main</span>}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 hover:opacity-100 flex items-center justify-center gap-2">
                    {mainKey !== key && (
                      <button type="button" onClick={() => handleSetMain(key)} className="p-2 bg-emerald-600 text-white rounded-xl">
                        <Star className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button type="button" onClick={() => handleRemoveExisting(index)} className="p-2 bg-rose-600 text-white rounded-xl">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {newPreviews.map((url, index) => {
              const key = `new-${index}`;
              return (
                <div key={key} className={`relative rounded-2xl overflow-hidden border-2 aspect-square ${mainKey === key ? "border-emerald-500" : "border-slate-200"}`}>
                  <img src={url} alt="New" className="w-full h-full object-cover" />
                  {mainKey === key && <span className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg">Main</span>}
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-lg">New</span>
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 hover:opacity-100 flex items-center justify-center gap-2">
                    {mainKey !== key && (
                      <button type="button" onClick={() => handleSetMain(key)} className="p-2 bg-emerald-600 text-white rounded-xl">
                        <Star className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button type="button" onClick={() => handleRemoveNew(index)} className="p-2 bg-rose-600 text-white rounded-xl">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          isLoading={isSubmitting}
          className="w-max mt-2"
          leftIcon={<Save className="w-4 h-4" />}
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};