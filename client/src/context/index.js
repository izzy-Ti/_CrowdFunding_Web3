import React, { Children } from "react";
import { useContext, createContext } from "react";
import { useAddress, useContract, useMetaMask, useContractWrite } from "thirdweb";
import {ethers} from 'ethers'

const stateContext = createContext();

export const stateContextProvider = ({Children}) =>{
    const {contract} = useContract( '0xcf13ec03df554cdf126e6e24b66a9ee46034dbf6');
    const {mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign')
} 