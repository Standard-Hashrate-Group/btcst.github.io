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

import { BTCST,BTCSTFarm,BBTC } from "../constants/contracts";
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
    console.log("fetchTotalMinedRTokenInpool");
    console.log(value);
    return value;
};

export const fetchCurrentTotalStakedSTokenInpool = async (provider: ethers.providers.JsonRpcProvider)=>{
    const contract = getContract("IBEP20",BTCST,provider);
    const value = await contract.balanceOf(BTCSTFarm);
    return value;
};