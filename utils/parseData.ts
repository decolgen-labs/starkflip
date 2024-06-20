export function convertToNumber(value: any): any {
  if (typeof value === "string" && value.endsWith("n")) {
    const bigIntValue = BigInt(value.slice(0, -1));
    // Convert to a normal number if within safe range
    if (
      bigIntValue <= Number.MAX_SAFE_INTEGER &&
      bigIntValue >= Number.MIN_SAFE_INTEGER
    ) {
      return Number(bigIntValue);
    }
    return bigIntValue;
  }
  return value;
}

export function convertPropertiesToNumber(obj: any): any {
  const result: any = {};
  for (const key in obj) {
    console.log("Log", key);
    if (obj.hasOwnProperty(key)) {
      let value = obj[key];
      if (typeof value === "string" && value.endsWith("n")) {
        const bigIntValue = BigInt(value.slice(0, -1));
        // Convert to a normal number if within safe range
        if (
          bigIntValue <= Number.MAX_SAFE_INTEGER &&
          bigIntValue >= Number.MIN_SAFE_INTEGER
        ) {
          result[key] = Number(bigIntValue);
        } else {
          result[key] = bigIntValue;
        }
      } else if (typeof value === "object" && value !== null) {
        result[key] = convertPropertiesToNumber(value);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}
