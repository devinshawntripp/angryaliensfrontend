import react, {useEffect, useState} from 'react'
import {Row, Col, Spinner} from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify'









export default function Admin() {

    const app = useSelector((state) => state.app)
    const notify = () => toast("Wow so easy !");

    const [isSettingToken, setTokenForNode] = useState(false);
    const [isSettingNode, setNodeForToken] = useState(false);
    const [tokenAmount, setTokenAmount] = useState(0);
    const [ethAmount, setEthAmount] = useState(0);
    const [newNodePrice, setNewNodePrice] = useState(0);
    const [newReward, setNewReward] = useState(0);

    // const nodeManagerAddress = async () => {
    //     await app.nodeManager.methods
    // }

    useEffect(() => {

    }, []);

    const handleChange = (e) => {
        console.log(typeof parseInt(e.target.value))

        if(e.target.id === "Token"){
            setTokenAmount(e.target.value);
        }

        if(e.target.id === "Eth"){
            
            setEthAmount(e.target.value);
        }

        if(e.target.id === "NodePrice"){
            setNewNodePrice(e.target.value);
        }

        if(e.target.id === "rewardPerNode"){
            setNewReward(e.target.value);
        }

        console.log(newNodePrice);
    }


    const setAlienAddressToLock = async () => {
		if(app.alienLock && app.angryAliens && app.address) {

			await app.alienLock.methods.setAlienAddress(app.angryAliens._address).send({ from: app.address, value: 0 })
				.on('confirmation', async () => {
					// window.alert("THE ADRESS WAS SET")
				}).on('error', (error) => {
					window.alert(error)
					// setIsError(true)
				})
		}
	}


    const setNodeManagerTokenAddr = async () => {
        

        if(app.nodeManager && app.address && app.alienToken){
            setTokenForNode(true);

            await app.nodeManager.methods.setToken(app.alienToken._address).send({from: app.address, value: 0})
                .on('confirmation', async () => {
                    toast.success("Successfully Changed", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    
                }).on('error', (error) => {

                    window.alert(error);
                })

            setTokenForNode(false);
        }
    }

    const setNodeManAddrForToken = async () => {
        if(app.alienToken && app.address && app.nodeManager){
            setNodeForToken(true);

            await app.alienToken.methods.setNodeManagement(app.nodeManager._address).send({from: app.address, value: 0})
                .on('confirmation', async () => {
                    toast.success("Successfully Changed", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    
                }).on('error', (error) => {

                    window.alert(error);
                })

            setNodeForToken(false);
        }
    }


    const addLiquidity = async () => {
        if(app.alienToken && app.address && ethAmount !== 0 && tokenAmount !== 0){
            // setNodeForToken(true);

            await app.alienToken.methods.addLiquidity(tokenAmount,ethAmount).call({from: app.address, value: 0})
                .on('confirmation', async () => {
                    toast.success("Successfully Changed", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    
                }).on('error', (error) => {

                    window.alert(error);
                })

            // setNodeForToken(false);
        }
    }

    const changeNodePrice = async () => {
        if(app.alienToken && app.address && newNodePrice !== 0){
            // setNodeForToken(true);
            console.log("CALLING")

            await app.alienToken.methods.changeNodePrice(newNodePrice).send({from: app.address, value: 0})
                .on('confirmation', async () => {
                    toast.success("Successfully Changed", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    console.log("FINISHED")
                }).on('error', (error) => {

                    window.alert(error);
                })

            // setNodeForToken(false);
        }
    }


    const changeReward = async () => {
        if(app.alienToken && app.address && newReward !== 0){
            // setNodeForToken(true);
            console.log("CALLING")

            await app.alienToken.methods.changeRewardPerNode(newReward).send({from: app.address, value: 0})
                .on('confirmation', async () => {
                    toast.success("Successfully Changed", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    console.log("FINISHED")
                }).on('error', (error) => {

                    window.alert(error);
                })

            // setNodeForToken(false);
        }
    }

    const distributeRewards = async () => {
        if(app.alienToken && app.address) {


            await app.alienToken.methods.distributeRewards().send({from: app.address, value: 0})
                .on('confirmation', async () => {
                    console.log("FINISHED")
                }).on('error', (error) => {
                    window.alert(error)
                })
        }
    }

    return (
        <div>
            <main>
                <section id='welcome' className='welcome'>
                    <Row className='header my-3 p-3 mb-0 pb-0'>
                        <Col xs={12} md={12} lg={8} xxl={8}>
							<h1>Angry Aliens</h1>
							<p className='sub-header'>Availble on 04 / 10 / 22</p>
						</Col>
                    </Row>
                    <Row style={{ marginTop: "100px" }}>
						{app.alienLock && 
							<button onClick={setAlienAddressToLock} className='button mint-button mt-3'>Set Alien Addr</button>

						
						}
					</Row>
                    <Row style={{ marginTop: "100px" }}>
						{isSettingToken ? <Spinner animation="border" className='p-3 m-2' /> : app.nodeManager &&
							<button onClick={setNodeManagerTokenAddr} className='button mint-button mt-3'>Set Token for Node Manager</button>
						}
                        {/* <p>Token Address for Node Manager {}</p> */}
					</Row>
                    <Row style={{ marginTop: "100px" }}>
                    
						{isSettingNode ? <Spinner animation="border" className='p-3 m-2' /> : app.alienToken &&
							<button onClick={setNodeManAddrForToken} className='button mint-button mt-3'>Set Node Manager for Token</button>
						}
                        {/* <p>Token Address for Node Manager {}</p> */}
					</Row>
                    <Row style={{ marginTop: "100px" }}>
                        <Col className='' >
                                    
                                    
                                    <div className="input-group mb-1">
                                    
                                        <input onChange={handleChange} id="Token" type="number" className="form-control m-3" placeholder="Token" aria-label="Username" aria-describedby="basic-addon1" />
                                        <input onChange={handleChange} id="Eth" type="number" className="form-control m-3" placeholder="Eth" aria-label="Username" aria-describedby="basic-addon1" />
                                        { isSettingNode ? <Spinner animation="border" className='p-3 m-2' /> : <button type="button" class="btn btn-dark m-2" onClick={addLiquidity}>Add Liquidity</button> }
                                    </div>
                        </Col>

                        <Col className='' >
                                    
                                    
                                    <div className="input-group mb-1">
                                    
                                        <input onChange={handleChange} id="NodePrice" type="number" className="form-control m-3" placeholder="Node Price" aria-label="Username" aria-describedby="basic-addon1" />
                                        { isSettingNode ? <Spinner animation="border" className='p-3 m-2' /> : <button type="button" class="btn btn-dark m-2" onClick={changeNodePrice}>Change Node Price</button> }
                                    </div>
                        </Col>
					</Row>
                    <Row style={{ marginTop: "100px" }}>

                        <Col className='' >
                                    
                                    
                                    <div className="input-group mb-1">
                                    
                                        <input onChange={handleChange} id="rewardPerNode" type="number" className="form-control m-3" placeholder="Node Price" aria-label="Username" aria-describedby="basic-addon1" />
                                        { isSettingNode ? <Spinner animation="border" className='p-3 m-2' /> : <button type="button" class="btn btn-dark m-2" onClick={changeReward}>Change reward per Node</button> }
                                    </div>
                        </Col>
                        <Col className='' >
                                    
                                    
                                    <div className="input-group mb-1">
                                        { isSettingNode ? <Spinner animation="border" className='p-3 m-2' /> : <button type="button" class="btn btn-dark m-2" onClick={distributeRewards}>Distribute Rewards</button> }
                                    </div>
                        </Col>
					</Row>
                    {/* <ToastContainer theme="dark" /> */}
                </section>
            </main>
        </div>
    )
}