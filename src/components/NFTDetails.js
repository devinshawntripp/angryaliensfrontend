import React, {useState, useEffect, useContext} from 'react'
import {Col} from 'react-bootstrap'
import { SocketContext } from '../contexts/socket'
import axios from 'axios'



export default function NFTDetails({tokenId, imgURL, address}) {

    const [hovering, setHovering] = useState(false)
    const [nftData, setNftData] = useState({})
    const socket = useContext(SocketContext)

    const hoverNFT = {
        border: hovering ? "3px solid blue" : ""
    }

    const handleMouseOver = () => {
        setHovering(true);
    }

    const handleMouseLeave = () => {
        setHovering(false)
    }

    useEffect(() => {

        const getNfts = async () => {
            axios.get(`http://localhost:8174/api/nft/${tokenId}`).then((res) => {
                setNftData(res.data)
            })
        }
        getNfts();
        // const handler = (data) => {
        //     console.log(data)
        //     setNftData(data);
        // }

        // socket.emit('sendNftId', tokenId);

        // socket.on('getNftData', handler)

        // return () => {
        //     socket.off('getNftData')
        // }
    },[])


    return (
        <div onMouseOver={handleMouseOver} style={hoverNFT} onMouseLeave={handleMouseLeave}>
            <img 
                src={`${imgURL}${tokenId}.png`}
                alt="Angry Alien"
                className='nftsowned'
            />
            <ul style={{textAlign: "left", listStyle: "none"}}>
                <li>Owner: {address.slice(0, 5) + '...' + address.slice(38, 42)}</li>
                <li>Type: {nftData.type}</li>
                <li>Level: {nftData.level}</li>
                <li>Battles Won: {nftData.battlesWon}</li>
                <li>Battles Lost: {nftData.battlesLost}</li>
                <li>Rarity: {Math.round(nftData.rarity)}</li>
                <li>Rank: {nftData.rank}</li>

            </ul>
        </div>
        
        
    )


}