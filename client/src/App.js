import React, { useState, useEffect } from "react";
import Bibscoin from "./contracts/Bibscoin.json";
import getWeb3 from "./getWeb3";
import * as s from "./globalStyles";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import Content from "./components/Content";

const App = () => {

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [bibscoin, setBibscoin] = useState(null);
  const [bibscoinBalance, setBibscoinBalance] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [contentModal, setContentModal] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        // web3.eth.handleRevert = true;

        const accounts = await web3.eth.getAccounts();

        if (window.ethereum) {
          window.ethereum.on('accountsChanged', (accounts) => {
            setAccounts({ accounts });
            window.location.reload();
          });

          window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
        }

        const networkId = await web3.eth.net.getId();
        if (networkId !== 1337 && networkId !== 42) {
          alert("Please Switch to the Kovan Network");
          return;
        }
        
        const bibscoinData = Bibscoin.networks[networkId];
        const bibscoin = new web3.eth.Contract(Bibscoin.abi, bibscoinData && bibscoinData.address);
        setBibscoin(bibscoin);
        let bibscoinBalance = await bibscoin.methods.balanceOf(accounts[0]).call({ from: accounts[0] });
        setBibscoinBalance(bibscoinBalance);

        web3.eth.subscribe('newBlockHeaders', async (err, res) => {
          if (!err) {
            await bibscoin.methods.balanceOf(accounts[0]).call().then(res => setBibscoinBalance(res));
          }
        });

        setWeb3(web3);
        setAccounts(accounts);
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };
    init();
  }, []);

  // EVENTS
  useEffect(() => {
    if (bibscoin !== null && web3 !== null) {
      bibscoin.events.Transfer({fromBlock: 0})
      .on('data', event => handleModal("Transaction Approuved", `${web3.utils.fromWei((event.returnValues.value).toString(), 'Ether')} DAI transfered`))
      .on('error', err => alert("Error", err.message))
    }
  }, [bibscoin, web3])

  const mintBibscoin = async () => {
    try {
      await bibscoin.methods.mint(accounts[0], web3.utils.toWei("1000", 'Ether')).send({ from: accounts[0] });
    } catch (error) {
      handleModal("Error", error.message);
    }
  }

  const handleModal = (title, content) => {
    setTitleModal(title);
    setContentModal(content);
    setModalShow(true);
  }

  if (!web3) {
    return (
      <s.Screen>
        <s.Container ai="center" style={{flex: 1, backgroundColor: '#DBAD6A'}}>
          <Modal modalShow={modalShow} setModalShow={setModalShow} title={titleModal} content={contentModal} />
          <s.TextTitle>Loading Web3, accounts, and contract...</s.TextTitle>
        </s.Container>
      </s.Screen>
    )
  }
  return (
    <s.Screen>
      <s.Container ai="center" style={{flex: 1, backgroundColor: '#EFF0D1'}}>
        <Navbar accounts={accounts} />
        <s.Container ai="center" style={{ paddingTop: 100 }}>
          <Modal modalShow={modalShow} setModalShow={setModalShow} title={titleModal} content={contentModal} />
          <Content
            web3={web3}
            bibscoinBalance={bibscoinBalance}
            mintBibscoin={mintBibscoin}
          />
        </s.Container>  
      </s.Container>
    </s.Screen>
  );
}

export default App;
