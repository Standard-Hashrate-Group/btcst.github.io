import { useContext, useEffect, useState } from "react";

import { ethers } from "ethers";
import sushiData from "@sushiswap/sushi-data";
import useAsyncEffect from "use-async-effect";
import Fraction from "../constants/Fraction";
import { EthersContext } from "../context/EthersContext";
import LPTokenWithValue from "../types/LPTokenWithValue";
import { isWETH } from "../utils";
import { fetchLPTokenWithValue, fetchMyLPTokens, fetchMyPools } from "../utils/fetch-utils";
import useSDK from "./useSDK";
import { viewUserInfo,totalSupplyOfSToken,fetchTotalMinedRTokenInpool, fetchCurrentTotalStakedSTokenInpool,viewTotalRewardInPoolFrom} from "../utils/api-utils";
import { getContract, parseBalance } from "../utils";
import { BTCST,BTCSTFarm,BBTC } from "../constants/contracts";
import MiningUserInfo from "../types/MiningUserInfo";
import MiningStakeRecord from "../types/MiningStakeRecord";

export interface MiningState {
    totalMinedBTC:ethers.BigNumber;
    loadingTotalMined:boolean;
    btcInpool:ethers.BigNumber;
    loadingBTCInpool:boolean;
    yourMiningPower:ethers.BigNumber;
    loadingYourMiningPower:boolean; 
    userInfo:MiningUserInfo;
    loadingUserInfo:boolean;
}

// tslint:disable-next-line:max-func-body-length
const useMiningState = () => {
    const { provider, signer, address, tokens } = useContext(EthersContext);

    const [totalMinedBTC,setTotalMinedBTC] = useState<ethers.BigNumber>();
    const [loadingTotalMined,setLoadingTotalMined] = useState(true);
    
    const [btcInpool,setBtcInpool] = useState<ethers.BigNumber>();
    const [loadingBTCInpool,setloadingBTCInpool] = useState(true);

    const [yourMiningPower,setYourMiningPower] = useState<ethers.BigNumber>();
    const [loadingYourMiningPower,setLoadingYourMiningPower] = useState(true);
    
    const [userInfo,setUserInfo] = useState<MiningUserInfo>();
    const [loadingUserInfo,setLoadingUserInfo] = useState(true);

    useEffect(() => {
        setTotalMinedBTC(undefined);
        setLoadingTotalMined(true);
        setBtcInpool(undefined);
        setloadingBTCInpool(true);
        setYourMiningPower(undefined);
        setLoadingYourMiningPower(true);
        setLoadingUserInfo(true);
    }, [address]);

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
            setLoadingYourMiningPower(true);
            setLoadingUserInfo(true);
            const userInfoInFarm = await viewUserInfo(await signer.getAddress(),provider);
            try{
                setYourMiningPower((await userInfoInFarm).amount);
                setUserInfo(await userInfoInFarm);
            }finally{
                setLoadingYourMiningPower(false);
                setLoadingUserInfo(false);
            }
        }
    },[provider,signer]);
    
    return {
        totalMinedBTC,
        loadingTotalMined,
        btcInpool,
        loadingBTCInpool,
        yourMiningPower,
        loadingYourMiningPower,
        userInfo,
        loadingUserInfo
    };
};

export default useMiningState;
