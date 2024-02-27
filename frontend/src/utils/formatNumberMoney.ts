// Helper function to convert string to number
const toNum = (value: string = ""): number =>
  Number(parseFloat(value?.replace(/[$,]/g, "")).toFixed(2));

// Helper function to convert number to money
const toMoney = (num: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);

export { toNum, toMoney };
