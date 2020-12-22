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
import { MiningSubMenu } from "../components/web/WebSubMenu";
import { BTCST,BTCSTFarm,BBTC } from "../constants/contracts";
import { IS_DESKTOP, Spacing } from "../constants/dimension";
import Fraction from "../constants/Fraction";
import useSTClaimState, { ClaimState } from "../hooks/useSTClaimState";
import useTranslation from "../hooks/useTranslation";
import MetamaskError from "../types/MetamaskError";
import { formatBalance, isEmptyValue, parseBalance } from "../utils";
import Screen from "./Screen";
import useColors from "../hooks/useColors";
import { ethers } from "ethers";

const SHTClaimScreen = () => {
    const t = useTranslation();
    return (
        <Screen>
            <Container>
                <BackgroundImage />
                <Content>
                    <Title text={t("claim")} />
                    <Text light={true}>{t("claim-desc")}</Text>
                    <Staking />
                </Content>
                {Platform.OS === "web" && <WebFooter />}
            </Container>
            <MiningSubMenu />
        </Screen>
    );
};

const Staking = () => {
    const t = useTranslation();
    const state = useSTClaimState();
    return (
        <View style={{ marginTop: Spacing.large }}>
            <RTokenBalance state={state} />
            <Border />
            <AmountInput state={state} />
            {state.rtoken && state.yourRTokenInpool?.isZero() && (
                <Notice text={t("you-dont-have-reward-token")} color={"orange"} style={{ marginTop: Spacing.small }} />
            )}
            <ClaimInfo state={state} />
        </View>
    );
};

const RTokenBalance = ({ state }: { state: ClaimState }) => {
    const t = useTranslation();
    const {loading,yourTotalRToken,yourRTokenInpool,rtokenAllowed,rtoken} = state;
    const { textDark, textLight, placeholder } = useColors();
    return (
        <View>
            {/* <Heading text={t("your-reward")+" "+(rtoken? rtoken.symbol:"")} /> */}
            <Text
                style={{
                    fontSize: IS_DESKTOP ? 28 : 20,
                    marginBottom: Spacing.tiny,
                    color: loading? textLight : textDark 
                }}>
                {loading || !state.rtoken || !yourRTokenInpool? t("fetching")
                    :t("you-have")+" "+
                    formatBalance(yourRTokenInpool, state.rtoken.decimals,8)+" "+state.rtoken.symbol
                    +" "+t("in-pool")}
            </Text>
            <Text
                style={{
                    fontSize: IS_DESKTOP ? 14 : 10,                    
                    marginBottom: Spacing.tiny,
                    color: loading? textLight : textDark 
                }}>
                {loading || !state.rtoken || !yourTotalRToken? ""
                :t("all-time-mined")+" "+formatBalance(yourTotalRToken, state.rtoken.decimals,8)
               }
            </Text>
        </View>
    );
};

const AmountInput = ({ state }: { state: ClaimState }) => {
    const t = useTranslation();
    if (!state.rtoken ||!state.yourRTokenInpool|| state.yourRTokenInpool.isZero()) {
        return <Heading text={t("amount-to-claim")} disabled={true} />;
    }
    return (
        <View>
            <Heading text={t("amount-to-claim")} />
            <TokenInput
                token={state.rtoken}
                amount={state.amount}
                onAmountChanged={state.setAmount}
                autoFocus={IS_DESKTOP}
            />
        </View>
    );
};

// tslint:disable-next-line:max-func-body-length
const ClaimInfo = ({ state }: { state: ClaimState }) => {
    const t = useTranslation();
    const disabled =
        !state.rtoken || !state.yourRTokenInpool||
        state.yourRTokenInpool.isZero() ||
        isEmptyValue(state.amount);
    let willGet = disabled?undefined:parseBalance(state.amount, state.rtoken?.decimals);
    if (willGet && willGet?.gt(state.yourRTokenInpool)){
        willGet = state.yourRTokenInpool;
    }
    return (
        <InfoBox>
            <AmountMeta
                amount={willGet ? formatBalance(willGet,state.rtoken!.decimals) : ""}
                suffix={state.rtoken?state.rtoken!.symbol:""}
                disabled={disabled}
            />
            <Controls state={state} />
        </InfoBox>
    );
};

const Controls = ({ state }: { state: ClaimState }) => {
    const [error, setError] = useState<MetamaskError>({});
    return (
        <View style={{ marginTop: Spacing.normal }}>
            {!state.rtoken || !state.yourRTokenInpool|| state.yourRTokenInpool.isZero() || isEmptyValue(state.amount) ? (
                <ClaimButton state={state} onError={setError} disabled={true} />
            ) : parseBalance(state.amount, state.rtoken.decimals).gt(state.yourRTokenInpool) ? (
                <InsufficientBalanceButton symbol={state.rtoken.symbol} />
            ) : state.loading ? (
                <FetchingButton />
            ) : (
                <>
                    <ClaimButton state={state} onError={setError} disabled={!state.rtokenAllowed} />
                </>
            )}
            {error.message && error.code !== 4001 && <ErrorMessage error={error} />}
        </View>
    );
};

const ClaimButton = ({
    state,
    onError,
    disabled
}: {
    state: ClaimState;
    onError: (e) => void;
    disabled: boolean;
}) => {
    const t = useTranslation();
    const onPress = async () => {
        onError({});
        try {
            await state.onClaim();
            state.setAmount("");
        } catch (e) {
            onError(e);
        }
    };
    return <Button title={t("claim")} loading={state.entering} onPress={onPress} disabled={disabled} />;
};

export default SHTClaimScreen;
