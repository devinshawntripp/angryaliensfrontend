import { applyMiddleware } from '@reduxjs/toolkit'
import react, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Web3 from 'web3'
import config from '../config.json'
import { loadAppData } from '../store/slices/app-slice'





export const useWeb3 = () => {

    const [web3, setWeb3] = useState(null)
    const [account, setAccount] = useState(null)
    const [message, setMessage] = useState(null)
    const [networkId, setNetworkId] = useState(null)
    const [explorerURL, setExplorerURL] = useState('https://etherscan.io')
    const [openseaURL, setOpenseaURL] = useState('https://opensea.io')
    const dispatch = useDispatch();
    const app = useSelector((state) => state.app)
    const loadWeb3 = async () => {
        
    
    
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum)
            setWeb3(web3)
    
            const accounts = await web3.eth.getAccounts()
            // console.log(accounts)
    
            if (accounts.length > 0) {
                setAccount(accounts[0])
            } else {
                setMessage('Please connect with MetaMask')
            }
    
            var networkId = await web3.eth.net.getId()
            setNetworkId(networkId)
    
            if (networkId !== 5777) {
                setExplorerURL(config.NETWORKS[networkId].explorerURL)
                setOpenseaURL(config.NETWORKS[networkId].openseaURL)
            }
    
            // await loadBlockchainData(web3, accounts[0], networkId)
    
            window.ethereum.on('accountsChanged', function (accounts) {
                setAccount(accounts[0])
                setMessage(null)
            })
    
            window.ethereum.on('chainChanged', (chainId) => {
                // Handle the new chain.
                // Correctly handling chain changes can be complicated.
                // We recommend reloading the page unless you have good reason not to.
                // dispatch(loadAppData({...app, networkId: chainId}))
                setNetworkId(chainId)
                window.location.reload();
            })
        }
    
    
        
    };

    


    useEffect(() => {
        loadWeb3();
        console.log(networkId)
        const State = {
            loading: false,
            address: account,
            openseaURL: openseaURL,
            message: message, 
            networkId: networkId, 
            explorerURL: explorerURL,
            web3: web3
        }
    
        dispatch(loadAppData(State))
    },[account, networkId])


    

}