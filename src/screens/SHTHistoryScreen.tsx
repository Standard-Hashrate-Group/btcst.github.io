import React, { FC, useCallback, useContext, useEffect, useMemo } from "react";
import { FlatList, Platform, View } from "react-native";

import moment from "moment";
import useAsyncEffect from "use-async-effect";
import BackgroundImage from "../components/BackgroundImage";
import Button from "../components/Button";
import Container from "../components/Container";
import Content from "../components/Content";
import ErrorMessage from "../components/ErrorMessage";
import Expandable from "../components/Expandable";
import FlexView from "../components/FlexView";
import InfoBox from "../components/InfoBox";
import Heading from "../components/Heading";
import { ITEM_SEPARATOR_HEIGHT } from "../components/ItemSeparator";
import { EthersContext } from "../context/EthersContext";
import Loading from "../components/Loading";
import Meta from "../components/Meta";
import Selectable from "../components/Selectable";
import Text from "../components/Text";
import Title from "../components/Title";
import TokenAmount from "../components/TokenAmount";
import TokenLogo from "../components/TokenLogo";
import TokenSymbol from "../components/TokenSymbol";
import WebFooter from "../components/web/WebFooter";
import { SwapSubMenu } from "../components/web/WebSubMenu";
import { IS_DESKTOP, Spacing } from "../constants/dimension";
import Fraction from "../constants/Fraction";
import useColors from "../hooks/useColors";
import useMyLimitOrdersState, { MyLimitOrdersState } from "../hooks/useMyLimitOrdersState";
import { Order } from "../hooks/useSettlement";
import useTranslation from "../hooks/useTranslation";
import MetamaskError from "../types/MetamaskError";
import Screen from "./Screen";
import useHistoryState, { DailyRecord, HistoryState } from "../hooks/useHistoryState";
import { BigNumber, FixedNumber } from "ethers";
import TokenInput from "../components/TokenInput";
import Border from "../components/Border";
import { formatUSD, formatBalance, formatTimeKey2, formatPercentage, calculateDailyReward, formatApy } from "../utils";
interface DailyRecordProp{
    record:DailyRecord;

}
const DISTRIBUTE_LINE = "0.6";

const SHTHistoryScreen = () => {
    const t = useTranslation();
    const state = useHistoryState();
    return (
        <Screen>
            <Container>
                <BackgroundImage />
                <Content>
                    <Title text={t("farm-stats")} />
                    <Text light={true}>{t("pool-history-desc")}</Text>
                    <StatInfo state={state}/>                    
                    <EstimateAmountInput state={state}/>
                    {/* <Border style={{marginBottom:0}}/> */}
                    <RewardRecords />
                </Content>
                {Platform.OS === "web" && <WebFooter />}
            </Container>
        </Screen>
    );
};

const StatInfo = ({state}:{state:HistoryState})=>{
    const t = useTranslation();
    const disabled = false;
    const expiry = false;
    
    const totalValue = state.totalMinedBTC;
    const loading = state.loadingTotalMined;
    const totalStoken = state.totalStokenSupply;
    const totalStokenRemainLocked = state.totalStokenLocked;
    const totalStaked = state.totalStakedBTCST;
    const btcInpool = state.btcInpool;
    const loadingDaily = state.loadingMiningStatList ||state.loadingTotalStaked || state.getPriceLoading;

    // console.log("setLoadingMiningStatList"+loadingDaily);
    // console.log(formatBalance(totalStaked.div(BigNumber.from(10)),18,8));

    const dailyEstimated = loadingDaily||totalStaked==undefined?undefined:
            FixedNumber.fromString(formatBalance(totalStaked.div(BigNumber.from(10)),18,8)+"")
                .mulUnsafe(FixedNumber.from(state.dayMiningList[0].eachHaveCoin));
    let dailyEstimatedUSD ;  
    let dailyBTCNetreward;  
    let dailyBTCNetrewardPerStaked;
    let dailyUSDRewardPerStaked;
    let boostTimes;
    if (dailyEstimated!=undefined && totalStoken!=undefined && totalStaked!=undefined){
        let aboveLine = true;
        let preHash = FixedNumber.fromString(formatBalance(totalStaked.div(BigNumber.from(10)),18,8)+"");
        let hashrate = preHash;
        let compare = FixedNumber.from(totalStaked);
        let rate = compare.divUnsafe(FixedNumber.from(totalStoken))
                .subUnsafe(FixedNumber.from(DISTRIBUTE_LINE));
        boostTimes = FixedNumber.from("1.0");        
        if (rate.toUnsafeFloat()<0){
            hashrate = FixedNumber.from(DISTRIBUTE_LINE).mulUnsafe(
                FixedNumber.fromString(formatBalance(totalStoken.div(BigNumber.from(10)),18,8)+"")
            );
            aboveLine = false;
            boostTimes = hashrate.divUnsafe(preHash);
        }

        const dailyBtcPerHash = FixedNumber.from(state.dayMiningList[0].eachHaveCoin);
        const price = FixedNumber.from(state.dayMiningList[0].price);
        console.log("calculate netreward using pric:"+price+" daily btc per TH:"+dailyBtcPerHash+" hashrate:"+hashrate);
        let {btc ,usd} = calculateDailyReward(hashrate,dailyBtcPerHash,price);
        dailyBTCNetreward= btc;
        dailyEstimatedUSD= usd;

        dailyBTCNetrewardPerStaked = dailyBTCNetreward.divUnsafe(preHash).divUnsafe(FixedNumber.from(10));
        dailyUSDRewardPerStaked = dailyEstimatedUSD.divUnsafe(preHash).divUnsafe(FixedNumber.from(10));
    }
    return (
        <InfoBox>
            <Title text={t("total-mined")} style={{ flex: 1, fontSize: 28, textAlign: "center" }} />
            <Title
                text={loading || totalValue == undefined ? t("fetching") : formatBalance(totalValue, 18, 8)}
                fontWeight={"light"}
                disabled={loading}
                style={{ fontSize: IS_DESKTOP ? 32 : 24, textAlign: "center" }}
            />
            <Meta
                label={t("total-btc-still-in-pool")}
                text={
                    state.loadingBTCInpool || totalStoken == undefined ? t("fetching") : formatBalance(btcInpool, 18, 8)
                }
                suffix={""}
                disabled={state.loadingBTCInpool}
            />

            <Meta
                label={t("stoken-total-supply")}
                text={
                    state.loadingTotalStokenSupply || totalStoken == undefined
                        ? t("fetching")
                        : formatBalance(totalStoken, 18, 8)
                }
                suffix={""}
                disabled={state.loadingTotalStokenSupply}
            />
            <Meta
                label={t("stoken-total-locked")}
                text={
                    state.loadingTotalStokenLocked || totalStoken == undefined
                        ? t("fetching")
                        : formatBalance(totalStokenRemainLocked, 18, 8)
                }
                suffix={""}
                disabled={state.loadingTotalStokenLocked}
            />
            <Meta
                label={t("total-staked-btcst")}
                text={
                    state.loadingTotalStaked || totalStaked == undefined
                        ? t("fetching")
                        : formatBalance(totalStaked, 18, 2)
                }
                suffix={
                    state.loadingTotalStaked || totalStaked == undefined
                        ? ""
                        : "=" + formatBalance(totalStaked.div(BigNumber.from(10)), 18, 2) + " TH/s"
                }
                disabled={state.loadingTotalStaked}
            />
            <Meta
                label={t("current-eta-daily-reward")}
                text={
                    loadingDaily || dailyBTCNetreward == undefined
                        ? t("fetching")
                        : formatBalance(dailyBTCNetreward, 18, 8) + " BTC"
                }
                suffix={
                    loadingDaily || dailyEstimatedUSD == undefined
                        ? t("fetching")
                        : " ≈ " + "$ " + formatBalance(dailyEstimatedUSD, 18, 2)
                }
                disabled={loadingDaily}
            />
            <Meta
                label={t("current-eta-daily-boost")}
                text={loadingDaily || boostTimes == undefined ? t("fetching") : formatBalance(boostTimes, 18, 2) + " X"}
                suffix={""}
                disabled={loadingDaily}
            />
            <Meta
                label={t("current-eta-daily-reward-per-token-btc")}
                text={
                    loadingDaily || dailyBTCNetrewardPerStaked == undefined
                        ? t("fetching")
                        : formatBalance(dailyBTCNetrewardPerStaked, 18, 8) + " BTC"
                }
                suffix={""}
                disabled={loadingDaily}
            />
            <Meta
                label={t("current-eta-daily-reward-per-token-usd")}
                text={
                    loadingDaily || dailyUSDRewardPerStaked == undefined
                        ? t("fetching")
                        : "$ " + formatBalance(dailyUSDRewardPerStaked, 18, 4)
                }
                suffix={""}
                disabled={loadingDaily}
            />
            <Meta
                label={t("apy")}
                text={
                    loadingDaily || dailyUSDRewardPerStaked == undefined
                        ? t("fetching")
                        : state.btcstPrice === 0
                        ? "-"
                        : formatApy(dailyUSDRewardPerStaked, FixedNumber.fromString(String(state.btcstPrice))) + '%'
                }
                suffix={""}
                disabled={loadingDaily}
            />
        </InfoBox>
    );
};

const EstimateAmountInput = ({ state }: { state: HistoryState }) => {
    const t = useTranslation();
    const totalStoken = state.totalStokenSupply;
    const totalStaked = state.totalStakedBTCST;
    const disabled = (state.amount==undefined || state.amount=="" || FixedNumber.from(state.amount).isZero() 
    || state.loadingMiningStatList);
    let dailyEstimatedUSD ;  
    let dailyBTCNetreward; 
    let dailyBTCNetrewardPerStaked;
    let dailyUSDRewardPerStaked;
    let boostTimes;
    if (!disabled && totalStoken!=undefined && totalStaked!=undefined){
        let hashrate = FixedNumber.fromString(state.amount).divUnsafe(FixedNumber.from(10));
        let aboveLine = true;
        let compare = FixedNumber.from(formatBalance(totalStaked,18,8)+"").addUnsafe(FixedNumber.from(state.amount));
        let rate = compare.divUnsafe(FixedNumber.from( formatBalance(totalStoken,18,8)+"")
                ).subUnsafe(FixedNumber.from(DISTRIBUTE_LINE));
        boostTimes = FixedNumber.from("1.0");
        if (rate.toUnsafeFloat()<0){
            hashrate = FixedNumber.from(DISTRIBUTE_LINE).mulUnsafe(
                FixedNumber.fromString(formatBalance(totalStoken.div(BigNumber.from(10)),18,8)+"")
            );
            aboveLine = false;
            console.log("compare:"+compare+" hashrate:"+hashrate);
            boostTimes = hashrate.mulUnsafe(FixedNumber.from(10)).divUnsafe(compare);
        }

        const dailyBtcPerHash = FixedNumber.from(state.dayMiningList[0].eachHaveCoin);
        const price = FixedNumber.from(state.dayMiningList[0].price);
        let {btc ,usd} = calculateDailyReward(hashrate,dailyBtcPerHash,price);
        
        if (aboveLine){
            dailyBTCNetreward= btc;
            dailyEstimatedUSD= usd;
        }else{
            dailyBTCNetreward = btc.divUnsafe(compare)
                .mulUnsafe(FixedNumber.from(state.amount));
            dailyEstimatedUSD = usd.divUnsafe(compare)
                .mulUnsafe(FixedNumber.from(state.amount));
        }
        
    }
    
    return (
        <View style={{marginTop:Spacing.large}}>
            <Heading text={t("stake-amount-to-estimates")} style={{marginBottom:0}} />
            <Text light={true} style={{marginTop:0,marginBottom:Spacing.tiny}}>{t("estimate-desc")}</Text>
            <TokenInput
                token={state.stoken}
                amount={state.amount}
                onAmountChanged={state.setAmount}
                autoFocus={IS_DESKTOP}
            />
            <InfoBox style={{marginTop:Spacing.tiny}}>
                <Meta 
                    label={t("estimated-reward-in-btc")} 
                    text={disabled?t("n/a"):formatBalance(dailyBTCNetreward,18,8)}
                    suffix={"BTC"}
                    disabled={disabled} />
                <Meta
                    label={t("estimated-reward-in-usd")}
                    text={disabled?t("n/a"):formatBalance(dailyEstimatedUSD,18,2)}
                    suffix={"USD"}
                    disabled={disabled}
                />
                <Meta
                    label={t("estimated-boost-times")}
                    text={disabled?t("n/a"):formatBalance(boostTimes,18,2)}
                    suffix={"X"}
                    disabled={disabled}
                />
            </InfoBox>
        </View>
    );
};

const RewardRecords = () => {
    const state = useHistoryState();
    const t = useTranslation();
    return (
        <View style={{ marginTop: Spacing.large }}>
            <Expandable
                title={t("pool-daily-mined-history")}
                expanded={true}
                onExpand={()=>{}}>
                <RecordList loadingDailyRecord={state.loadingDailyRecord} 
                records={state.records}
                recordItem={RecordItem}
            />
            </Expandable>
            
            {/* <OrderInfo state={state} /> */}
        </View>
    );
};

const RecordList = (props: {
    loadingDailyRecord: boolean;
    records?: DailyRecord[];
    recordItem: FC<DailyRecordProp>;
}) => {
    const t = useTranslation();
    const renderItem = useCallback(({ item }) => {
        return <props.recordItem key={item.timeKey} record={item} />;
    }, []);
    const data = useMemo(
        () =>(props.records || [])
                // @ts-ignore
                .sort((t1, t2) => (t2.timeKey || 0) - (t1.timeKey || 0)),
        [props.records]
    );
    return props.loadingDailyRecord || !props.records ? (
        <Loading />
    ) : data.length === 0 ? (
        <EmptyList />
    ) : (
        <View>
            <FlexView style={{ alignItems: "center", paddingHorizontal: Spacing.tiny, paddingVertical: 4 }}>
                <View style={{flex:1,alignItems:"flex-start"}}>
                    <Text caption={true} numberOfLines={1} fontWeight={"light"}>
                        {t("deposited-rewards")}
                    </Text>
                </View>
                <View>
                    <Text caption={true} numberOfLines={1}  style={{ marginLeft: Spacing.small}}>
                        {t("staked-btcsts")}
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Text caption={true} fontWeight={"light"} >
                        {t("date")}
                    </Text>
                </View>
                {/* <ExternalIcon path={"/all"} /> */}
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
const RecordItem = (props: DailyRecordProp) => {
    const record = props.record;
    const rewardAmount = record.rewardAmount;
    const stakedLowestWaterMark = record.stakedLowestWaterMark;
    return (
        <FlexView style={{ alignItems: "center", paddingHorizontal: Spacing.tiny, paddingVertical: 4 }}>
            <View style={{flex:1,alignItems:"flex-start"}}>
                <Text caption={true} numberOfLines={1} fontWeight={"light"}
                    disabled={false}>
                    {rewardAmount.gt(BigNumber.from(0)) ? formatBalance(rewardAmount || 0): "N/A"}
                </Text>
            </View>
            <View>
                <Text caption={true} numberOfLines={1}  
                    style={{ marginLeft: Spacing.small}}
                    disabled={false}>
                    {stakedLowestWaterMark.gt(BigNumber.from(0)) ? formatBalance(stakedLowestWaterMark || 0,18,2): "N/A"}
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption={true} fontWeight={"light"} disabled={false}>
                    {formatTimeKey2(record.timeKey)}
                </Text>
            </View>
            {/* <ExternalIcon path={"/slot/" + record.timeKey} /> */}
        </FlexView>
    );
};
export default SHTHistoryScreen;
