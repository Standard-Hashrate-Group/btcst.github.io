import { ethers } from "ethers";

export default interface MiningStakeRecord {
    timeKey:ethers.BigNumber;
    amount:ethers.BigNumber;
    lockedAmount:ethers.BigNumber;
    withdrawed:ethers.BigNumber;
    lockedWithdrawed:ethers.BigNumber;
}