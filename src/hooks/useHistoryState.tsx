import { useContext, useEffect, useState } from "react";

import { BigNumber, ethers, FixedNumber } from "ethers";
import sushiData from "@sushiswap/sushi-data";
import useAsyncEffect from "use-async-effect";
import Fraction from "../constants/Fraction";
import { EthersContext } from "../context/EthersContext";
import LPTokenWithValue from "../types/LPTokenWithValue";
import { isWETH } from "../utils";
import { fetchLPTokenWithValue, fetchMyLPTokens, fetchMyPools } from "../utils/fetch-utils";
import useSDK from "./useSDK";
import { getBTCSTPrice, viewFarmBasicInfo,viewRoundSlot,fetchBtcMiningStat,getTotalRemainingSupplyLocked,viewUserInfo,totalSupplyOfSToken,fetchTotalMinedRTokenInpool, fetchCurrentTotalStakedSTokenInpool,viewTotalRewardInPoolFrom} from "../utils/api-utils";
import { getContract, parseBalance } from "../utils";
import { BTCST,BTCSTFarm,BBTC } from "../constants/contracts";
import MiningUserInfo from "../types/MiningUserInfo";
import MiningStakeRecord from "../types/MiningStakeRecord";
import Token from "../types/Token";
export const BATCH_LOAD_RECORD_LIMIT = 5;

export interface MiningStat{
    time:number,
    price:FixedNumber,
    eachHaveCoin:FixedNumber,
    eachHaveUsdt:FixedNumber,
    eachHaveCny:FixedNumber
}

export interface FarmInfo{
    started: number;
    stakePeriod: number;
    desc: string|undefined;
}

export interface DailyRecord{
    rewardLastSubmiter:string;
    rewardAmount:BigNumber;
    rewardAccumulateAmount:BigNumber;
    totalStaked:BigNumber;
    stakedLowestWaterMark:BigNumber;
    totalStakedInSlot:BigNumber;
    stakedAddresses:string[];
    timeKey:number;
}

export interface HistoryState {
    totalMinedBTC:ethers.BigNumber;
    loadingTotalMined:boolean;
    
    btcInpool:ethers.BigNumber;
    loadingBTCInpool:boolean;

    totalStokenSupply:ethers.BigNumber;
    loadingTotalStokenSupply:boolean;

    totalStokenLocked:ethers.BigNumber;
    loadingTotalStokenLocked:boolean;

    totalStakedBTCST:ethers.BigNumber;
    loadingTotalStaked:boolean;

    estimatedBTCPerToken:ethers.BigNumber;
    loadingEstimatedBTC:boolean;


    yourMiningPower:ethers.BigNumber;
    loadingYourMiningPower:boolean;

    dayMiningList:MiningStat[];
    hourMiningList:MiningStat[]
    loadingMiningStatList:boolean;

    amount: string;
    setAmount: (amount: string) => void;

    stoken?: Token;

    loadingDailyRecord:boolean;
    selectedRecord?:DailyRecord;
    setSelectedRecord:(record?:DailyRecord)=>void;
    records?:DailyRecord[];

    farmInfo?:FarmInfo;
    recordLastLoadTime:number|undefined;

    alreadyLoadedTime:number|undefined;

    getPriceLoading: boolean;
    btcstPrice: number;
}

// tslint:disable-next-line:max-func-body-length
const useHistoryState = () => {
    const { provider, signer, address } = useContext(EthersContext);

    const [totalMinedBTC,setTotalMinedBTC] = useState<ethers.BigNumber>();
    const [loadingTotalMined,setLoadingTotalMined] = useState(true);

    const [totalStokenSupply,setTotalStokenSupply] = useState<ethers.BigNumber>();
    const [loadingTotalStokenSupply,setLoadingTotalStokenSupply] = useState(true);

    const [totalStokenLocked,settotalStokenLocked] = useState<ethers.BigNumber>();
    const [loadingTotalStokenLocked,setLoadingTotalStokenLocked] = useState(true);

    const [totalStakedBTCST,setTotalStakedBTCST] = useState<ethers.BigNumber>();
    const [loadingTotalStaked,setLoadingTotalStaked] = useState(true);
    
    const [btcInpool,setBtcInpool] = useState<ethers.BigNumber>();
    const [loadingBTCInpool,setloadingBTCInpool] = useState(true);

    const [yourMiningPower,setYourMiningPower] = useState<ethers.BigNumber>();
    const [loadingYourMiningPower,setLoadingYourMiningPower] = useState(true);
    const [loadingMiningStatList,setLoadingMiningStatList] = useState(true);
    
    const [dayMiningList,setDayMiningList] = useState<MiningStat[]>();
    const [amount, setAmount] = useState("");
    const [stoken,setSToken] = useState<Token>();
    const [records,setRecords] = useState<DailyRecord[]>();
    const [selectedRecord,setSelectedRecord] =useState<DailyRecord>();
    const [loadingDailyRecord,setLoadingDailyRecord] = useState(true);
    const [farmInfo,setFarmInfo] = useState<FarmInfo>();
    const [recordLastLoadTime,setRecordLastLoadTime] = useState<number>();
    const [alreadyLoadedTime,setAlreadyLoadedTime] = useState<number>();
    const [getPriceLoading, setGetPriceLoading] = useState<boolean>(false);
    const [btcstPrice, setBtcstPrice] = useState<number>(0);

    const sToken :Token ={
        name: "Standard BTC Hashrate Token",
        address: BTCST,
        decimals: 18,
        symbol: "BTCST",
        logoURI: "",
        balance: ethers.BigNumber.from(0)
    };
    function getTimeKey(time,baseTime,stakePeriod){
        if (time<baseTime){
            throw new Error("time < farm started time");
        }
        let passed = Math.round(time-baseTime);
        let round = Math.round(passed/stakePeriod);
        let end = baseTime+round*stakePeriod;
        if (end<time){
            return end+stakePeriod;
        }
        return end;
    }
    useEffect(() => {
        setSToken(sToken);
        setTotalMinedBTC(undefined);
        setLoadingTotalMined(true);
        setBtcInpool(undefined);
        setloadingBTCInpool(true);
        setYourMiningPower(undefined);
        setLoadingYourMiningPower(true);
        setLoadingTotalStokenSupply(true);
        setLoadingTotalStokenLocked(true);
        setLoadingTotalStaked(true);
        setLoadingMiningStatList(true);
        setAmount("");
        setLoadingDailyRecord(true);
        setFarmInfo(undefined);
        setRecordLastLoadTime(undefined);
    }, [address]);

    useAsyncEffect(async()=>{
        if (provider && signer) {
            try{
                const fetched = await viewFarmBasicInfo(provider);
                setFarmInfo({started:fetched.started.toNumber(),stakePeriod:fetched.stakePeriod.toNumber(),desc:fetched.desc});
                setRecordLastLoadTime(getTimeKey(Date.now()/1000,fetched.started,fetched.stakePeriod));
            }finally{

            }
        }
    },[provider,signer]);
    useAsyncEffect(async()=>{
        if (provider && signer && farmInfo &&recordLastLoadTime) {
            setLoadingDailyRecord(true);
            console.log("farminfo",farmInfo);
            try{
                let arr = [];
                let now = Date.now()/1000;
                if (alreadyLoadedTime && alreadyLoadedTime<now && alreadyLoadedTime>farmInfo.started){
                    now = alreadyLoadedTime - farmInfo.stakePeriod;
                }
                for (let index = 0; index < BATCH_LOAD_RECORD_LIMIT; index++) {
                    let go = now-index*farmInfo.stakePeriod;
                    if (go<=farmInfo.started){
                        break;;
                    }
                    let k = getTimeKey(go,farmInfo.started,farmInfo.stakePeriod);
                    arr.push(k);
                }
                let data = await Promise.all(
                    arr.map(field => {
                        try {
                            return viewRoundSlot(field,provider);
                        } catch (e) {
                            return "";
                        }
                    })
                );
                for (let index = 0; index < arr.length; index++) {
                    data[index] = Object.assign({},data[index],{timeKey:arr[index]});
                    data[index] = {
                        rewardLastSubmiter:data[index]['rewardLastSubmiter'],
                        rewardAmount:data[index]['rewardAmount'],
                        rewardAccumulateAmount:data[index]['rewardAccumulateAmount'],
                        totalStaked:data[index]['totalStaked'],
                        stakedLowestWaterMark:data[index]['stakedLowestWaterMark'],
                        totalStakedInSlot:data[index]['totalStakedInSlot'],
                        stakedAddresses:data[index]['stakedAddresses'],
                        timeKey:arr[index]
                    } as DailyRecord;
                }
                if (records && records.length>0){
                    data = records.concat(data);
                }
                if (arr.length>0){
                    setAlreadyLoadedTime(arr[arr.length-1]);
                }
                setRecords(data);
            }catch(e){
                console.log(e);    
            }finally{
                setLoadingDailyRecord(false);
            }
        }

    },[provider,signer,farmInfo,recordLastLoadTime]);

    useAsyncEffect(async () => {
        setGetPriceLoading(true);
        try{
            const btcstPrice = await getBTCSTPrice();
            setBtcstPrice(btcstPrice);
        } finally {
            setGetPriceLoading(false);
        }
    }, [])


    useAsyncEffect(async()=>{
        setLoadingMiningStatList(true);
        if (provider && signer) {
            try{
                // let tmp = JSON.parse('[{"time": 1609027200000,"price": "26493.40","eachHaveCoin": "0.00000740","eachHaveUsdt": "0.19243450","eachHaveCny": "1.25886801"}]');
                // setDayMiningList(tmp);
                const fetched = await fetchBtcMiningStat();
                if (fetched.code ==0 && fetched.dayList){
                    setDayMiningList(fetched.dayList);
                }
            }finally{
                setLoadingMiningStatList(false);
            }
        }
    },[provider,signer]);
    //load total mined BTC in all
    useAsyncEffect(async()=>{
        if (provider && signer) {
            setLoadingTotalMined(true);
            const fetched = await fetchTotalMinedRTokenInpool(provider);
            try{
                setTotalMinedBTC(await fetched);
            }finally{
                setLoadingTotalMined(false);
            }
        }
    },[provider,signer]);
    //load total supply of stoken
    useAsyncEffect(async()=>{
        if (provider && signer) {
            setLoadingTotalStokenSupply(true);
            setLoadingTotalStokenLocked(true);
            const fetched = await totalSupplyOfSToken(provider);
            const locked = await getTotalRemainingSupplyLocked(provider);
            try{
                setTotalStokenSupply(await fetched);
                settotalStokenLocked(await locked);
            }finally{
                setLoadingTotalStokenSupply(false);
                setLoadingTotalStokenLocked(false);
            }
        }
    },[provider,signer]);

   //load daily records
    useAsyncEffect(async()=>{
        if (provider && signer) {
            setLoadingTotalStokenSupply(true);
            setLoadingTotalStokenLocked(true);
            const fetched = await totalSupplyOfSToken(provider);
            const locked = await getTotalRemainingSupplyLocked(provider);
            try{
                setTotalStokenSupply(await fetched);
                settotalStokenLocked(await locked);
            }finally{
                setLoadingTotalStokenSupply(false);
                setLoadingTotalStokenLocked(false);
            }
        }
    },[provider,signer]);

    //load current total staked btcst
    useAsyncEffect(async()=>{
        if (provider && signer ){
            setloadingBTCInpool(true);
            try{
                const rtokenContract = getContract("ERC20", BBTC, signer);
                setBtcInpool(await rtokenContract.balanceOf(BTCSTFarm)); 
            }finally{
                setloadingBTCInpool(false);
            }
        }
    },[provider,signer]);    
    useAsyncEffect(async()=>{
        if (provider && signer ){
            setLoadingTotalStaked(true);
            const fetched = await fetchCurrentTotalStakedSTokenInpool(provider);
            try{
                setTotalStakedBTCST(await fetched);
            }finally{
                setLoadingTotalStaked(false);
            }
        }
    },[provider,signer]);
    return {
        totalMinedBTC,
        loadingTotalMined,
        btcInpool,
        loadingBTCInpool,
        totalStokenSupply,
        loadingTotalStokenSupply,
        totalStokenLocked,
        loadingTotalStokenLocked,
        totalStakedBTCST,
        loadingTotalStaked,
        dayMiningList,
        loadingMiningStatList,
        yourMiningPower,
        loadingYourMiningPower,
        stoken,
        amount,
        setAmount,
        loadingDailyRecord,
        selectedRecord,
        setSelectedRecord,
        records,
        btcstPrice,
        getPriceLoading,
    };
};

export default useHistoryState;
