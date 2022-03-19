
const Router = artifacts.require("IUniswapV2Router02")
const AlienToken = artifacts.require("AlienToken")
const Factory = artifacts.require("IJoeFactory")
const IUniswapV2Pair = artifacts.require("IUniswapV2Pair");
const IERC20 = artifacts.require("IERC20")
const UniswapV2Library = artifacts.require("UniswapV2Library");










module.exports = async done => {

    try {
        const [admin, _] = await web3.eth.getAccounts();

        const router = await Router.at("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")
        // const at = await AlienToken.at("0x79F45c8854247fc99ef7E842211605eB020aFb5b")
        const alienToken = await IERC20.at("0x79F45c8854247fc99ef7E842211605eB020aFb5b")
        const integToken = await IERC20.at("0x29D374bE639B6b54758F3430BF1Bc933209d038c");
        

        const facAddress = await router.factory();
        // console.log(facAddress)
        const factory = await Factory.at(facAddress)
        const weth = await router.WETH();

        // const integPairAddr = await factory.createPair.call(integToken.address, alienToken.address);
        // const tx = await factory.createPair(integToken.address, alienToken.address);
        const pairAddr = await factory.getPair(alienToken.address, weth)

        const thePair = await IUniswapV2Pair.at(pairAddr)

        const wethToken = await IERC20.at(weth)
        
        const linkToken = await IERC20.at("0x01BE23585060835E02B77ef475b0Cc51aA1e0709");

        // var reserveA;
        // var reserveB;
        // reserveA = await UniswapV2Library.getReserves(factory, alienToken.address, wethToken.address);

        // console.log("Reserve A: ", reserveA);
        // console.log("Reserve B: ", reserveB);

        

        // const integPairAddr = await factory.createPair.call(integToken.address, weth);
        // const tx = await factory.createPair(integToken.address, weth);
        // const integPairAddr = await factory.getPair(integToken.address, weth);
        // const integPair = await IUniswapV2Pair.at(integPairAddr)



        console.log("ROUTER ADDR: ", router.address)
    

        await alienToken.approve(router.address, 1000);
        await wethToken.approve(router.address, 1);
        // await thePair.approve(router.address, 10000);
        // await integToken.approve(router.address, 10);
        // await integPair.approve(router.address, 1)
        // linkToken.approve(router.address, 1);

        // at.setSwapAndLiquifyEnabled(true);



        // await router.addLiquidity(
        //     alienToken.address,
        //     integToken.address,
        //     1000,
        //     10,
        //     0,
        //     0,
        //     admin,
        //     Math.floor(Date.now() / 1000) + 60 * 10
        // );

        const balance = await thePair.balanceOf(admin);
        const reserves = await thePair.getReserves()
        console.log(balance.toString())
        console.log(reserves)



        // console.log(factory.getPair(at.address, router.WETH()))
    } catch(e) {
        console.log(e)
    }

    





}