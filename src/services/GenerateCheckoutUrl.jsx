export function generateCheckoutUrl(plan, currency) {
  console.log(plan, currency)
  const baseUrl = 'https://hiaido.chargebee.com/hosted_pages/checkout';
  const planId = `${plan}-${currency.toUpperCase()}-Monthly`;

  return `${baseUrl}?subscription_items[item_price_id][0]=${planId}&subscription_items[quantity][0]=1&utm_source=cb-app-copy`;
}

// import prices from '@/constants/';

// export function generateCheckoutUrl(plan, currency) {
//   if (currency === 'INR' && prices.INR[plan] === null) {
//     return `mailto:support@hiaido.com?subject=${encodeURIComponent(
//       `Inquiry for ${plan} Plan`
//     )}&body=${encodeURIComponent(
//       'Please provide more information about this plan.'
//     )}`;
//   }

//   const baseUrl = 'https://hiaido.chargebee.com/hosted_pages/checkout';
//   const planId = `${plan}-${currency.toUpperCase()}-Monthly`;

//   return `${baseUrl}?subscription_items[item_price_id][0]=${planId}&subscription_items[quantity][0]=1&utm_source=cb-app-copy`;
// }
