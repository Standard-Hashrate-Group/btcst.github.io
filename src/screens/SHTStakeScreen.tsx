import React, { useState } from "react";
import { Platform, View } from "react-native";

import AmountMeta from "../components/AmountMeta";
import ApproveButton from "../components/ApproveButton";
import BackgroundImage from "../components/BackgroundImage";
import Border from "../components/Border";
import Button from "../components/Button";
import Container from "../components/Container";
import Content from "../components/Content";
import ErrorMessage from "../components/ErrorMessage";
import FetchingButton from "../components/FetchingButton";
import Heading from "../components/Heading";
import InfoBox from "../components/InfoBox";
import InsufficientBalanceButton from "../components/InsufficientBalanceButton";
import Meta from "../components/Meta";
import Notice from "../components/Notice";
import Text from "../components/Text";
import Title from "../components/Title";
import TokenInput from "../components/TokenInput";
import WebFooter from "../components/web/WebFooter";
import { StakingSubMenu } from "../components/web/WebSubMenu";
import { BTCST,BTCSTFarm,BBTC } from "../constants/contracts";
import { IS_DESKTOP, Spacing } from "../constants/dimension";
import Fraction from "../constants/Fraction";
import useSTStakingState, { StakingState } from "../hooks/useSTStakingState";
import useTranslation from "../hooks/useTranslation";
import MetamaskError from "../types/MetamaskError";
import { formatBalance, isEmptyValue, parseBalance } from "../utils";
import Screen from "./Screen";
import useColors from "../hooks/useColors";
import { ethers } from "ethers";
import useLinker from "../hooks/useLinker";

const SHTStakeScreen = () => {
    const t = useTranslation();
    return (
        <Screen>
            <Container>
                <BackgroundImage />
                <Content>
                    <Title text={t("stake")} />
                    <Text light={true}>{t("stake-desc")
                    // +t("or")+" "+t("just-send-to-address")+" "+BTCSTFarm
                                    }</Text>
                    <Staking />
                </Content>
                {Platform.OS === "web" && <WebFooter />}
            </Container>
            <StakingSubMenu />
        </Screen>
    );
};

const Staking = () => {
    const t = useTranslation();
    const state = useSTStakingState();
    const onPressEx = useLinker("https://www.binance.com/cn/trade/BTCST_USDT", "", "_blank");
    const onPressSwap = useLinker("https://exchange.pancakeswap.finance/", "", "_blank");
    return (
        <View style={{ marginTop: Spacing.large }}>
            <STokenBalance state={state} />
            <Border />
            <AmountInput state={state} />
            {state.stoken && state.yourTotalSToken?.isZero() && (
                <View>
                    <Notice text={t("you-dont-have-btcst")} color={"orange"} style={{ marginTop: Spacing.small }} />
                    <Button style={{marginTop:Spacing.tiny}} title={t("buy-on-binance")} onPress={onPressEx}/>
                    <Button style={{marginTop:Spacing.tiny}} title={t("buy-on-pancakeswap")} onPress={onPressSwap}/>
                </View>
            )}
            <StakeInfo state={state} />
        </View>
    );
};

const STokenBalance = ({ state }: { state: StakingState }) => {
    const t = useTranslation();
    const {loading,yourTotalSToken,yourFreeToSendSToken,yourSTokenStaked,stokenAllowed} = state;
    const { textDark, textLight, placeholder } = useColors();
    return (
        <View>
            {/* <Heading text={t("your-BTCTS")} /> */}
            <Text
                style={{
                    fontSize: IS_DESKTOP ? 28 : 20,
                    marginBottom: Spacing.tiny,
                    color: loading? textLight : textDark 
                }}>
                {loading || !state.stoken || !yourTotalSToken? t("fetching")
                    :t("you-have")+" "+formatBalance(yourTotalSToken, state.stoken.decimals)+" BTCST"
                    }
            </Text>
            <Text
                style={{
                    fontSize: IS_DESKTOP ? 14 : 10,                    
                    marginBottom: Spacing.tiny,
                    color: loading? textLight : textDark 
                }}>
                {loading || !state.stoken || !yourTotalSToken? ""
                :t("free-to-send")+formatBalance(yourFreeToSendSToken, state.stoken.decimals)+" "
                +t("staked-in-pool")+formatBalance(yourSTokenStaked, state.stoken.decimals)}
            </Text>
        </View>
    );
};

const AmountInput = ({ state }: { state: StakingState }) => {
    const t = useTranslation();
    if (!state.stoken || state.yourTotalSToken.isZero()) {
        return <Heading text={t("amount-to-stake")} disabled={true} />;
    }
    return (
        <View>
            <Heading text={t("amount-to-stake")} />
            <TokenInput
                token={state.stoken}
                amount={state.amount}
                onAmountChanged={state.setAmount}
                autoFocus={IS_DESKTOP}
            />
        </View>
    );
};

// tslint:disable-next-line:max-func-body-length
const StakeInfo = ({ state }: { state: StakingState }) => {
    const t = useTranslation();
    const { textDark, textLight, placeholder } = useColors();
    const disabled =
        !state.stoken ||
        state.yourTotalSToken.isZero() ||
        !state.yourSTokenStaked ||
        isEmptyValue(state.amount);
        
    const powerPrice = ethers.FixedNumber.from(58).divUnsafe(ethers.FixedNumber.from(1000*1000));
    const powerPerHashUnitDay = ethers.FixedNumber.from(60).mulUnsafe(ethers.FixedNumber.from(24));
    const dailyBTCYeild = ethers.FixedNumber.from(711).divUnsafe(ethers.FixedNumber.from(100000000));
    const btcPrice = ethers.FixedNumber.from(22715);
    const dailyBTCNetrewardPerHashUnit = dailyBTCYeild.subUnsafe(
        powerPerHashUnitDay.mulUnsafe(powerPrice).divUnsafe(btcPrice));
    
    const dailyReward = disabled
        ? undefined
        : ethers.FixedNumber.from(state.amount)
              .mulUnsafe(dailyBTCNetrewardPerHashUnit)
              .divUnsafe(ethers.FixedNumber.from(10));
    const alreadyReward = disabled
        ? undefined
        : ethers.FixedNumber.from(formatBalance(state.yourSTokenStaked,state.stoken!.decimals))
            .mulUnsafe(dailyBTCNetrewardPerHashUnit)
            .divUnsafe(ethers.FixedNumber.from(10));
    const suppose = disabled? undefined:dailyReward?.addUnsafe(alreadyReward!);
    // console.log(dailyReward?.toString()+" dailyReward");

    const dailyRewardTotal = disabled ? undefined : 
            ethers.FixedNumber.fromString(formatBalance(state.totalSTokenSupply,state.stoken!.decimals))
            .divUnsafe(ethers.FixedNumber.from(10)).mulUnsafe(dailyBTCNetrewardPerHashUnit);
    const stoenBalance = disabled ? undefined : 
                            parseBalance(state.amount, state.stoken!.decimals)
                            .add(state.yourSTokenStaked!);

    const share = disabled
        ? undefined
        : suppose!.divUnsafe(dailyRewardTotal!).mulUnsafe(ethers.FixedNumber.from(100)).round(6);
    return (
        <InfoBox>
            {/* <AmountMeta
                amount={suppose ? suppose.round(8).toString() : ""}
                suffix={t("btcb-estimated")}
                disabled={disabled}
            /> */}
            <Text
            style={{
                fontSize: IS_DESKTOP ? 28 : 20,
                marginBottom: Spacing.normal,
                color: disabled ? placeholder : textLight
            }}>
            {disabled ? t("n/a") : t("btcb-estimated")}
            </Text>
            <Meta label={t("daily-share")} text={share} suffix={"%"} disabled={disabled} />
            <Meta label={t("your-daily-reward")} text={suppose ? suppose.round(8).toString() : ""} disabled={disabled} />
            <Controls state={state} />
        </InfoBox>
    );
};

const Controls = ({ state }: { state: StakingState }) => {
    const [error, setError] = useState<MetamaskError>({});
    return (
        <View style={{ marginTop: Spacing.normal }}>
            {!state.stoken || state.yourTotalSToken.isZero() || isEmptyValue(state.amount) ? (
                <StakeButton state={state} onError={setError} disabled={true} />
            ) : parseBalance(state.amount, state.stoken.decimals).gt(state.yourTotalSToken) ? (
                <InsufficientBalanceButton symbol={state.stoken.symbol} />
            ) : state.loading ? (
                <FetchingButton />
            ) : (
                <>
                    <ApproveButton
                        token={state.stoken}
                        spender={BTCSTFarm}
                        onSuccess={() => state.setSTokenAllowed(true)}
                        onError={setError}
                        hidden={state.stokenAllowed}
                    />
                    <StakeButton state={state} onError={setError} disabled={!state.stokenAllowed} />
                </>
            )}
            {error.message && error.code !== 4001 && <ErrorMessage error={error} />}
        </View>
    );
};

const StakeButton = ({
    state,
    onError,
    disabled
}: {
    state: StakingState;
    onError: (e) => void;
    disabled: boolean;
}) => {
    const t = useTranslation();
    const onPress = async () => {
        onError({});
        try {
            await state.onEnter();
            state.setAmount("");
        } catch (e) {
            onError(e);
            console.log(e);
        }
    };
    return <Button title={t("stake")} loading={state.entering} onPress={onPress} disabled={disabled} />;
};

export default SHTStakeScreen;
