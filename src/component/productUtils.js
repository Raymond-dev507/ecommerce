// Small helpers so the components don't depend on the exact shape of your data.
// Adjust these if your fields are named differently.

// Your data stores 7999 for the headphones. Showing that as ₦79.99 would look
// wrong in naira, so it is shown as ₦7,999. If you ever want it divided by 100,
// change PRICE_DIVISOR to 100.
const PRICE_DIVISOR = 1

export const getPrice = (p) => (p.priceCents ?? 0) / PRICE_DIVISOR

export const getOldPrice = (p) =>
    p.oldPriceCents ? p.oldPriceCents / PRICE_DIVISOR : null



export const getStars = (p) =>
    typeof p.rating === 'object' ? p.rating?.stars ?? 0 : p.rating ?? 0

export const getRatingCount = (p) =>
    typeof p.rating === 'object' ? p.rating?.count ?? 0 : p.ratingCount ?? p.reviews ?? 0

export const isInStock = (p) => p.inStock !== false

export const formatNaira = (n) => `₦${Math.round(n).toLocaleString('en-NG')}`