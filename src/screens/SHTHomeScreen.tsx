import React, { FC, useCallback, useContext, useMemo } from "react";
import { FlatList, Platform, TouchableHighlight, View } from "react-native";
import { Icon } from "react-native-elements";

import { ethers } from "ethers";
import BackgroundImage from "../components/BackgroundImage";
import Border from "../components/Border";
import Container from "../components/Container";
import Content from "../components/Content";
import FlexView from "../components/FlexView";
import Heading from "../components/Heading";
import Loading from "../components/Loading";
import Text from "../components/Text";
import Title from "../components/Title";
import TokenAmount from "../components/TokenAmount";
import TokenLogo from "../components/TokenLogo";
import TokenName from "../components/TokenName";
import TokenPrice from "../components/TokenPrice";
import TokenSymbol from "../components/TokenSymbol";
import TokenValue from "../components/TokenValue";
import WebFooter from "../components/web/WebFooter";
import { IS_DESKTOP, Spacing } from "../constants/dimension";
import { EthersContext } from "../context/EthersContext";
import useColors from "../hooks/useColors";
import useHomeState, { HomeState } from "../hooks/useHomeState";
import useLinker from "../hooks/useLinker";
import useTranslation from "../hooks/useTranslation";
import LPTokenWithValue from "../types/LPTokenWithValue";
import TokenWithValue from "../types/TokenWithValue";
import { formatUSD,formatBalance } from "../utils";
import Screen from "./Screen";

interface TokenItemProps {
    token: TokenWithValue;
    disabled?: boolean;
}

interface LPTokenItemProps {
    token: LPTokenWithValue;
    disabled?: boolean;
}

const SHTHomeScreen = () => {
    const t = useTranslation();
    const state = useHomeState();
    const { loadingTokens } = useContext(EthersContext);
    const loading = state.loadingTotalMined;
    const totalValue = state.totalMinedBTC;
    return (
        <Screen>
            <Container>
                <BackgroundImage />
                <Content style={{ paddingBottom: Spacing.huge }}>
                    <Title text={t("total-mined")} style={{ flex: 1,fontSize:28 }} />
                    <Title
                        text={loading ||totalValue==undefined ? t("fetching") : formatBalance(totalValue,18,8)}
                        fontWeight={"light"}
                        disabled={loading}
                        style={{ fontSize: IS_DESKTOP ? 32 : 24 }}
                    />
                    <Home state={state} />
                </Content>
                {Platform.OS === "web" && <WebFooter />}
            </Container>
        </Screen>
    );
};

const Home = ({ state }: { state: HomeState }) => {
    return (
        <View style={{ marginTop: IS_DESKTOP ? Spacing.large : Spacing.normal }}>
            <TotalStaked state={state} />
            <View style={{ height: Spacing.large }} />
            <TotalMiningPower state={state} />
            <Border />
            <View style={{ height: Spacing.large }} />
            <YourBalance state={state} />
        </View>
    );
};

const TotalStaked = ({ state }: { state: HomeState }) => {
    const t = useTranslation();
    const { loadingTokens, tokens } = useContext(EthersContext);
    const goToSwap = useLinker("/staking", "Stake");
    const staked = state.totalStakedBTCST;
    const loading = state.loadingTotalStaked;
    return (
        <View>
            <Heading text={t("total-staked-btcst")} buttonText={t("stake")} onPressButton={goToSwap} />
            <Title
                        text={loading ||staked==undefined ? t("fetching") : formatBalance(staked,18)}
                        fontWeight={"light"}
                        disabled={loading}
                        style={{ fontSize: IS_DESKTOP ? 32 : 24 }}
                    />
        </View>
    );
};

const TotalMiningPower = ({ state }: { state: HomeState }) => {
    const t = useTranslation();
    const loading = state.loadingTotalStaked;
    const power = state.totalStakedBTCST!=undefined?
        state.totalStakedBTCST.div(ethers.BigNumber.from(10)):undefined;
    return (
        <View>
            <Heading text={t("total-mining-power")} />
            {/* @ts-ignore */}
            <LoadingNumber loading={loading} 
                number={power} suffix={" TH/s"}/>
        </View>
    );
};

const YourBalance = ({ state }: { state: HomeState }) => {
    const t = useTranslation();
    const goToFarming = useLinker("/claim", "Mining");
    return (
        <View>
            <Heading text={t("your-btc-balance-inpool")} buttonText={t("claim")} onPressButton={goToFarming} />
            {/* @ts-ignore */}
            <LoadingNumber loading={state.loadingBTCInpool} number={state.yourBTCInpool} />
        </View>
    );
};

const LoadingNumber = (props:{
    loading:boolean;
    number:ethers.BigNumber;
    suffix:string;
})=>{
    // const text = formatBalance(props.number)+""+props.suffix;
    const suffix = props.suffix?props.suffix:"";
    return (props.loading || props.number==undefined) ?(
        <Loading />
    ):(
        <Title text={formatBalance(props.number,18,8)+""+suffix} fontWeight={"light"} disabled={props.loading}
            style={{ fontSize: IS_DESKTOP ? 32 : 24 }}
        />
    );
}

const ExternalIcon = ({ path }) => {
    const { textDark, disabled } = useColors();
    const onPress = () => window.open("https://www.1-b.tc/" + path.toLowerCase(), "_blank");
    const isETH = path.endsWith(ethers.constants.AddressZero);
    return (
        <TouchableHighlight onPress={onPress} disabled={isETH}>
            <Icon
                type={"evilicon"}
                name={"external-link"}
                color={isETH ? disabled : textDark}
                style={{ marginLeft: Spacing.tiny }}
            />
        </TouchableHighlight>
    );
};

const sum = tokens => (tokens ? tokens.reduce((previous, current) => previous + (current.valueUSD || 0), 0) : 0);

export default SHTHomeScreen;
