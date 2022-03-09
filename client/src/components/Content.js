import React from 'react'
import dai from '../dai.png'
import * as s from '../styles/Global.styles'

const Content = ({ web3, bibscoinBalance, mintBibscoin }) => (
  <s.Container
    bc="black"
    ai="center"
    style={{ borderRadius: 20, width: '30%', padding: 20 }}
  >
    <s.TextTitle>Bibscoin</s.TextTitle>
    {bibscoinBalance <= 0 ? (
      <s.Button onClick={mintBibscoin} primary>
        Mint Bibscoin
      </s.Button>
    ) : (
      <>
        <s.Container fd="row" ai="center" style={{ width: 'auto' }}>
          <img src={dai} height="35" alt="" style={{ marginRight: 5 }} />
          {/* <s.Input placeholder="Amount of BIBS" type="text" ref={val => setBibscoinInput(val)} /> */}
          <s.TextSubTitle>
            Available: {web3 && web3.utils.fromWei(bibscoinBalance, 'Ether')}
          </s.TextSubTitle>
        </s.Container>
        <s.Button onClick={mintBibscoin} primary>
          Mint Bibscoin
        </s.Button>
      </>
    )}
  </s.Container>
)

export default Content
