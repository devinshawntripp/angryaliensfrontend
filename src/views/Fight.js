import React, {useState, useEffect, useContext} from 'react'
import {Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useHorizontalScroll } from '../hooks/useSideScroll';
import NFTDetails from '../components/NFTDetails';

import { SocketContext } from '../contexts/socket';
import { loadAppData } from '../store/slices/app-slice';






export default function Fight() {



    const [isError, setIsError] = useState(false)
    const [lockApproved, setLockApproved] = useState(false);
    const [nftTokenId, setNftTokenId] = useState(0);
    const [counter, setCounter] = useState(0);
    const [isCycling, setIsCycling] = useState(false);
    const [timer, setTimer] = useState(30);
    

    const [areanas, setAreanas] = useState([]);

    const dispatch = useDispatch();




    const app = useSelector((state) => state.app)
    const scrollRef = useHorizontalScroll();
    const scrollRefTwo = useHorizontalScroll();


    var tokenImageURI = `https://aliensnft.mypinata.cloud/ipfs/Qmcrwm55jLALriGzhGopo6tiZRGWekmdhmg2f41kJV4ag4/`;



    const socket = useContext(SocketContext)

    const handleNFTClick = async (e, tokenId) => {
        e.preventDefault();
		// console.log(parseInt(tokenId))
        setNftTokenId(parseInt(tokenId));
    }

    const handleChange = (event) => {
		setNftTokenId(event.target.value)
	}


    const handleFight = async (e, areanaId) => {
        e.preventDefault();
		socket.emit('fight', areanaId)
	}

    const approveToLockContract = async () => {
		if(app.alienLock && app.address) {
			await app.angryAliens.methods.setApprovalForAll(app.alienLock._address, true).send({ from: app.address, value: 0})
				.on('confirmation', async () => {
					const isApproved = await app.angryAliens.methods.isApprovedForAll(app.address, app.alienLock._address).call()
					setLockApproved(isApproved);

                    dispatch(loadAppData({...app, 
                        isApproved: isApproved
                    }))

                    //need to set dispatch app wide for approved address
				}).on('error', (error) => {
					window.alert(error)
					setIsError(true)
				})
		}
	}


    const putNftInAreana = async () => {
		if(app.locksOwned && app.address){
			if(!app.locksOwned.includes(nftTokenId.toString())){
				// console.log(lockOwned)
				// console.log(nftTokenId)
				window.alert("Nft is not in the lock contract")
			} else {
                var own = await app.alienLock.methods.getAddressOfTokenId(nftTokenId).call()
                if(String(app.address).localeCompare(String(own)) != 0){
                    window.alert("YOU DO NOT OWN THIS NFT")
                } else {
                    const data = {areanaId: 1, tokenId: nftTokenId, owner: own}
                    socket.emit('sendNftToAreana', (data))
                }
				
			}
		}
		

	}


    const transferToContract = async () => {
		if(app.alienLock && app.address) {
			setIsError(false);



			await app.alienLock.methods.transferNftToContract(nftTokenId).send({ from: app.address, value: 0 })
				.on('confirmation', async () => {
					// const maxSupply = await openPunks.methods.maxSupply().call()
					// const totalSupply = await openPunks.methods.totalSupply().call()
					// setSupplyAvailable(maxSupply - totalSupply)

					const ownerOf = await app.angryAliens.methods.walletOfOwner(app.address).call()
                    var lockOwned = []
        
                    
        
					// setOwnerOf(ownerOf)
					// setTokensOwned(await app.angryAliens.methods.walletOfOwner(account).call())
					if(app.alienLock && app.address){
						// setLockOwned(await app.angryAliens.methods.walletOfOwner(alienLock._address).call());
                        lockOwned = await app.angryAliensNFTS.methods.walletOfOwner(app.alienLock._address).call();
					}


                    dispatch(loadAppData({...app, 
                        tokensOwned: ownerOf, 
                        locksOwned: lockOwned
                    }))
				})
				.on('error', (error) => {
					window.alert(error)
					setIsError(true)
				})
		}


	}


    const transferBackFromLock = async () => {
		if(app.alienLock && app.address) {
			await app.alienLock.methods.transferBackToOwner(nftTokenId).send({ from: app.address, value: 0 })
			.on('confirmation', async () => {

				// setTokensOwned(await app.angryAliens.methods.walletOfOwner(app.address).call())
				// if(app.alienLock && app.address){
				// 	setLockOwned(await app.angryAliens.methods.walletOfOwner(alienLock._address).call());
				// }
			})
			.on('error', (error) => {
				window.alert(error)
				setIsError(true)
			})
		}
	}

    // const getLockOwned = async () => {
    //     console.log(app)
    //     if(app.alienLock && app.address){
    //         const isApproved = await app.angryAliensNFTS.methods.isApprovedForAll(app.address, app.alienLock._address).call()
    //         const lockOwned = await app.angryAliensNFTS.methods.walletOfOwner(app.alienLock._address).call();
    //         console.log("Lock Owned fight.js: ", lockOwned)
    //     }
    // }

    // useEffect(() => {

    //     getLockOwned();

        

    // }, [app.address, app.networkId, app.lockOwned, app.alienLock])

    useEffect(() => {

        

		


		const handlr = (data) => {
			console.log(data)
			setAreanas(data.areanas);
		}

		socket.on('areanas', handlr)

	}, [socket])


    useEffect(() => {
        const handlr = (data) => {
            console.log(data)
            setTimer(data);
            if(data === 0){
                socket.emit('fight', 0)
            }
        }


        socket.on('timerTick', handlr)


    }, [])



    const cycleImages = async () => {
		const getRandomNumber = () => {
			const counter = (Math.floor(Math.random() * 6000)) + 1
			setCounter(counter)
		}

		if (!isCycling) { setInterval(getRandomNumber, 500) }
		setIsCycling(true)
	}

    useEffect(() => {
        
        cycleImages()
    }, [])

    return (
        <div>
            <main>
                <section id='welcome' className='welcome'>
				
					
                    <Row style={{ justifyContent: "center", alignItems: "center", marginTop: "100px" }}>
                        <h2 style={{ textAlign: "center"}}>NFTS YOU OWN</h2>
                        <Col ref={scrollRef} className="nfts">
                            {app.tokensOwned &&
                                app.tokensOwned.map((token, id) => {
                                     return <div onClick={(e) => handleNFTClick(e, token)}>
                                        <NFTDetails tokenId={token} imgURL={tokenImageURI} address={app.address} />
                                     </div>
                                })
                                
                            }
                        </Col>
                    </Row>
                    <Row className='flex m-3'>
                        <Col md={5} lg={4} xl={5} xxl={4} style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                            {isError ? (
                                <p>{app.message}</p>
                            ) : (
                                <div>


                                    {/* {isMinting ? (
                                        <Spinner animation="border" className='p-3 m-2' />
                                    ) : ( */}
                                        <>
                                        
                                            { app.isApproved && <h2 value={nftTokenId} onChange={handleChange}>Token ID: {nftTokenId} Selected</h2> }
                                            { !app.isApproved ?
                                            <button style={{marginLeft: "20px"}} onClick={approveToLockContract} className='button mint-button mt-3'>Approve</button>
                                            : <button style={{marginLeft: "20px"}}  onClick={transferToContract} className='button mint-button mt-3'>Transfer To Contract</button>
                                            }
                                            <button style={{marginLeft: "20px"}} onClick={transferBackFromLock} className='button mint-button mt-3'>Withdraw NFT</button>
                                        </>
                                    {/* )} */}

                                </div>
                            )}
                        </Col>
                    </Row>
                    <Row style={{ justifyContent: "center", alignItems: "center", marginTop: "100px" }}>
                        <h2 style={{ textAlign: "center"}}>NFTS READY FOR BATTLE</h2>
                        <Col ref={scrollRefTwo} className="nfts">
                            {app.locksOwned && app.locksOwned.length !== 0 &&
                                app.locksOwned.map(token => {
                                    
                                    return <div onClick={(e) => handleNFTClick(e, token)}>
                                        <NFTDetails tokenId={token} imgURL={tokenImageURI} address={app.alienLock._address} />
                                    </div>
                                })
                                
                            }
                        </Col>
                    </Row>

                    <Row style={{textAlign: "center"}}>
                        <h1>BATTLE AREANA</h1>
                    </Row>

                    {areanas && app.alienLock ? areanas.map(areana => {
                        console.log(areanas)
                        console.log(areana.nftTokenIdOne)
                        return areana ? 
                            <>
                                <Row style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: "100px", marginBottom: "300px"}}>
                                    <Col>
                                        {areana.nftTokenIdOne !== 0 ? 
                                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                <div style={{width: "fit-content"}}>
                                                    <NFTDetails tokenId={areana.nftTokenIdOne} imgURL={tokenImageURI} address={app.alienLock._address} />
                                                </div>
                                            </div> 
                                            : 
                                            <button style={{marginLeft: "20px"}} onClick={putNftInAreana} className='button mint-button mt-3'>Select And Join</button>
                                        }
                                    </Col>
                                        {/* {areana.nftTokenIdOne !== 0 && areana.nftTokenIdTwo !== 0 && <Col style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "100px", marginBottom: "300px"}}><button onClick={(e) => handleFight(e,areana.areanaId)} className='button mint-button mt-3'>Fight</button></Col>} */}

                                        {areana.nftTokenIdOne !== 0 && <Col style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "100px", marginBottom: "300px"}}>Fighting In: {timer}</Col>}
                                    <Col>
                                        
                                         
                                        {areana.nftTokenIdTwo !== 0 ? 
                                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <div style={{width: "fit-content"}}>
                                                <NFTDetails tokenId={areana.nftTokenIdTwo} imgURL={tokenImageURI} address={app.alienLock._address} />
                                                </div>
                                                </div> : String(app.address).localeCompare(String(areana.nftTokenOneOwner)) == 0 ? 
                                                <img
                                                    src={`https://aliensnft.mypinata.cloud/ipfs/Qmcrwm55jLALriGzhGopo6tiZRGWekmdhmg2f41kJV4ag4/${counter}.png`}
                                                    alt="Angry Aliens"
                                                    className='showcase'
                                                /> 
                                                
                                                :

                                                <button style={{marginLeft: "20px"}} onClick={putNftInAreana} className='button mint-button mt-3'>Select And Join</button>}
                                    </Col>
                                </Row>
                            </>

                            
                        : <div>no data</div>
                    }) : <div>no data</div>}
                    

                    <Row style={{ marginTop: "100px" }}>
                        <Col>
                            {app.angryAliens &&
                                <a
                                    href={`${app.explorerURL}/address/${app.angryAliens._address}`}
                                    target='_blank'
                                    className='text-center'>
                                    {app.angryAliens && app.angryAliens._address}
                                </a>
                            }
                        </Col>
                        <Col>
                            {app.alienLock && 
                                <a
                                    href={`${app.explorerURL}/address/${app.alienLock._address}`}	
                                    target='_blank'
                                    className="text-center">
                                        AlienLockAddr: {app.alienLock._address}
                                        {/* 0xacbB594D230672155235b6414162c0aa33967C4c */}
                                    </a>					
                            }
                        </Col>
                    </Row>


                </section>
            </main>
        </div>
    )
}