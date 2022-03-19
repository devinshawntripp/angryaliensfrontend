import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { setAll } from "../../helpers/set-all";



export const loadAccountDetails = createAsyncThunk("account/loadAccountDetails", async ({ networkID, provider, address }) => {

});


const initialState = {
    loading: true,
    address: "",
    openseaURL: "",
    message: "", 
    networkId: 0,
    explorerURL: "",
    web3: null,
    angryAliens: null,
    alienLock: null,
    supplyAvailable: 0,
    revealTime: 0,
    tokensOwned: [],
    lockOwned: [],
    isError: false,
    isMinting: false,
    nodeManager: null,
	alienToken: null
}



export const appSlice = createSlice({
    name: "appData",
    initialState,
    reducers: {
        loadAppData(state, action) {
            setAll(state, action.payload);
        }
    }
    // extraReducers: builder => {
    //     builder
    //         .addCase(loadAccountDetails.pending)
    // }

})

export const { loadAppData } = appSlice.actions;


export default appSlice.reducer;