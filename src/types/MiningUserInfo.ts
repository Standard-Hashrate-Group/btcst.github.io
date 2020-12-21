import { ethers } from "ethers";
import MiningStakeRecord from "./MiningStakeRecord";

export default interface MiningUserInfo {
    amount:ethers.BigNumber;
    lockedAmount:ethers.BigNumber;
    lastUpdateRewardTime:ethers.BigNumber;
    allTimeMinedBalance:ethers.BigNumber;
    rewardBalanceInpool:ethers.BigNumber;
    stakeInfo:MiningStakeRecord[];
    stakedTimeIndex:ethers.BigNumber[];
}
