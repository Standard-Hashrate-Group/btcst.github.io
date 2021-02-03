import { ChainId, CurrencyAmount, Percent, Token as SDKToken, TokenAmount, WETH } from "@sushiswap/sdk";
import { ethers } from "ethers";
import { ETH } from "../constants/tokens";
import Token from "../types/Token";
import getContract from "./getContract";
import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { BigNumber, FixedNumber } from '@ethersproject/bignumber'

export const formatUSD = (value: number, maxFraction = 0) => {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: maxFraction
    });
    return formatter.format(value);
};

export const formatPercentage = (value: number, maxFraction = 2) => {
    const formatted = String(value * 100);
    if (maxFraction > 0) {
        const split = formatted.split(".");
        if (split.length > 1) {
            return split[0] + "." + split[1].substr(0, maxFraction);
        }
    }
    return formatted;
};

export const formatBalance = (value: ethers.BigNumberish, decimals = 18, maxFraction = 0) => {
    const formatted = ethers.utils.formatUnits(value, decimals);
    if (maxFraction > 0) {
        const split = formatted.split(".");
        if (split.length > 1) {
            return split[0] + "." + split[1].substr(0, maxFraction);
        }
    }
    return formatted;
};

export function formatApy(value: ethers.FixedNumber, price: ethers.FixedNumber) {
    const apr = Number(value.mulUnsafe(ethers.FixedNumber.from(365)).divUnsafe(price).toString());
    // const apy = (1+apr/365)^365-1;
    const apy = Math.pow((1+apr/365),365)-1;
    return formatPercentage(apy, 4);
}

export const parseBalance = (value: string, decimals = 18) => {
    return ethers.utils.parseUnits(value || "0", decimals);
};

export const isEmptyValue = (text: string) =>
    ethers.BigNumber.isBigNumber(text)
        ? ethers.BigNumber.from(text).isZero()
        : text === "" || text.replace(/0/g, "").replace(/\./, "") === "";

export const isETH = (token?: Token) => token?.address.toLowerCase() === ETH.address.toLowerCase();

export const isWETH = (token?: Token) => token?.address.toLowerCase() === WETH[1].address.toLowerCase();

export const isETHWETHPair = (fromToken?: Token, toToken?: Token) => {
    return (isETH(fromToken) && isWETH(toToken)) || (isWETH(fromToken) && isETH(toToken));
};

export const convertToken = (token: Token) => {
    return token.symbol === "ETH" ? WETH["1"] : new SDKToken(ChainId.MAINNET, token.address, token.decimals);
};

export const convertAmount = (token: Token, amount: string) => {
    return new TokenAmount(convertToken(token), parseBalance(amount, token.decimals).toString());
};

export const parseCurrencyAmount = (value: CurrencyAmount, decimals = 18) => {
    return ethers.BigNumber.from(parseBalance(value.toExact(), decimals));
};

export const deduct = (amount: ethers.BigNumber, percent: Percent) => {
    return amount.sub(amount.mul(percent.numerator.toString()).div(percent.denominator.toString()));
};

export const pow10 = (exp: ethers.BigNumberish) => {
    return ethers.BigNumber.from(10).pow(exp);
};

export const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US");
};

export const formatTimeKey = (value:ethers.BigNumber)=>{
    const date = new Date(value.toNumber() * 1000);
    return date.toLocaleDateString("zh-cn");
};
export const formatTimeKey2 = (value:number)=>{
    const date = new Date(value * 1000);
    return date.toLocaleDateString("zh-cn");
};
// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
    const parsed = isAddress(address)
    if (!parsed) {
      throw Error(`Invalid 'address' parameter '${address}'.`)
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}
  
  // add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
    return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
    return library.getSigner(account);
    // return library.getSigner(account).connectUnchecked();
}
  
  // account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
    return account ? getSigner(library, account) : library
}

export const calculateDailyReward = (hashrate: FixedNumber,dailyBtcPerHash:FixedNumber,btcPrice:FixedNumber)=>{
    const dailyEstimated = hashrate.mulUnsafe(dailyBtcPerHash);
    const powerPrice = FixedNumber.from(5846).divUnsafe(FixedNumber.from(1000*1000*100))
                    .mulUnsafe(FixedNumber.from(103)).divUnsafe(FixedNumber.from(100));
    const powerPerHashUnitDay = FixedNumber.from(60).mulUnsafe(FixedNumber.from(24));
    let   dailyBTCNetreward = dailyEstimated.subUnsafe(
            powerPerHashUnitDay.mulUnsafe(powerPrice).
                    mulUnsafe(hashrate).divUnsafe(btcPrice)
            );
    let  dailyEstimatedUSD = dailyBTCNetreward.mulUnsafe(btcPrice).round(6);
    dailyBTCNetreward = dailyBTCNetreward.round(6);
    return {btc:dailyBTCNetreward,usd:dailyEstimatedUSD};
}

export { getContract };
