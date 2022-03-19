import react, {useEffect, useState} from 'react';
import { Row, Col, Card, Button, Container, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'

import '../App.css'

export default function Nodes() {

    const app = useSelector((state) => state.app)

    const [nodeName, setNodeName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [nodePrice, setNodePrice] = useState(0);
    const [userTotalNodes, setUserTotalNodes] = useState();
    const [totalNodes, setTotalNodes] = useState(0);
    const [nodeInfo, setNodeInfo] = useState([])
    const [rewardsAvail,setRewardsAvail] = useState(0)
    const [rewardPerNode, setRewPerNode] = useState(0);


    const handleChange = (e) => {
        e.preventDefault();
        setNodeName(e.target.value);
    }


    const handleCreateNode = async (e) => {
        e.preventDefault();


        if(app.alienToken && app.address && app.nodeManager && nodeName != ""){
            setIsLoading(true);

            await app.alienToken.methods.createNodeWithTokens(nodeName).send({from: app.address, value: 0})
                .on('confirmation', async () => {
                    toast.success("Successfully Changed", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    
                }).on('error', (error) => {

                    window.alert(error);
                })

                setIsLoading(false);
        }

    }

    const handleClaimRew = async (e) => {
        e.preventDefault();
        console.log("HELLKSLKFJLKDSFJLKJ ")


        if(app.alienToken && app.address && app.nodeManager){
            setIsLoading(true);

            await app.alienToken.methods.cashoutAll().send({from: app.address, value: 0})
                .on('confirmation', async () => {
                    toast.success("Successfully Claimed", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    
                }).on('error', (error) => {

                    window.alert(error);
                })

                setIsLoading(false);
        }

    }


    const getNodeInfo = async () => {
        if(app.alienToken && app.nodeManager && app.address){
            setNodePrice(await app.alienToken.methods.getNodePrice().call());


            setTotalNodes(await app.alienToken.methods.getTotalCreatedNodes().call())


            setUserTotalNodes(await app.alienToken.methods.getNodeNumberOf(app.address).call());

            const rewardsArr = (await app.alienToken.methods.getNodesRewards().call({from: app.address})).split("#")

            const rewardPerNode = (await app.alienToken.methods.getRewardPerNode().call());
            setRewPerNode(rewardPerNode/1000000000000000000)
            var totalRew = 0;
            rewardsArr.forEach(value => {
                totalRew += Number(value);
            })
            
            setRewardsAvail(totalRew);


            console.log("SLKDJFLKDSJFLKJ")
            console.log(await app.alienToken.methods.getNodesRewards().call({from: app.address}))



            const nodeNames = await app.alienToken.methods.getNodesNames().call({from: app.address})
            const nodeTimes = await app.alienToken.methods.getNodesCreatime().call({from: app.address})
            const nodeRewards = await app.alienToken.methods.getNodesRewards().call({from: app.address})
            const nameArr = nodeNames.split("#")
            const timeArr = nodeTimes.split("#")
            const rewArr = nodeRewards.split("#")
            var something = [{}]

            for(var index = 0; index < nameArr.length; index++){
                const some = {
                    name: nameArr[index],
                    time: timeArr[index],
                    reward: rewArr[index]
                }
                something.push(some);
            }
    
          
            something = something.filter((value) => value.name);

            setNodeInfo(something)
        }
    }

    useEffect(() => {
        getNodeInfo()



    }, [app.address, app.alienToken])


    return (
        <div>
            <section id='welcome' className='welcome'>
                <Row className='header nodesHeader my-4 p-3 mb-0 pb-0'>
                        <Col className='my-3 p-3 mb-0 pb-0 d-flex flex-column justify-content-center align-items-center' >
                            <h2>100 AA / Node</h2>
         
                        </Col>
                        <Col className='my-3 p-3 mb-0 pb-0 d-flex flex-column justify-content-center align-items-center'>
                            <h2>Total Created</h2>

                        </Col >
                        <Col className='my-3 p-3 mb-0 pb-0 d-flex flex-column justify-content-center align-items-center'>

                            <h2>Days Unclaimed</h2>
                            
  
                        </Col>
                </Row>
                {/* p-3 mb-0 pb-0 text-align-center d-flex flex-col justify-content-center align-items-center */}
                <Row className='header buttonHeader text-align-center p-3'>
                        <Col className='' >
                            <Card style={{ }} bg="secondary">
                                <Card.Body>
                                    
                                    {userTotalNodes}/100 Max Nodes
                                    <div className="input-group mb-1">
                                    
                                        <input onChange={handleChange} type="text" className="form-control m-3" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                                        { isLoading ? <Spinner animation="border" className='p-3 m-2' /> : <button type="button" class="btn btn-dark m-2" onClick={handleCreateNode}>Create Node</button> }
                                    </div>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className=''>
                            <Card style={{ }} bg="secondary">
                                <Card.Body>
                                    <Card.Text>{totalNodes} Total Nodes</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col >
                        <Col className=''>


                            
                            <Card style={{ }} bg="secondary">
                                <Card.Body>
                                    {rewardsAvail/1000000000000000000} AT
                                    <div className="input-group d-flex flex-row justify-content-center">
                                        {isLoading ? <Spinner animation="border" className="p-3 m-2" /> : <button type="button" class="btn btn-dark mt-3" onClick={handleClaimRew}>Claim All</button> }
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                </Row>

                <Row className='header nodesHeader my-4 p-3 mb-0 pb-0'>
                    <div className="onodes container">
                        <p>Node Price: {nodePrice/1000000000000000000} </p>
                        
                    
                        <h2 className="title text-center">My Nodes</h2>
                        {/* <div className="onodesInside"></div> */}
                            <div class="card bg-dark mb-1">
                            <div class="table-responsive">
                                <table class="table table-dark table-hover table-striped">
                                    {/* <div className="title text-center">My Nodes</div> */}
                                    <thead>
                                        <tr>
                                        <th scope="col">Node</th>
                                        <th scope="col">Date Created</th>
                                        <th scope="col">Reward Avail</th>
                                        <th scope="col">Reward Per Node</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                            {nodeInfo && nodeInfo.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{value.name}</th>
                                                        <td>{new Date(value.time*1000).toLocaleString()}</td>
                                                        <td>{value.reward/1000000000000000000}</td>
                                                        <td>{rewardPerNode}</td>
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </div>

                </Row>
            </section>
        </div>
    )
}