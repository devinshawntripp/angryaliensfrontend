import { Networks } from './blockchain';

const mainet = {

}

export const getAddresses = (networkID) => {
    if(networkID === Networks.rinkeby) return mainet;

    throw Error("We do not support this network");
}