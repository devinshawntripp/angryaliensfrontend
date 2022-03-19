const { default: Web3 } = require("web3");

require("dotenv").config();
// const OpenPunks = artifacts.require("AngryAliens")
const AlienLock = artifacts.require("AngryAliensLock")
const NODERewardManagement = artifacts.require("NODERewardManagement")
const AlienToken = artifacts.require("AlienToken")
const Context = artifacts.require("Context")
const Address = artifacts.require("Address")
const Ownable = artifacts.require("Ownable")
const IterableMapping = artifacts.require("IterableMapping")
const Router = artifacts.require("IUniswapV2Router02")

module.exports = async function (deployer) {

    const [admin,] = await web3.eth.getAccounts();

    const IPFS_IMAGE_METADATA_URI = `ipfs://${process.env.IPFS_IMAGE_METADATA_CID}/`
    const IPFS_HIDDEN_IMAGE_METADATA_URI = `ipfs://${process.env.IPFS_HIDDEN_IMAGE_METADATA_CID}/hidden.json`
    const NFT_MINT_DATE = new Date(process.env.NFT_MINT_DATE).getTime().toString().slice(0, 10)

    const router = await Router.at("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")
    const at = await AlienToken.at("0x79F45c8854247fc99ef7E842211605eB020aFb5b")
    console.log(at.uniswapV2Pair);


    // await deployer.deploy(
    //     OpenPunks,
    //     process.env.PROJECT_NAME,
    //     process.env.PROJECT_SYMBOL,
    //     process.env.MINT_COST,
    //     process.env.MAX_SUPPLY,
    //     NFT_MINT_DATE,
    //     IPFS_IMAGE_METADATA_URI,
    //     IPFS_HIDDEN_IMAGE_METADATA_URI,
    // )


    // await deployer.deploy(
    //     AlienLock
    // )

    // await deployer.deploy(IterableMapping)
    // await deployer.link(IterableMapping, NODERewardManagement)

    // await deployer.deploy(
    //     NODERewardManagement,
    //     100,
    //     1,
    //     80000
    // )


    // address[] memory payees,
    // uint256[] memory shares,
    // address[] memory addresses,
    // uint256[] memory balances,
    // uint256[] memory fees,
    // uint256 swapAmount,
    // address uniV2Router

    // await deployer.deploy(
    //     AlienToken,
    //     ["0xd8C0c13C05C022Cc602d520a32115975Cc3F8868"],
    //     [1],
    //     ["0xd8C0c13C05C022Cc602d520a32115975Cc3F8868","0x37756a5887D8660C22FaeBa0dfd5a23abF7d71dD","0x2B208dfc54E2A0f176bb90684576C3235a861c21"],
    //     [6818914, 6818914, 6818914],
    //     [20,20,20,20,20],
    //     1,
    //     "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
    // )
};