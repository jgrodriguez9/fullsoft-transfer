const formatNumber = (number?: number | null): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (typeof number === "number") {
    return formatter.format(number);
  }

  return "$0.00";
};

export default formatNumber;
