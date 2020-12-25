import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import { ethers } from "ethers";
import sushiData from "@sushiswap/sushi-data";
import useAsyncEffect from "use-async-effect";
import Fraction from "../constants/Fraction";
import { EthersContext } from "../context/EthersContext";
import Token from "../types/Token";
import LPTokenWithValue from "../types/LPTokenWithValue";
import { isWETH } from "../utils";
import { fetchLPTokenWithValue, fetchMyLPTokens, fetchMyPools } from "../utils/fetch-utils";
import useSDK from "./useSDK";
import { viewUserInfo,getFreeToTransferAmount,totalSupplyOfSToken,stakeActions, fetchCurrentTotalStakedSTokenInpool,viewTotalRewardInPoolFrom} from "../utils/api-utils";
import { BTCST,BTCSTFarm,BBTC } from "../constants/contracts";
import { getContract, parseBalance } from "../utils";

export interface StakingState {
    loading:boolean;
    stoken?: Token;
    
    amount: string;
    setAmount: (amount: string) => void;

    yourTotalSToken:ethers.BigNumber;
    yourFreeToSendSToken:ethers.BigNumber;
    yourSTokenStaked:ethers.BigNumber;

    stokenAllowed: boolean;
    setSTokenAllowed: (allowed: boolean) => void;
    
    totalSTokenSupply:ethers.BigNumber;

    onEnter: () => Promise<void>;
    entering: boolean;
    onLeave: () => Promise<void>;
    leaving: boolean;

    txHappend:number;
}

// tslint:disable-next-line:max-func-body-length
const useSTStakingState = () => {
    const { provider,signer, address, getTokenAllowance, tokens, updateTokens } = useContext(EthersContext);

    const [amount, setAmount] = useState("");
    const { enter, leave } = stakeActions();
    const [stoken,setSToken] = useState<Token>();
    const [loading,setloading] = useState(true);
    const [stokenAllowed, setSTokenAllowed] = useState(false);

    const [yourTotalSToken,setYourTotalSToken] = useState<ethers.BigNumber>();
    const [yourFreeToSendSToken,setYourFreeToSendSToken] = useState<ethers.BigNumber>();
    const [yourSTokenStaked,setYourSTokenStaked] = useState<ethers.BigNumber>();
    const [totalSTokenSupply,setTotalSTokenSupply] = useState<ethers.BigNumber>();
    const [entering, setEntering] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [txHappend,setTxHappend] = useState<number>(0);

    const sToken :Token ={
        name: "Standard BTC Hashrate Token",
        address: BTCST,
        decimals: 18,
        symbol: "BTCST",
        logoURI: "",
        balance: ethers.BigNumber.from(0)
    };

    useEffect(() => {
        setAmount("");
        setSToken(sToken);
        setloading(true);
        setYourFreeToSendSToken(ethers.BigNumber.from(0));
        setYourSTokenStaked(ethers.BigNumber.from(0));
        setYourTotalSToken(ethers.BigNumber.from(0));
        setTxHappend(0);
    }, [address]);
    useAsyncEffect(async()=>{
        if (provider && signer && stoken) {
            setSTokenAllowed(false);
            setloading(true);
            try{
                const minAllowance = ethers.BigNumber.from(2)
                    .pow(96)
                    .sub(1);
                const stokenAllowance = await getTokenAllowance(stoken.address, BTCSTFarm);
                setSTokenAllowed(ethers.BigNumber.from(stokenAllowance).gte(minAllowance));
                const freeToMove = await getFreeToTransferAmount(await signer.getAddress(),provider);
                const userInfoInFarm = await viewUserInfo(await signer.getAddress(),provider);
                setYourFreeToSendSToken(await freeToMove);
                setYourSTokenStaked((await userInfoInFarm).amount);
                const stokenContract = getContract("ERC20", BTCST, signer);
                setYourTotalSToken(await stokenContract.balanceOf(signer.getAddress()));
                setTotalSTokenSupply(await totalSupplyOfSToken(provider));
            }finally{
                setloading(false);
            }
        }
    },[provider,signer,stoken,txHappend]);
    const onEnter = useCallback(async () => {
        if (amount && stoken && signer) {
            setEntering(true);
            try {
                const parsed = parseBalance(amount, stoken.decimals);
                console.log("before entering");
                const tx = await enter(parsed, signer);
                console.log("before wait");
                if (tx) {
                    await tx.wait();
                    // await updateTokens();
                    setAmount("");
                    const txs = txHappend+1;
                    setTxHappend(txs);
                    console.log("after wait");
                }
            } finally {
                setEntering(false);
            }
        }
    }, [amount, stoken, signer]);

    const onLeave = useCallback(async () => {
        if (amount && signer &&stoken) {
            setLeaving(true);
            try {
                const parsed = parseBalance(amount, stoken.decimals);
                const tx = await leave(parsed, signer);
                if (tx) {
                    await tx.wait();
                    // await updateTokens();
                    setAmount("");
                    const txs = txHappend+1;
                    setTxHappend(txs);
                }
            } finally {
                setLeaving(false);
            }
        }
    }, [amount, stoken, signer]);
    return {
        loading,
        amount,
        setAmount,
        stoken,
        yourTotalSToken,
        yourFreeToSendSToken,
        yourSTokenStaked,
        stokenAllowed,
        setSTokenAllowed,
        totalSTokenSupply,
        onEnter,
        entering,
        onLeave,
        leaving,
        txHappend
    };
};

export default useSTStakingState;
