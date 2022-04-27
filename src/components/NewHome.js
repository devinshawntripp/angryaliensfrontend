import react, { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Countdown from "react-countdown";
import { useHorizontalScroll } from "../hooks/useSideScroll";
import NFTDetails from "./NFTDetails";

import { loadAppData } from "../store/slices/app-slice";

// Import Images + CSS
import twitter from "../images/socials/twitter.svg";
import instagram from "../images/socials/instagram.svg";
import opensea from "../images/socials/opensea.svg";
import showcase from "../images/showcase.jpg";
import "../App.css";

// Import ABI + Config
import config from "../config.json";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function NewHome() {
  const [counter, setCounter] = useState(7);
  const [isCycling, setIsCycling] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  const [isMinting, setIsMinting] = useState(false);

  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const cycleImages = async () => {
    const getRandomNumber = () => {
      const counter = Math.floor(Math.random() * 6000) + 1;
      setCounter(counter);
    };

    if (!isCycling) {
      setInterval(getRandomNumber, 3000);
    }
    setIsCycling(true);
  };

  useEffect(() => {
    cycleImages();
  }, []);

  const mintNFTHandler = async () => {
    if (app.revealTime > new Date().getTime()) {
      window.alert("Minting is not live yet!");
      return;
    }

    if (app.tokensOwned.length > 10) {
      window.alert("You've already minted!");
      return;
    }

    // Mint NFT
    if (app.angryAliens && app.address) {
      setIsMinting(true);
      // setIsError(false)

      await app.angryAliens.methods
        .mint(1)
        .send({ from: app.address, value: 60000000000000000 })
        .on("confirmation", async () => {
          const maxSupply = await app.angryAliens.methods.maxSupply().call();
          const totalSupply = await app.angryAliens.methods
            .totalSupply()
            .call();
          // setSupplyAvailable(maxSupply - totalSupply)

          const ownerOf = await app.angryAliens.methods
            .walletOfOwner(app.address)
            .call();
          // setOwnerOf(ownerOf)
          // setTokensOwned(await angryAliens.methods.walletOfOwner(account).call())
          dispatch(
            loadAppData({
              ...app,
              supplyAvailable: maxSupply - totalSupply,
              tokensOwned: ownerOf,
            })
          );
        })
        .on("error", (error) => {
          window.alert(error);
          // setIsError(true)
        });
    }

    setIsMinting(false);
  };

  const scrollRef = useHorizontalScroll();

  var tokenImageURI = `https://aliensnft.mypinata.cloud/ipfs/Qmcrwm55jLALriGzhGopo6tiZRGWekmdhmg2f41kJV4ag4/`;

  return (
    <div>
      <main>
        <section id="welcome" className="welcome">
          <Row className="header my-3 p-3 mb-0 pb-0">
            <Col xs={12} md={12} lg={8} xxl={8}>
              <h1>Angry Aliens</h1>
              <p className="sub-header">Availble on 04 / 10 / 22</p>
            </Col>
            <Col className="flex social-icons">
              <a
                href="https://twitter.com/AngryAliensproj"
                target="_blank"
                className="circle flex button"
              >
                <img src={twitter} alt="Twitter" />
              </a>
              <a href="#" target="_blank" className="circle flex button">
                <img src={instagram} alt="Instagram" />
              </a>
              <a
                href={`${app.openseaURL}/collection/${config.PROJECT_NAME}`}
                target="_blank"
                className="circle flex button"
              >
                <img src={opensea} alt="Opensea" />
              </a>
            </Col>
          </Row>

          <Row className="flex m-3">
            <Col md={5} lg={4} xl={5} xxl={4} className="text-center">
              <img
                src={`https://aliensnft.mypinata.cloud/ipfs/Qmcrwm55jLALriGzhGopo6tiZRGWekmdhmg2f41kJV4ag4/${counter}.png`}
                alt="Angry Aliens"
                className="showcase"
              />
            </Col>
            <Col md={5} lg={4} xl={5} xxl={4}>
              {app.revealTime !== 0 && (
                <Countdown
                  date={currentTime + (app.revealTime - currentTime)}
                  className="countdown mx-3"
                />
              )}
              <p className="text">
                Angry Aliens is a project with multiple utilities that will be
                mostly community directed. That is all soley coded by yours
                truly -MOJE BAKE SAKETORO
              </p>
              <a href="#about" className="button mx-3">
                Learn More!
              </a>
            </Col>
          </Row>
        </section>
        <section id="about" className="about">
          <Row className="flex m-3">
            <h2 className="text-center p-3">About the Collection</h2>
            <Col md={5} lg={4} xl={5} xxl={4} className="text-center">
              <img
                src={showcase}
                alt="Multiple Angry Aliens"
                className="showcase"
              />
            </Col>
            <Col md={5} lg={4} xl={5} xxl={4}>
              {app.isError ? (
                <p>{app.message}</p>
              ) : (
                <div>
                  <h3>Mint your NFT in</h3>
                  {app.revealTime !== 0 && (
                    <Countdown
                      date={currentTime + (app.revealTime - currentTime)}
                      className="countdown"
                    />
                  )}
                  <ul>
                    <li>10,000 generated images using an art generator</li>
                    <li>
                      Free minting on Rinkeby testnet/ Actual chain tbd by
                      community vote most likely cronos
                    </li>
                    <li>Viewable on Opensea/Ebuisbay shortly after minting</li>
                  </ul>

                  {isMinting ? (
                    <Spinner animation="border" className="p-3 m-2" />
                  ) : (
                    <button
                      onClick={mintNFTHandler}
                      className="button mint-button mt-3"
                    >
                      Mint
                    </button>
                  )}

                  {app.tokensOwned.length > 0 && (
                    <p>
                      <small>
                        View your NFT on
                        <a
                          href={`${app.openseaURL}/assets/${app.angryAliens._address}/${app.tokensOwned[0]}`}
                          target="_blank"
                          style={{ display: "inline-block", marginLeft: "3px" }}
                        >
                          OpenSea
                        </a>
                      </small>
                    </p>
                  )}
                </div>
              )}
            </Col>
          </Row>

          <Row style={{ marginTop: "100px" }}>
            <Col>
              {app.angryAliens && (
                <a
                  href={`${app.explorerURL}/address/${app.angryAliens._address}`}
                  target="_blank"
                  className="text-center"
                >
                  {app.angryAliens._address}
                </a>
              )}
            </Col>
          </Row>
        </section>

        <section id="about" className="about">
          <Row
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "100px",
            }}
          >
            <h2 style={{ textAlign: "center" }}>NFTS YOU OWN</h2>
            <Col ref={scrollRef} className="nfts">
              {app.tokensOwned &&
                app.tokensOwned.map((token, id) => {
                  // return <div onClick={(e) => handleNFTClick(e, token)}>
                  return (
                    <NFTDetails
                      tokenId={token}
                      imgURL={tokenImageURI}
                      address={app.address}
                    />
                  );
                  // </div>
                })}
            </Col>
          </Row>
        </section>
      </main>
    </div>
  );
}
