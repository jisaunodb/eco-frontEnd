import React, { useEffect, useMemo } from "react";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { CategoryCard } from "../../components/product/CategoryCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProducts } from "../../redux/slices/productSlice";
import { getProductCategory, getProductMainImage } from "../../utils/productHelpers";

export const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      const cat = getProductCategory(p);
      if (!map[cat]) {
        map[cat] = { name: cat, productCount: 0, image: getProductMainImage(p) };
      }
      map[cat].productCount += 1;
    });
    return Object.values(map);
  }, [products]);

  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6 pb-12" }, /* @__PURE__ */ React.createElement(Breadcrumb, { items: [{ label: "Categories" }] }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-black text-slate-900 dark:text-slate-100" }, "Product Categories"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1" }, "Explore our wide selection of certified organic groceries, farm fresh produce, and eco-friendly products.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" }, categories.map((category) => /* @__PURE__ */ React.createElement(CategoryCard, { key: category.name, category }))));
};