import React, { FC, useCallback, useContext, useMemo } from "react";
import { FlatList, Platform, TouchableHighlight, View } from "react-native";
import { Icon } from "react-native-elements";

import { BigNumber, ethers } from "ethers";
import BackgroundImage from "../components/BackgroundImage";
import Border from "../components/Border";
import Container from "../components/Container";
import Content from "../components/Content";
import FlexView from "../components/FlexView";
import Heading from "../components/Heading";
import Loading from "../components/Loading";
import Text from "../components/Text";
import Title from "../components/Title";

import WebFooter from "../components/web/WebFooter";
import { IS_DESKTOP, Spacing } from "../constants/dimension";
import { EthersContext } from "../context/EthersContext";
import useColors from "../hooks/useColors";

import useMiningState, { MiningState } from "../hooks/useMiningState";
import useLinker from "../hooks/useLinker";
import useTranslation from "../hooks/useTranslation";
import LPTokenWithValue from "../types/LPTokenWithValue";
import TokenWithValue from "../types/TokenWithValue";
import { formatUSD,formatBalance, formatTimeKey } from "../utils";
import Screen from "./Screen";
import MiningStakeRecord from "../types/MiningStakeRecord";
import { MiningSubMenu } from "../components/web/WebSubMenu";

interface StakeRecordItemProps {
    record: MiningStakeRecord;
    disabled?: boolean;
}
const SHTMiningScreen = () => {
    const t = useTranslation();
    const state = useMiningState();
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
                    <Mining state={state} />
                </Content>
                {Platform.OS === "web" && <WebFooter />}
            </Container>
            <MiningSubMenu />
        </Screen>
    );
};

const Mining = ({ state }: { state: MiningState }) => {
    return (
        <View style={{ marginTop: IS_DESKTOP ? Spacing.large : Spacing.normal }}>
            <BtcStillInPool state={state} />
            <Border/>
            <View style={{ height: Spacing.large }} />
            <YourMiningPower state={state} />
            <View style={{ height: Spacing.large }} />
            <YourStakingRecord state={state} />
        </View>
    );
};

const BtcStillInPool = ({ state }: { state: MiningState }) => {
    const t = useTranslation();
    const { loadingTokens, tokens } = useContext(EthersContext);
    const amount = state.btcInpool;
    const loading = state.loadingBTCInpool;
    return (
        <View>
            <Heading text={t("total-btc-still-in-pool")}/>
            <Title
                        text={loading || amount==undefined ? t("fetching") : formatBalance(amount,18,8)}
                        fontWeight={"light"}
                        disabled={loading}
                        style={{ fontSize: IS_DESKTOP ? 32 : 24 }}
                    />
        </View>
    );
};
const YourMiningPower = ({ state }: { state: MiningState }) => {
    const t = useTranslation();
    const goToFarming = useLinker("/staking", "Stake");
    return (
        <View>
            <Heading text={t("your-mining-power")} buttonText={t("stake")} onPressButton={goToFarming} />
            {/* @ts-ignore */}
            <LoadingNumber loading={state.loadingYourMiningPower}
                 number={state.yourMiningPower?.div(ethers.BigNumber.from(10))} suffix={"TH/s"} />
        </View>
    );
};

const YourStakingRecord = ({ state }: { state: MiningState }) => {
    const t = useTranslation();
    
    return (
        <View>
            <Heading text={t("your-staking-records")} />
            {/* @ts-ignore */}
            <RecordList loading={state.loadingUserInfo} records={state.userInfo?.stakeInfo} recordItem={RecordItem}/>
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
        <Title text={formatBalance(props.number)+""+suffix} fontWeight={"light"} disabled={props.loading}
            style={{ fontSize: IS_DESKTOP ? 32 : 24 }}
        />
    );
}
const RecordList = (props: {
    loading: boolean;
    records?: MiningStakeRecord[];
    recordItem: FC<StakeRecordItemProps>;
}) => {
    const t = useTranslation();
    const renderItem = useCallback(({ item }) => {
        return <props.recordItem key={item.timeKey} record={item} />;
    }, []);
    const data = useMemo(
        () =>
            (props.records || [])
                // @ts-ignore
                .filter(record => ( record.amount.sub(record.withdrawed).gt(ethers.BigNumber.from(0)) ||
                        record.lockedAmount.sub(record.lockedWithdrawed).gt(ethers.BigNumber.from(0)) ) )
                .sort((t1, t2) => (t2.timeKey.toNumber() || 0) - (t1.timeKey.toNumber() || 0)),
        [props.records]
    );
    return props.loading ? (
        <Loading />
    ) : data.length === 0 ? (
        <EmptyList />
    ) : (
        <View>
            <FlexView style={{ alignItems: "center", paddingHorizontal: Spacing.tiny, paddingVertical: 4 }}>
                <View style={{flex:1,alignItems:"flex-start"}}>
                    <Text caption={true} numberOfLines={1} fontWeight={"light"}>
                        {"BTCST"}
                    </Text>
                </View>
                <View>
                    <Text caption={true} numberOfLines={1}  style={{ marginLeft: Spacing.small}}>
                        {t("locked")}
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Text caption={true} fontWeight={"light"} >
                        {t("date")}
                    </Text>
                </View>
                <ExternalIcon path={"/all"} />
            </FlexView>
            <FlatList
                keyExtractor={item => item.timeKey.toString()}
                data={data}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <Border small={true} />}
            />
        </View>
    );
};
const EmptyList = () => {
    const t = useTranslation();
    return (
        <View style={{ margin: Spacing.normal }}>
            <Text disabled={true} style={{ textAlign: "center", width: "100%" }}>
                {t("empty-staking-records")}
            </Text>
        </View>
    );
};
const RecordItem = (props: StakeRecordItemProps) => {
    const record = props.record;
    const freeRemain = record.amount.sub(record.withdrawed);
    const lockedRemain = record.lockedAmount.sub(record.lockedWithdrawed);
    return (
        <FlexView style={{ alignItems: "center", paddingHorizontal: Spacing.tiny, paddingVertical: 4 }}>
            <View style={{flex:1,alignItems:"flex-start"}}>
                <Text caption={true} numberOfLines={1} fontWeight={"light"}
                    disabled={props.disabled}>
                    {freeRemain.gt(BigNumber.from(0)) ? formatBalance(freeRemain || 0): "N/A"}
                </Text>
            </View>
            <View>
                <Text caption={true} numberOfLines={1}  
                    style={{ marginLeft: Spacing.small}}
                    disabled={props.disabled}>
                    {lockedRemain.gt(BigNumber.from(0)) ? formatBalance(lockedRemain || 0): "N/A"}
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption={true} fontWeight={"light"} disabled={props.disabled}>
                    {formatTimeKey(record.timeKey)}
                </Text>
            </View>
            <ExternalIcon path={"/slot/" + record.timeKey} />
        </FlexView>
    );
};
const ExternalIcon = ({ path }) => {
    const { textDark, disabled } = useColors();
    const onPress = () => window.open("https://get.1-b.tc/#/history" + path.toLowerCase());
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
export default SHTMiningScreen;
