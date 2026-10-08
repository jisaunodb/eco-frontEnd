export const TAX_RATE = 0.05;

export const calcOrderTotals = (subtotal, itemCount) => {
  const shipping = subtotal > 50 || itemCount === 0 ? 0 : 5;
  const tax = subtotal * TAX_RATE;
  return { shipping, tax, grandTotal: subtotal + shipping + tax };
};