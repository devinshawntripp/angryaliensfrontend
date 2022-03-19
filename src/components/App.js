import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {useWeb3} from '../hooks/useWeb3'
import { useDispatch } from 'react-redux'


// Import ABI + Config
import AngryAliensNFTS from '../abis/AngryAliens.json'
import AlienLock from '../abis/AngryAliensLock.json'
import NodeManagment from '../abis/NODERewardManagement.json'
import AlienToken from '../abis/AlienToken.json'


import NewHome from './NewHome';
import Nodes from './Nodes';
import Navbar from './Navbar'
import Admin from '../views/Admin'
import Fight from '../views/Fight'


import { loadAppData } from '../store/slices/app-slice';
import { useSelector } from 'react-redux';
import Footer from './Footer'


function App() {
	useWeb3();

	const app = useSelector((state) => state.app)
	const dispatch = useDispatch();

	const [admin, setAdmin] = useState("");

	const web3Handler = async () => {
		if (app.web3) {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

			const newApp = {...app, address: accounts[0]}

			dispatch(loadAppData(newApp));

		}
	}

	const loadBlockchainData = async (_web3, _account, _networkId) => {
		// Fetch Contract, Data, etc.
		try {
			const angryAliensNFTS = new app.web3.eth.Contract(AngryAliensNFTS.abi, AngryAliensNFTS.networks[_networkId].address)
			const alienLock = new app.web3.eth.Contract(AlienLock.abi, AlienLock.networks[_networkId].address)


			const alienToken = new app.web3.eth.Contract(AlienToken.abi, AlienToken.networks[_networkId].address);
			const nodeRewardMan = new app.web3.eth.Contract(NodeManagment.abi, NodeManagment.networks[_networkId].address);
			// setOpenPunks(openPunks)
			// setAlienLock(alienLock)
			console.log("THE OWNER")
			console.log(await angryAliensNFTS.methods.owner().call())
			console.log("THE OWNER")
			setAdmin(await angryAliensNFTS.methods.owner().call())

			const maxSupply = await angryAliensNFTS.methods.maxSupply().call()
			const totalSupply = await angryAliensNFTS.methods.totalSupply().call()
            const supplyAvail = maxSupply - totalSupply
			// setSupplyAvailable(maxSupply - totalSupply)

			const allowMintingAfter = await angryAliensNFTS.methods.allowMintingAfter().call()
			const timeDeployed = await angryAliensNFTS.methods.timeDeployed().call()
            const revealTime = (Number(timeDeployed) + Number(allowMintingAfter)).toString() + '000'

			// setRevealTime((Number(timeDeployed) + Number(allowMintingAfter)).toString() + '000')
            var ownerOf = [];
            var lockOwned = [];
			if (_account) {
				ownerOf = await angryAliensNFTS.methods.walletOfOwner(_account).call()
				
				// setTokensOwned(await angryAliensNFTS.methods.walletOfOwner(_account).call())
				await angryAliensNFTS.methods.isApprovedForAll(_account, alienLock._address).call()
				// setLockApproved(isApproved);
				// setOwnerOf(ownerOf)

				
				// console.log(ownerOf)
			} else {
				// setOwnerOf([])
			}
            // openPunks: null,
            // alienLock: null,
            // supplyAvailable: null,
            // revealTime: null,
            // tokensOwned: [],
            // locksOwned: []

			if(alienLock && _account){
				lockOwned = await angryAliensNFTS.methods.walletOfOwner(alienLock._address).call();
			}

            dispatch(loadAppData({...app, 
                angryAliens: angryAliensNFTS, 
                alienLock: alienLock, 
                supplyAvailable: supplyAvail, 
                revealTime: revealTime, 
                tokensOwned: ownerOf, 
                locksOwned: lockOwned,
				nodeManager: nodeRewardMan,
				alienToken: alienToken
            }))

		} catch (error) {
            console.log(error)
            dispatch(loadAppData({...app, message: "Contract not deployed to current network, please change network in MetaMask", isError: true}))
            
			// setIsError(true)
		}
	}

	useEffect(() => {
		if(app.address && app.networkId){
			loadBlockchainData(app.web3, app.address, app.networkId)
		}
		console.log(admin)
	},[app.address, app.networkId])

	

	return (
			
			<BrowserRouter>
				<Navbar web3Handler={web3Handler} account={app.address} explorerURL={app.explorerURL} admin={admin} />
			
				<Routes>
					<Route exact path="/" element={<NewHome />} />
					<Route exact path="/Nodes" element={<Nodes />} />
					<Route exact path="/Fight" element={<Fight />} />
					<Route exact path="/Admin" element={<Admin />} />
					{/* <Route path="/Nodes">
						<Nodes />
					</Route> */}
				</Routes>
				
				<Footer />
			</BrowserRouter>
	)
}

export default App
