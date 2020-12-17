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
import { fetchTotalMinedRTokenInpool, fetchCurrentTotalStakedSTokenInpool} from "../utils/api-utils";

export interface HomeState {
    totalMinedBTC:Number;
    totalStakedBTCST:Number;
    yourBTCInpool:Number;
    totalMiningPower:Number;
    loadingTotalMined:boolean;

    loadingLPTokens: boolean;
    loadingPools: boolean;
    lpTokens?: LPTokenWithValue[];
    pools?: LPTokenWithValue[];
}

// tslint:disable-next-line:max-func-body-length
const useHomeState = () => {
    const { provider, signer, address, tokens } = useContext(EthersContext);
    
    const [lpTokens, setLPTokens] = useState<LPTokenWithValue[]>();
    const [pools, setPools] = useState<LPTokenWithValue[]>();
    const [loadingLPTokens, setLoadingLPTokens] = useState(true);
    const [loadingPools, setLoadingPools] = useState(true);
    
    const { getPair } = useSDK();

    const [loadingTotalMined,setLoadingTotalMined] = useState(true);
    const [totalMinedBTC,setTotalMinedBTC] = useState<Number>();
    const [totalStakedBTCST,setTotalStakedBTCST] = useState<Number>();
    const [yourBTCInpool,setYourBTCInpool] = useState<Number>();
    const [totalMiningPower,setTotalMiningPower] = useState<Number>();

    useEffect(() => {
        setLPTokens(undefined);
        setPools(undefined);
        setLoadingLPTokens(true);
        setLoadingPools(true);
        setTotalMinedBTC(0);
        setTotalStakedBTCST(0);
        setYourBTCInpool(0);
        setTotalMiningPower(0);

        setLoadingTotalMined(true);        
    }, [address]);

    //load total mined BTC in all
    useAsyncEffect(async()=>{
        // const weth = tokens.find(t => isWETH(t));
        console.log("before check-----");
        if (provider && signer ) {
            
            setLoadingTotalMined(true);
            const fetched = await fetchTotalMinedRTokenInpool(provider);
            try{
                console.log("before passed-----");
                console.log(fetched);
                setTotalMinedBTC(fetched);
            }finally{
                setLoadingTotalMined(false);
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
        loadingTotalMined,

        loadingLPTokens,
        loadingPools,
        tokens,
        lpTokens,
        pools
    };
};

export default useHomeState;
