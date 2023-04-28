export function formatCurrency(amount: string | number) {
  if (amount) {
    return amount?.toLocaleString("pt-BR", {
      style: "currency",
      currency: "brl",
    });
  }

  return "0";
}
