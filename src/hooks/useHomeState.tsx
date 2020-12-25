import { useContext, useEffect, useState } from "react";

import { ethers } from "ethers";
import useAsyncEffect from "use-async-effect";
import Fraction from "../constants/Fraction";
import { EthersContext } from "../context/EthersContext";
import LPTokenWithValue from "../types/LPTokenWithValue";
import { isWETH } from "../utils";
import useSDK from "./useSDK";
import { totalSupplyOfSToken,fetchTotalMinedRTokenInpool,
     fetchCurrentTotalStakedSTokenInpool,viewGetTotalRewardBalanceInPool} from "../utils/api-utils";

export interface HomeState {
    totalMinedBTC:ethers.BigNumber;
    totalStakedBTCST:ethers.BigNumber;
    yourBTCInpool:ethers.BigNumber;
    totalMiningPower:ethers.BigNumber;
    
    loadingTotalMined:boolean;
    loadingTotalStaked:boolean;
    loadingBTCInpool:boolean;
    loadingTotalMiningPower:boolean;

}

// tslint:disable-next-line:max-func-body-length
const useHomeState = () => {
    const { provider, signer, address, tokens } = useContext(EthersContext);
    
    const { getPair } = useSDK();

    const [loadingTotalMined,setLoadingTotalMined] = useState(true);
    const [totalMinedBTC,setTotalMinedBTC] = useState<ethers.BigNumber>();
    const [totalStakedBTCST,setTotalStakedBTCST] = useState<ethers.BigNumber>();
    const [loadingTotalStaked,setLoadingTotalStaked] = useState(true);
    const [yourBTCInpool,setYourBTCInpool] = useState<ethers.BigNumber>();
    const [loadingBTCInpool,setloadingBTCInpool] = useState(true);
    const [totalMiningPower,setTotalMiningPower] = useState<ethers.BigNumber>();
    const [loadingTotalMiningPower,setLoadingTotalMiningPower] = useState(true);
    

    useEffect(() => {
        setTotalMinedBTC(undefined);
        setTotalStakedBTCST(undefined);
        setYourBTCInpool(undefined);
        setTotalMiningPower(undefined);

        setLoadingTotalMined(true);
        setLoadingTotalStaked(true);
        setloadingBTCInpool(true);
        setLoadingTotalMiningPower(true);
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
            setLoadingTotalStaked(true);
            const fetched = await fetchCurrentTotalStakedSTokenInpool(provider);
            try{
                setTotalStakedBTCST(await fetched);
            }finally{
                setLoadingTotalStaked(false);
            }
        }
    },[provider,signer]);
    useAsyncEffect(async()=>{
        if (provider && signer ){
            setloadingBTCInpool(true);
            const fetched = await viewGetTotalRewardBalanceInPool(await signer.getAddress(),provider);
            try{
                setYourBTCInpool(await fetched);
            }finally{
                setloadingBTCInpool(false);
            }
        }
    },[provider,signer]);
    useAsyncEffect(async()=>{
        if (provider && signer ){
            setLoadingTotalMiningPower(true);
            const fetched = await totalSupplyOfSToken(provider);
            try{
                setTotalMiningPower(await fetched);
            }finally{
                setLoadingTotalMiningPower(false);
            }
        }
    },[provider,signer]);


    // Load Liquidity
    // useAsyncEffect(async () => {
    //     const weth = tokens.find(t => isWETH(t));
    //     if (provider && signer && weth && tokens && tokens.length > 0) {
    //         setLoadingLPTokens(true);
    //         const wethPriceUSD = Fraction.parse(String(await sushiData.weth.price()));
    //         const fetched = await fetchMyLPTokens(await signer.getAddress(), tokens, provider);
    //         try {
    //             setLPTokens(
    //                 await Promise.all(
    //                     fetched.map(lpToken => fetchLPTokenWithValue(lpToken, weth, wethPriceUSD, getPair, provider))
    //                 )
    //             );
    //         } finally {
    //             setLoadingLPTokens(false);
    //         }
    //     }
    // }, [getPair, provider, signer, tokens]);

    // Load Farming
    // useAsyncEffect(async () => {
    //     const weth = tokens.find(t => isWETH(t));
    //     if (provider && signer && weth && tokens && tokens.length > 0 && lpTokens) {
    //         setLoadingPools(true);
    //         const wethPriceUSD = Fraction.parse(String(await sushiData.weth.price()));
    //         const fetched = await fetchMyPools(await signer.getAddress(), tokens, provider);
    //         try {
    //             setPools(
    //                 await Promise.all(
    //                     fetched.map(lpToken => fetchLPTokenWithValue(lpToken, weth, wethPriceUSD, getPair, provider))
    //                 )
    //             );
    //         } finally {
    //             setLoadingPools(false);
    //         }
    //     }
    // }, [getPair, provider, signer, tokens, lpTokens]);

    return {
        totalMinedBTC,
        totalStakedBTCST,
        yourBTCInpool,
        totalMiningPower,
        loadingTotalMined
    };
};

export default useHomeState;
