import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Bibscoin from './contracts/Bibscoin.json'
import getWeb3 from './getWeb3'
import * as s from './styles/Global.styles'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import Content from './components/Content'
import Hello from './components/Hello'

const App = () => {
  const [web3, setWeb3] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [bibscoin, setBibscoin] = useState(null)
  const [bibscoinBalance, setBibscoinBalance] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [titleModal, setTitleModal] = useState(false)
  const [contentModal, setContentModal] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3()
        web3.eth.handleRevert = true

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts()

        if (window.ethereum) {
          window.ethereum.on('accountsChanged', (accounts) => {
            setAccounts({ accounts })
            window.location.reload()
          })

          window.ethereum.on('chainChanged', (_chainId) =>
            window.location.reload(),
          )
        }

        const networkId = await web3.eth.net.getId()
        if (networkId !== 1337 && networkId !== 4) {
          handleModal('Wrong Network', 'Please Switch to the Rinkeby Network')
          return
        }

        const bibscoinData = Bibscoin.networks[networkId]
        const bibscoin = new web3.eth.Contract(
          Bibscoin.abi,
          bibscoinData && bibscoinData.address,
        )
        setBibscoin(bibscoin)
        let bibscoinBalance = await bibscoin.methods
          .balanceOf(accounts[0])
          .call({ from: accounts[0] })
        setBibscoinBalance(bibscoinBalance)

        web3.eth.subscribe('newBlockHeaders', async (err, res) => {
          if (!err) {
            await bibscoin.methods
              .balanceOf(accounts[0])
              .call()
              .then((res) => setBibscoinBalance(res))
          }
        })

        setWeb3(web3)
        setAccounts(accounts)
      } catch (error) {
        handleModal(
          'Error',
          `Failed to load web3, accounts, or contract. Check console for details.`,
        )
        console.error(error)
      }
    }
    init()
  }, [])

  // EVENTS
  useEffect(() => {
    if (bibscoin !== null && web3 !== null) {
      bibscoin.events
        .Transfer({ fromBlock: 0 })
        .on('data', (event) =>
          handleModal(
            'Transaction Approuved',
            `${web3.utils.fromWei(
              event.returnValues.value.toString(),
              'Ether',
            )} DAI transfered`,
          ),
        )
        .on('error', (err) => handleModal('Error', err.message))
    }
  }, [bibscoin, web3])

  const mintBibscoin = async () => {
    try {
      await bibscoin.methods
        .mint(accounts[0], web3.utils.toWei('1000', 'Ether'))
        .send({ from: accounts[0] })
    } catch (error) {
      handleModal('Error', error.message)
    }
  }

  const handleModal = (title, content) => {
    setTitleModal(title)
    setContentModal(content)
    setModalShow(true)
  }

  return (
    <s.Screen>
      <s.Container ai="center" flex={1} bc="#36468e" style={{ paddingTop: 80 }}>
        {!web3 || !accounts ? (
          <s.TextTitle style={{ alignSelf: 'center' }}>
            Loading Web3, accounts, and contract...
          </s.TextTitle>
        ) : (
          <Routes>
            <Route path="/" element={<Navbar accounts={accounts} />}>
              <Route
                index
                element={
                  <Content
                    web3={web3}
                    bibscoinBalance={bibscoinBalance}
                    mintBibscoin={mintBibscoin}
                  />
                }
              />
              <Route path="Hello" element={<Hello />} />
              <Route
                path="*"
                element={
                  <>
                    <s.TextTitle fs="80" style={{ marginTop: 80 }}>
                      Il n'y a rien ici !
                    </s.TextTitle>
                    <s.ButtonHome>
                      <s.ButtonLink to="/">Accueil</s.ButtonLink>
                    </s.ButtonHome>
                  </>
                }
              />
            </Route>
          </Routes>
        )}
        <Modal
          modalShow={modalShow}
          setModalShow={setModalShow}
          title={titleModal}
          content={contentModal}
        />
      </s.Container>
    </s.Screen>
  )
}

export default App
