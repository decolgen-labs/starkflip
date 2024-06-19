function configuration() {
  return {
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT || "",
    privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY || "",
    poolId: process.env.NEXT_PUBLIC_POOL_ID || "",
    rpc: process.env.NEXT_PUBLIC_RPC || "",
    accountAddress: process.env.NEXT_PUBLIC_ACCOUT,
  };
}

export default configuration();
