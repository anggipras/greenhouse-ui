export const formatNumberCurrency = (numStr?: string): string => {
  if (numStr) {
    const num = parseFloat(numStr);

    if (isNaN(num)) {
      throw new Error("Invalid number string");
    }

    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1) + "B";
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + "K";
    } else {
      return num.toString();
    }
  }
  return "";
};
