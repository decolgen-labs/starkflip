// Format String Address
export function ellipseMiddle(
  target: string,
  charsStart = 4,
  charsEnd = 4
): string {
  return `${target.slice(0, charsStart)}...${target.slice(
    target.length - charsEnd
  )}`;
}

// Example: 1 FRI => 10**-18 STRK
export function formatBalance(qty: bigint, decimals: number) {
  const balance = String('0').repeat(decimals) + qty.toString();
  const rightCleaned = balance.slice(-decimals).replace(/(\d)0+$/gm, '$1');
  const leftCleaned = BigInt(
    balance.slice(0, balance.length - decimals)
  ).toString();
  return leftCleaned + '.' + rightCleaned;
}
