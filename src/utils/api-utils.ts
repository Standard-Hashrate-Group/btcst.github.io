import { FACTORY_ADDRESS as SUSHISWAP_FACTORY, Pair } from "@sushiswap/sdk";
import sushiData from "@sushiswap/sushi-data";
import { FACTORY_ADDRESS as UNISWAP_FACTORY } from "@uniswap/sdk";
import { ethers } from "ethers";

import Fraction from "../constants/Fraction";
import { ETH } from "../constants/tokens";
import { ALCHEMY_PROVIDER } from "../context/EthersContext";
import { Order, OrderStatus } from "../hooks/useSettlement";
import LPToken from "../types/LPToken";
import Token from "../types/Token";
import TokenWithValue from "../types/TokenWithValue";
import { useCallback } from "react";
import { BTCST,BTCSTFarm,BBTC } from "../constants/contracts";
import { logTransaction } from "../utils/analytics-utils";

import {
    convertToken,
    formatBalance,
    getContract,
    isETH,
    isWETH,
    parseBalance,
    parseCurrencyAmount,
    pow10
} from "./index";
export const fetchTotalMinedRTokenInpool = async (provider: ethers.providers.JsonRpcProvider)=>{
    const contract = getContract("IMiningFarm",BTCSTFarm,provider);
    const value = await contract.viewAllTimeTotalMined();
    return value;
};

export const fetchCurrentTotalStakedSTokenInpool = async (provider: ethers.providers.JsonRpcProvider)=>{
    const contract = getContract("IBEP20",BTCST,provider);
    const value = await contract.balanceOf(BTCSTFarm);
    return value;
};

export const viewTotalRewardInPoolFrom = async(account: string,provider: ethers.providers.JsonRpcProvider)=>{
    const contract = getContract("IMiningFarm",BTCSTFarm,provider);
    const value = await contract.viewTotalRewardInPoolFrom(account);
    return value;
    
};
export const totalSupplyOfSToken = async(provider: ethers.providers.JsonRpcProvider)=>{
    const contract = getContract("IBEP20",BTCST,provider);
    const value = await contract.totalSupply();
    return value;
};

export const viewTotalRewardInPool = async(provider: ethers.providers.JsonRpcProvider)=>{
    const contract = getContract("IMiningFarm",BTCSTFarm,provider);
    const value = await contract.viewTotalRewardInPool();
    return value;
};

export const getFreeToTransferAmount = async(account: string,provider: ethers.providers.JsonRpcProvider)=>{
    const contract = getContract("ISTokenERC20",BTCST,provider);
    const value = await contract.getFreeToTransferAmount(account);
    return value;
};

export const viewUserInfo = async(account: string,provider: ethers.providers.JsonRpcProvider)=>{
    const contract = getContract("IMiningFarm",BTCSTFarm,provider);
    const value = await contract.viewUserInfo(account);
    return value;
};

export const stakeActions = ()=>{
    const enter = useCallback(async (amount: ethers.BigNumber, signer: ethers.Signer) => {
        const farm = getContract("IMiningFarm", BTCSTFarm, signer);
        console.log("before gas limit:"+amount);
        const gasLimit = await farm.estimateGas.apiDepositToMining(amount);
        console.log(await gasLimit.toString()+" gas limit");
        const tx = await farm.apiDepositToMining(amount, {
            gasLimit: gasLimit.mul(120).div(100)
        });
        return logTransaction(tx, "stakeActions.enter()", amount.toString());
    }, []);

    const leave = useCallback(async (amount: ethers.BigNumber, signer: ethers.Signer) => {
        const farm = getContract("IMiningFarm", BTCSTFarm, signer);
        console.log("before gas limit:"+amount);
        const gasLimit = await farm.estimateGas.apiWithdrawLatestSToken(amount);
        console.log(await gasLimit.toString()+" gas limit");
        const tx = await farm.apiWithdrawLatestSToken(amount, {
            gasLimit: gasLimit.mul(120).div(100)
        });
        return logTransaction(tx, "stakeActions.leave()", amount.toString());
    }, []);

    return {
        enter,
        leave
    };
};

export const viewTotalMinedRewardFrom = async(account: string,provider: ethers.providers.JsonRpcProvider)=>{
    const contract = getContract("IMiningFarm",BTCSTFarm,provider);
    const value = await contract.viewTotalMinedRewardFrom(account);
    return value;
};
export const viewTotalClaimedRewardFrom = async(account: string,provider: ethers.providers.JsonRpcProvider)=>{
    const contract = getContract("IMiningFarm",BTCSTFarm,provider);
    const value = await contract.viewTotalClaimedRewardFrom(account);
    return value;
};
export const viewGetTotalRewardBalanceInPool = async(account: string,provider: ethers.providers.JsonRpcProvider)=>{
    const contract = getContract("IMiningFarm",BTCSTFarm,provider);
    const value = await contract.viewGetTotalRewardBalanceInPool(account);
    return value;
};

export const apiClaimAmountOfReward = async(account: string,amount: ethers.BigNumber,reCalculate :boolean ,signer: ethers.Signer)=>{
    const contract = getContract("IMiningFarm",BTCSTFarm,signer);
    const gasLimit = await contract.estimateGas.apiClaimAmountOfReward(account,amount,reCalculate);
    const tx = await contract.apiClaimAmountOfReward(account,amount,reCalculate, {
        gasLimit: gasLimit.mul(120).div(100)
    });
    return logTransaction(tx, "farmActions.apiClaimAmountOfReward()", amount.toString());
};