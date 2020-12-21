import React, { useState } from "react";
import { Platform, View } from "react-native";

import AmountMeta from "../components/AmountMeta";
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
import Notice from "../components/Notice";
import Text from "../components/Text";
import Title from "../components/Title";
import TokenInput from "../components/TokenInput";
import WebFooter from "../components/web/WebFooter";
import { StakingSubMenu } from "../components/web/WebSubMenu";
import { IS_DESKTOP, Spacing } from "../constants/dimension";
import useSTStakingState, { StakingState } from "../hooks/useSTStakingState";
import useTranslation from "../hooks/useTranslation";
import MetamaskError from "../types/MetamaskError";
import { formatBalance, isEmptyValue, parseBalance } from "../utils";
import Screen from "./Screen";

const SHTUnstakeScreen = () => {
    const t = useTranslation();
    return (
        <Screen>
            <Container>
                <BackgroundImage />
                <Content>
                    <Title text={t("unstake")} />
                    <Text light={true}>{t("unstake-desc")}</Text>
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
    return (
        <View style={{ marginTop: Spacing.large }}>
            <STokenBalance state={state} />
            <Border />
            <AmountInput state={state} />
            {state.stoken && state.yourSTokenStaked?.isZero()  && (
                <Notice text={t("you-dont-have-staked-stoken")} color={"orange"} style={{ marginTop: Spacing.small }} />
            )}
            <UnstakeInfo state={state} />
        </View>
    );
};

const STokenBalance = ({ state }: { state: StakingState }) => {
    const t = useTranslation();
    return (
        <View>
            <Heading text={t("your-staked-BTCTS")} />
            <AmountMeta
                style={{marginBottom: Spacing.tiny}}
                amount={state.yourSTokenStaked ? 
                    formatBalance(state.yourSTokenStaked, state.stoken!.decimals) : ""}
                suffix={"BTCST"}
            />
        </View>
    );
};

const AmountInput = ({ state }: { state: StakingState }) => {
    const t = useTranslation();
    if (!state.stoken || state.yourSTokenStaked.isZero()) {
        return <Heading text={t("amount-to-unstake")} disabled={true} />;
    }
    return (
        <View>
            <Heading text={t("amount-to-unstake")} />
            <TokenInput
                token={state.stoken}
                amount={state.amount}
                onAmountChanged={state.setAmount}
                autoFocus={IS_DESKTOP}
            />
        </View>
    );
};

const UnstakeInfo = ({ state }: { state: StakingState }) => {
    const disabled =
        !state.stoken || !state.yourSTokenStaked
         || state.yourSTokenStaked.isZero() 
         || isEmptyValue(state.amount);
    const unStakeAmount = disabled
        ? undefined
        : parseBalance(state.amount, state.stoken!.decimals);
    return (
        <InfoBox>
            <AmountMeta
                amount={unStakeAmount ? formatBalance(unStakeAmount, state.stoken!.decimals, 8) : ""}
                suffix={"BTCST"}
                disabled={disabled}
            />
            <Controls state={state} />
        </InfoBox>
    );
};

const Controls = ({ state }: { state: StakingState }) => {
    const [error, setError] = useState<MetamaskError>({});
    return (
        <View style={{ marginTop: Spacing.normal }}>
            {!state.stoken || state.yourSTokenStaked.isZero() || isEmptyValue(state.amount) ? (
                <UnstakeButton state={state} onError={setError} disabled={true} />
            ) : parseBalance(state.amount, state.stoken.decimals).gt(state.yourSTokenStaked) ? (
                <InsufficientBalanceButton symbol={state.stoken.symbol} />
            ) : state.loading ? (
                <FetchingButton />
            ) : (
                <UnstakeButton state={state} onError={setError} disabled={false} />
            )}
            {error.message && error.code !== 4001 && <ErrorMessage error={error} />}
        </View>
    );
};

const UnstakeButton = ({
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
            await state.onLeave();
            state.setAmount("");
        } catch (e) {
            onError(e);
        }
    };
    return <Button title={t("unstake")} loading={state.leaving} onPress={onPress} disabled={disabled} />;
};

export default SHTUnstakeScreen;
