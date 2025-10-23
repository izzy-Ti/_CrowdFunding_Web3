import React, { Children } from "react";
import { useContext, createContext , ReactNode} from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react";
import {ethers} from 'ethers'

const StateContext = createContext({} as any);

interface Form {
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

export const StateContextProvider = ({Children}: any)=>{
    const {contract} = useContract( '0xcf13ec03df554cdf126e6e24b66a9ee46034dbf6');
    const {mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign');
    const address = useAddress()
    const connect = useMetamask()
    const publishCampaign = async (form: Form )=>{
        try{
            const data = await createCampaign({ args: [
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image,
            ]})
        } catch(err){
            console.log(`contract failer`, err)
        }
    }
    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                createCampaign: publishCampaign
            }}
        >
            {Children}
        </StateContext.Provider>
    )


} 

export const useStateContext = () => useContext(StateContext)