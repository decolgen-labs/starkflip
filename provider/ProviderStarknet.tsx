import { RPC_PROVIDER } from "@/utils/constants";
import { sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  jsonRpcProvider,
  useInjectedConnectors,
  voyager,
} from "@starknet-react/core";
import React, { PropsWithChildren } from "react";

const ProviderStarknet = ({ children }: PropsWithChildren) => {
  function rpc() {
    return {
      nodeUrl: RPC_PROVIDER.TESTNET,
    };
  }

  const provider = jsonRpcProvider({ rpc });

  const { connectors } = useInjectedConnectors({
    recommended: [argent()],
    includeRecommended: "onlyIfNoConnectors",
  });
  return (
    <>
      <StarknetConfig
        chains={[sepolia]}
        provider={provider}
        connectors={connectors}
        explorer={voyager}
      >
        {children}
      </StarknetConfig>
    </>
  );
};

export default ProviderStarknet;
