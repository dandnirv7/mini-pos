export default function getCategoryIdByProductName(
  name: string,
  categoryMap: Map<string, string>
): string {
  const lower = name.toLowerCase();

  if (
    lower.includes("coffee") ||
    lower.includes("latte") ||
    lower.includes("espresso") ||
    lower.includes("americano") ||
    lower.includes("cold brew") ||
    lower.includes("macchiato")
  ) {
    return categoryMap.get("coffee")!;
  }

  if (lower.includes("tea") || lower.includes("matcha")) {
    return categoryMap.get("tea")!;
  }

  if (lower.includes("beans")) {
    return categoryMap.get("beans")!;
  }

  if (
    lower.includes("croissant") ||
    lower.includes("danish") ||
    lower.includes("muffin") ||
    lower.includes("bread") ||
    lower.includes("cookie")
  ) {
    return categoryMap.get("snacks")!;
  }

  if (
    lower.includes("bundle") ||
    lower.includes("pack") ||
    lower.includes("kit") ||
    lower.includes("set")
  ) {
    return categoryMap.get("bundles")!;
  }

  throw new Error(`No category match for product: ${name}`);
}
