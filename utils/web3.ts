import { MetaMaskInpageProvider } from "@metamask/providers";
import { Web3 } from "web3";

declare global {
    interface Window {
      ethereum?: MetaMaskInpageProvider
    }
}

interface INetworks {
    name: string
    slug: string
}
interface ISupportedNetworks {
    [key: string]: INetworks
}

interface IConnectionResponseData {
    web3: Web3
    provider: string | undefined
    network: string | undefined
    networkSlug: string | undefined
    chainId: string | undefined
    account: string | undefined
}
interface IConnectionResponse {
    success: boolean
    message: string
    data: IConnectionResponseData
}

let connectionResponse: IConnectionResponse = {
    success: false,
    message: `Unknown connection error has been encountered.
    Please ensure MetaMask is installed.`,
    data: {
        web3: new Web3(),
        provider: undefined,
        network: undefined,
        networkSlug: undefined,
        chainId: undefined,
        account: undefined,
    },
}


{/**
    Function for initializing account

    If MetaMask is currently connected to an account,
    we provide the necessary details. This can be used
    by the Account state manager in a component.
*/}
export const initAccount = async () => {
    if (
        !window.ethereum
        || window.ethereum && !window.ethereum?.isMetaMask
    ) {
        connectionResponse.message = `Could not detect MetaMask. Please make sure it is installed.`
    }

    if (window.ethereum && window.ethereum?.isMetaMask) {
        try {
            let supportedNetworks: ISupportedNetworks = JSON.parse(`${process.env.NEXT_PUBLIC_SUPPORTED_NETWORKS}`)
            let web3 = new Web3(window.ethereum)
            let chainId = await web3.eth.getChainId()
            connectionResponse.success = true
            connectionResponse.data.web3 = web3
            connectionResponse.data.network = supportedNetworks[chainId.toString()]['name']
            connectionResponse.data.networkSlug = supportedNetworks[chainId.toString()]['slug']
            
            let address = await web3.eth.getAccounts()
            connectionResponse.data.account = address[0].toString()
            connectionResponse.message = `Connected to
            ${address[0].toString()} on ${connectionResponse.data.network}.`
        } catch (err) {
            console.log(err)
            connectionResponse.message = `${err}`
        }
    }

    return connectionResponse
}


{/**
    Function for connecting to MetaMask

    Since we only support the MetaMask wallet
    in this project, we perform appropriate checking.
    This function returns an object that contains
    data to be consumed for state management such as
    account detection, and toggling a modal for
    appropriate notifications.
*/}
export const connectWallet = async () => {
    if (
        !window.ethereum
        || window.ethereum && !window.ethereum?.isMetaMask
    ) {
        connectionResponse.message = `Could not detect MetaMask. Please make sure it is installed.`
    }

    if (window.ethereum && window.ethereum?.isMetaMask) {
        try {
            let supportedNetworks: ISupportedNetworks = JSON.parse(`${process.env.NEXT_PUBLIC_SUPPORTED_NETWORKS}`)
            let web3 = new Web3(window.ethereum)
            let chainId = await web3.eth.getChainId()
            connectionResponse.success = true
            connectionResponse.data.web3 = web3
            connectionResponse.data.network = supportedNetworks[chainId.toString()]['name']
            connectionResponse.data.networkSlug = supportedNetworks[chainId.toString()]['slug']
            
            await window.ethereum?.request({ method: 'eth_requestAccounts' });
            
            let address = await web3.eth.getAccounts()
            connectionResponse.data.account = address[0].toString()
            connectionResponse.message = `Connected to
            ${address[0].toString()} on ${connectionResponse.data.network}.`
        } catch (err) {
            console.log(err)
            connectionResponse.message = `${err}`
        }
    }

    return connectionResponse
}


{/**
    Function for grabbing changes to wallet

    Practically use the same business logic as
    the connectWallet() function, except that
    it takes 1 parameter which is the account address.

    We only perform necessary logic if the there is
    already an existing account.
*/}
export const walletChange = async (account: string) => {
  if (account) {
    if (
      !window.ethereum
      || window.ethereum && !window.ethereum?.isMetaMask
    ) {
      connectionResponse.message = `Could not detect MetaMask. Please make sure it is installed.`
    }

    try {
      let supportedNetworks: ISupportedNetworks = JSON.parse(`${process.env.NEXT_PUBLIC_SUPPORTED_NETWORKS}`)
      let web3 = new Web3(window.ethereum)
      let chainId = await web3.eth.getChainId()
      connectionResponse.success = true
      connectionResponse.data.web3 = web3
      connectionResponse.data.network = supportedNetworks[chainId.toString()]['name']
      connectionResponse.data.networkSlug = supportedNetworks[chainId.toString()]['slug']
      
      await window.ethereum?.request({ method: 'eth_requestAccounts' });
      
      let address = await web3.eth.getAccounts()
      connectionResponse.data.account = address[0].toString()
      connectionResponse.message = `Connected to
      ${address[0].toString()} on ${connectionResponse.data.network}.`
    } catch (err) {
      console.log(err)
      connectionResponse.message = `${err}`
    }

    return connectionResponse
  }

  return undefined
}