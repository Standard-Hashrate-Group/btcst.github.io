import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import { BigNumber, ethers } from "ethers";
import sushiData from "@sushiswap/sushi-data";
import useAsyncEffect from "use-async-effect";
import Fraction from "../constants/Fraction";
import { EthersContext } from "../context/EthersContext";
import Token from "../types/Token";
import LPTokenWithValue from "../types/LPTokenWithValue";
import { isWETH } from "../utils";
import { fetchLPTokenWithValue, fetchMyLPTokens, fetchMyPools } from "../utils/fetch-utils";
import useSDK from "./useSDK";
import { viewTotalClaimedRewardFrom,apiClaimAmountOfReward,stakeActions,viewTotalMinedRewardFrom,viewGetTotalRewardBalanceInPool} from "../utils/api-utils";
import { BTCST,BTCSTFarm,BBTC } from "../constants/contracts";
import { getContract, parseBalance } from "../utils";

export interface ClaimState {
    loading:boolean;
    rtoken?: Token;
    
    amount: string;
    setAmount: (amount: string) => void;

    yourTotalRToken:ethers.BigNumber;
    yourRTokenInpool:ethers.BigNumber;
    rtokenAllowed: boolean;
    setRTokenAllowed: (allowed: boolean) => void;
    
    onClaim: () => Promise<void>;
    entering: boolean;

    txHappend:number;
}

// tslint:disable-next-line:max-func-body-length
const useSTClaimState = () => {
    const { provider,signer, address, getTokenAllowance, tokens, updateTokens } = useContext(EthersContext);

    const [amount, setAmount] = useState("");
    const { enter, leave } = stakeActions();
    const [rtoken,setRToken] = useState<Token>();
    const [loading,setloading] = useState(true);
    const [rtokenAllowed, setRTokenAllowed] = useState(false);

    const [yourTotalRToken,setYourTotalRToken] = useState<ethers.BigNumber>();
    const [yourRTokenInpool,setYourRTokenInpool] = useState<ethers.BigNumber>();
    const [entering, setEntering] = useState(false);
    
    const [txHappend,setTxHappend] = useState<number>(0);

    useEffect(() => {
        setAmount("");
        setRToken(undefined);
        setloading(true);
        setYourTotalRToken(undefined);
        setTxHappend(0);
    }, [address]);
    useAsyncEffect(async()=>{
        if (provider && signer){
            try{
                const rtokenContract = getContract("ERC20", BBTC, signer);
                const rt:Token ={
                    name: await rtokenContract.name(),
                    address:BBTC,
                    decimals: await rtokenContract.decimals(),
                    symbol:await rtokenContract.symbol(),
                    logoURI:"",
                    balance:ethers.BigNumber.from(0)
                }; 
                setRToken(await rt);
            }finally{

            }
        }
    },[provider,signer]);

    useAsyncEffect(async()=>{
        if (provider && signer && rtoken) {
            setRTokenAllowed(false);
            setloading(true);
            try{
                const totalRewardBalInpool = await viewGetTotalRewardBalanceInPool(await signer.getAddress(),provider);
                // const allTimeMined = await viewTotalMinedRewardFrom(await signer.getAddress(),provider);
                const withdrawed = await viewTotalClaimedRewardFrom(await signer.getAddress(),provider);

                setRTokenAllowed(ethers.BigNumber.from(totalRewardBalInpool).gte(BigNumber.from(0)));
                setYourRTokenInpool(await totalRewardBalInpool);
                setYourTotalRToken((await withdrawed).add(await totalRewardBalInpool));
            }finally{
                setloading(false);
            }
        }
    },[provider,signer,rtoken,txHappend]);
    const onClaim = useCallback(async () => {
        if (provider && amount && rtoken && signer) {
            setEntering(true);
            try {
                const parsed = parseBalance(amount, rtoken.decimals);
                const tx = await apiClaimAmountOfReward(await signer.getAddress(),parsed,true,signer);
                if (tx) {
                    await tx.wait();
                    // await updateTokens();
                    setAmount("");
                    const txs = txHappend+1;
                    setTxHappend(txs);
                }
            } finally {
                setEntering(false);
            }
        }
    }, [provider,amount, rtoken, signer]);

    return {
        loading,
        amount,
        setAmount,
        rtoken,
        yourTotalRToken,
        yourRTokenInpool,
        rtokenAllowed,
        setRTokenAllowed,
        onClaim,
        entering,
        txHappend
    };
};

export default useSTClaimState;
