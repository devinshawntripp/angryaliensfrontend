import React, { useState, useEffect, useContext } from "react";
import { Col } from "react-bootstrap";
import { SocketContext } from "../contexts/socket";
import axios from "axios";
import { useSelector } from "react-redux";

export default function NFTDetails({ tokenId, imgURL, address, align }) {
  const app = useSelector((state) => state.app);
  const [owner, setOwner] = useState("");
  const [hovering, setHovering] = useState(false);
  const [nftData, setNftData] = useState({});
  const [findAddress, setFindAddr] = useState("");
  const socket = useContext(SocketContext);

  const hoverNFT = {
    border: hovering ? "3px solid blue" : "",
  };

  const handleMouseOver = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  useEffect(() => {
    const getNfts = async () => {
      await axios
        .get(`${process.env.REACT_APP_URL}/api/nft/${tokenId}`)
        .then((res) => {
          setNftData(res.data);
        });
      var own = await app.alienLock.methods.getAddressOfTokenId(tokenId).call();
      if (own === "0x0000000000000000000000000000000000000000") {
        console.log("The owner eqauls null");
        own = await app.angryAliens.methods.ownerOf(tokenId).call();
      }
      console.log("OWNER IS: ", own);

      setOwner(own);
    };
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
  }, []);

  return (
    <div
      onMouseOver={handleMouseOver}
      style={hoverNFT}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={`${imgURL}${tokenId}.png`}
        alt="Angry Alien"
        className="nftsowned"
      />
      <ul style={{ textAlign: align ? align : "left", listStyle: "none" }}>
        {/* <li>Owner: {address.slice(0, 5) + '...' + address.slice(38, 42)}</li> */}
        <li>Owner: {owner.slice(0, 5) + "..." + owner.slice(38, 42)}</li>
        <li>Type: {nftData.type}</li>
        <li>Level: {nftData.level}</li>
        <li>Battles Won: {nftData.battlesWon}</li>
        <li>Battles Lost: {nftData.battlesLost}</li>
        <li>Rarity: {Math.round(nftData.rarity)}</li>
        <li>Rank: {nftData.rank}</li>
      </ul>
    </div>
  );
}
