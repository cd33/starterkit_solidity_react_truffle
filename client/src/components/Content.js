import React from "react";
import dai from '../dai.png';
import * as s from "../globalStyles";

const Content = ({ web3, bibscoinBalance, mintBibscoin }) => (
    <s.Container style={{ backgroundColor: 'white', borderRadius: 20, width: "30%", padding: 20, alignItems: 'center' }}>
        <s.TextTitle>Bibscoin</s.TextTitle>
        { bibscoinBalance <= 0 ?
            <s.Button onClick={mintBibscoin} primary>Mint Bibscoin</s.Button>
        :
            <s.Container fd="row" ai="center" style={{width:"auto"}}>
                <img src={dai} height='35' alt="" style={{ marginRight: 5 }} />
                {/* <s.Input placeholder="Amount of BIBS" type="text" ref={val => setBibscoinInput(val)} /> */}
                <s.TextSubTitle>Available: {web3 && web3.utils.fromWei(bibscoinBalance, 'Ether')}</s.TextSubTitle>
                <s.Button onClick={mintBibscoin} primary>Mint Bibscoin</s.Button>
            </s.Container>
        }
    </s.Container>
);

export default Content;