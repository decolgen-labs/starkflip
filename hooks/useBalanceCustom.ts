import { ABIS } from "@/abis";
import { CONTRACT_ADDRESS, RPC_PROVIDER } from "@/utils/constants";
import { useEffect, useState } from "react";
import { Contract, Provider } from "starknet";

import { formatBalance } from "@/utils/formatAddress";
interface IProps {
  address: string | null;
  token?: string;
  provider?: string;
}
export const useBalanceCustom = ({
  address,
  token = CONTRACT_ADDRESS.STRK,
  provider = RPC_PROVIDER.MAINET,
}: IProps) => {
  const [balance, setBalance] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchBalance = async () => {
    const contractBalance = new Contract(
      ABIS.ercSierraABI.abi,
      token,
      new Provider({ nodeUrl: provider })
    );
    if (!address) return;
    setIsLoading(true);
    const initialValue = await contractBalance.balanceOf(address);
    const formatBalanceData = parseFloat(formatBalance(initialValue, 18));
    setBalance(() => formatBalanceData.toString());
    setIsLoading(false);
  };
  useEffect(() => {
    if (address) {
      fetchBalance();
    }
  }, [address]);
  return {
    isLoading,
    balance,
    fetchBalance,
  };
};
