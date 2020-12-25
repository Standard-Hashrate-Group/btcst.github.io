import React from "react";

import { EthersContextConsumer, EthersContextProvider } from "./EthersContext";
import { GlobalContextConsumer, GlobalContextProvider } from "./GlobalContext";
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { NetworkContextName } from '../constants'
import getLibrary from "../utils/getLibrary"

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)
if ('ethereum' in window) {
    ;(window.ethereum as any).autoRefreshOnNetworkChange = false
}

export const ContextProvider = ({ children }) => {
    return (
        <GlobalContextProvider>
            <Web3ReactProvider getLibrary={getLibrary}>
                <Web3ProviderNetwork getLibrary={getLibrary}>
                    <EthersContextProvider>{children}</EthersContextProvider>
                </Web3ProviderNetwork>
            </Web3ReactProvider>
        </GlobalContextProvider>
    );
};

export const ContextConsumer = ({ children }) => {
    return (
        <GlobalContextConsumer>
            {globalContext => (
                <EthersContextConsumer>
                    {ethersContext =>
                        children({
                            ...globalContext,
                            ...ethersContext
                        })
                    }
                </EthersContextConsumer>
            )}
        </GlobalContextConsumer>
    );
};
