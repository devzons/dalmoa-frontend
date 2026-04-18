import type { LoanItem } from "@/features/loan/types";

export function hasLoanContent(item: LoanItem) {
  return Boolean(item.content);
}