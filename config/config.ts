export default () => ({
  FLIP_CONTRACT_ADDRESS: String(process.env.NEXT_PUBLIC_CONTRACT) || "",
  privateKey: String(process.env.NEXT_PUBLIC_PRIVATE_KEY) || "",
  POOL_ID: String(process.env.NEXT_PUBLIC_POOL_ID) || "",
  rpc: String(process.env.NEXT_PUBLIC_RPC) || "",
  accountAddress: String(process.env.NEXT_PUBLIC_ACCOUT),
  PUBLIC_API: String(process.env.PUBLIC_NEXT_API),
  PUBLIC_SOCKET: String(process.env.PUBLIC_NEXT_SOCKET_PORT),
});
