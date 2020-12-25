import React, { useContext,useState } from "react";
import { Image, View,TouchableHighlight } from "react-native";
import Clipboard from 'expo-clipboard';

import { SUPPORTED_WALLETS } from '../../constants'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IS_DESKTOP, Spacing } from "../../constants/dimension";
import { isMobile } from 'react-device-detect'
import { EthersContext } from "../../context/EthersContext";
import { GlobalContext } from "../../context/GlobalContext";
import useColors from "../../hooks/useColors";
import usePrevious from "../../hooks/usePrevious";
import FlexView from "../FlexView";
import useTranslation from "../../hooks/useTranslation";
import Button from "../Button";
import Option from "../WalletModal/Option";
import { injected } from '../../connectors';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import Title from "../Title";
import getEnvVars from "../../../environment";
import { useHistory, useLocation } from "react-router-dom";
const {WEB_URL} = getEnvVars();

const WALLET_VIEWS = {
    OPTIONS: 'options',
    OPTIONS_SECONDARY: 'options_secondary',
    ACCOUNT: 'account',
    PENDING: 'pending'
}
const flags = {
    us: require("../../../assets/flags/us.png"),
    uk: require("../../../assets/flags/uk.png"),
    cn: require("../../../assets/flags/cn.png"),
    kr: require("../../../assets/flags/kr.png")
};
const ConnectWallet = () => {
    const t = useTranslation();
    const { darkMode } = useContext(GlobalContext);
    // important that these are destructed from the account-specific web3-react context
    const { active, account, connector, activate, error } = useWeb3React();
    const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);
    const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>();
    const [pendingError, setPendingError] = useState<boolean>();
    const previousAccount = usePrevious(account);
    const { primary } = useColors();
    const metaMask = window.ethereum?.isMetaMask || false;
    const source =  darkMode
            ? require("../../../assets/standardHashrate-dark.png")
            : require("../../../assets/standardHashrate.png");
    
    const tryActivation = async (connector: AbstractConnector | undefined) => {
        setPendingWallet(connector) // set wallet for pending view
        setWalletView(WALLET_VIEWS.PENDING)
        
        // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
        if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
            connector.walletConnectProvider = undefined
        }
        
        connector &&
        activate(connector, undefined, true).catch(error => {
            console.log("activate error:",error);
            if (error instanceof UnsupportedChainIdError) {
                activate(connector) // a little janky...can't use setError because the connector isn't set
            } else {
                setPendingError(true)
            }
        })
    }

    function getOptions() {
        const isMetamask = window.ethereum && window.ethereum.isMetaMask
        return Object.keys(SUPPORTED_WALLETS).map(key => {
            const option = SUPPORTED_WALLETS[key]
            if (option.name == 'Binance Chain Wallet'){
                if (window.BinanceChain==undefined){
                    return (
                        <Option
                        id={`connect-${key}`}
                        key={key}
                        color={option.color}
                        header={t('install-binance-chain-wallet')}
                        subheader={null}
                        link={option.url}
                        icon={require('../../../assets/' + option.iconName)}
                        />
                    )
                }
            } 
            // check for mobile options
            if (isMobile) {
                if (!window.web3 && !window.ethereum && option.mobile) {
                    return (
                    <Option
                        onClick={() => {
                            option.connector !== connector && !option.href && tryActivation(option.connector)
                        }}
                        id={`connect-${key}`}
                        key={key}
                        active={option.connector && option.connector === connector}
                        color={option.color}
                        link={option.href}
                        header={option.name}
                        subheader={null}
                        icon={require('../../../assets/' + option.iconName)}
                    />
                    )
                }
                return null
            }
    
            // overwrite injected when needed
            if (option.connector === injected) {
                // don't show injected if there's no injected provider
                if (!(window.web3 || window.ethereum)) {
                    if (option.name === 'MetaMask') {
                        return (
                            <Option
                            id={`connect-${key}`}
                            key={key}
                            color={option.color}
                            header={t('install-metamask')}
                            subheader={null}
                            link={'https://metamask.io/'}
                            icon={require('../../../assets/metamask-icon.png')}
                            />
                        )
                    } else {
                        return null //dont want to return install twice
                    }
                }
                
                
                // don't return metamask if injected provider isn't metamask
                else if (option.name === 'MetaMask' && !isMetamask) {
                    return null
                }
                // likewise for generic
                else if (option.name === 'Injected' && isMetamask) {
                    return null
                }
            }
            // return rest of options
            return (
                !isMobile &&
                !option.mobileOnly && (
                    <Option
                    id={`connect-${key}`}
                    onClick={() => {
                        tryActivation(option.connector)
                    }}
                    key={key}
                    active={option.connector === connector}
                    color={option.color}
                    link={option.href}
                    header={option.name}
                    subheader={null} //use option.descriptio to bring back multi-line
                    icon={require('../../../assets/' + option.iconName)}
                    />
                )
            )
        })
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image
                source={source}
                style={{ width: metaMask ? 223 : 200, height: metaMask ? 183 : 200, marginBottom: Spacing.normal }}
            />
            <Title text={t("connect-with-wallet")}/>
            {/* {window.ethereum && <ConnectButton />}
            <WalletConnectButton /> */}
            {getOptions()}
            <Title text={t("or")} style={{fontSize:IS_DESKTOP?30:14,marginTop:Spacing.tiny}}/>
            <Button
                size={"large"}
                type={"outline"}
                color={darkMode ? "white" : primary}
                onPress={() => Clipboard.setString(''+WEB_URL)}
                title={t("copy-url-to-open-in-your-wallet-dapp-broswer")}
                containerStyle={{ width: IS_DESKTOP ? 440 : "100%" }}
                style={{ marginTop: Spacing.tiny, marginHorizontal: Spacing.normal }}
            />
            <FlexView style={{ marginTop: Spacing.small }}>
                <Flag name={"uk"} locale={"en"} />
                <Flag name={"cn"} locale={"zh"} />
                {/* <Flag name={"kr"} locale={"ko"} /> */}
            </FlexView>             
        </View>
    );
};

const Flag = ({ name, locale }) => {
    const history = useHistory();
    const location = useLocation();
    const onPress = () => {
        history.push(location.pathname + "?locale=" + locale);
    };
    return (
        <TouchableHighlight onPress={onPress} style={{ marginHorizontal: 4 }}>
            <Image source={flags[name]} style={{ width: 30, height: 20 }} />
        </TouchableHighlight>
    );
};



const ConnectButton = () => {
    const t = useTranslation();
    const { primary } = useColors();
    const { setEthereum } = useContext(EthersContext);
    const onPress = async () => {
        if (window.ethereum) {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            setEthereum(window.ethereum);
        } else {
            alert(t("no-ethereum-provider-found"));
        }
    };
    const metaMask = window.ethereum?.isMetaMask || false;
    return (
        <Button
            size={"large"}
            // icon ={}
            color={metaMask ? "#e2761b" : primary}
            onPress={onPress}
            title={metaMask ? "MetaMask" : t("connect")}
            containerStyle={{ width: IS_DESKTOP ? 440 : "100%" }}
            style={{ marginTop: Spacing.small, marginHorizontal: Spacing.normal }}
        />
    );
};

const WalletConnectButton = () => {
    const { darkMode } = useContext(GlobalContext);
    const { primary } = useColors();
    const { setEthereum } = useContext(EthersContext);
    const onPress = async () => {
        const ethereum = new WalletConnectProvider({
            rpc: {
                1: "https://bsc-dataseed1.defibit.io"
            },
            bridge: 'https://bridge.walletconnect.org',
            qrcode: true,
            pollingInterval: 15000
        });
        await ethereum.enable();
        // @ts-ignore
        setEthereum(ethereum);
    };
    return (
        <Button
            size={"large"}
            type={"outline"}
            color={darkMode ? "white" : primary}
            onPress={onPress}
            title={"WalletConnect"}
            containerStyle={{ width: IS_DESKTOP ? 440 : "100%" }}
            style={{ marginTop: Spacing.small, marginHorizontal: Spacing.normal }}
        />
    );
};

export default ConnectWallet;
