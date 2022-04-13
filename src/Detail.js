import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useWeb3React } from "@web3-react/core";
import { injected } from "./connectors";
import { MarketplaceAddress, MarketplaceABI } from "./redux/constants/marketAddress";
import { PhunkAddress, PhunkABI } from "./redux/constants/phunkAddress";
import Web3 from 'web3'
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

function Detail() {
  const { id } = useParams();
  const [isShowConnectWallet, setIsShowConnectWallet] = useState(false);
  const [traits, setTraits] = useState(new Array(20));
  const [isLoading, setLoading] = useState(false);
  const [transactionFinished, settransactionFinished] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [bid, setBid] = useState(0);
  const [bidder, setBidder] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [minSalePrice, setMinSalePrice] = useState(0);
  const [bidPrice, setBidPrice] = useState(0);
  const [pendingWithdrawal, setPendingWithdrawal] = useState(0);
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const [modalForSale, setModalForSale] = useState(false);
  const [modalForBid, setModalForBid] = useState(false);
  const [modalForAcceptBid, setModalForAcceptBid] = useState(false);

  const web3 = new Web3(window.ethereum);
  const marketplaceContract = new web3.eth.Contract(MarketplaceABI, MarketplaceAddress);
  const phunkContract = new web3.eth.Contract(PhunkABI, PhunkAddress);

  function handleShowHideWallet () {
    setIsShowConnectWallet(!isShowConnectWallet);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await axios.get('https://testnets-api.opensea.io/api/v1/asset/' + PhunkAddress + '/'+ id +'/?include_orders=false');

      setImageUrl(res.data.image_url);

      if (res?.data.top_ownerships[0].owner.address) {
        setOwnerAddress(res?.data.top_ownerships[0].owner.address)
      }
      
      marketplaceContract.methods.getOfferedPrice(id).call(function (err, offerPrice) {
        if (offerPrice) {
          setPrice(web3.utils.fromWei(parseInt(offerPrice).toString(), "ether"))
        }
      });
                  
      if (account) {
        const pending = await marketplaceContract.methods.getPendingWithdrawal().call({ from: account });
        setPendingWithdrawal(web3.utils.fromWei(parseInt(pending).toString(), "ether"))
      }

      marketplaceContract.methods.getHighestBid(id).call(function (err, bid) {
        if (bid) {
          setBid(web3.utils.fromWei(parseInt(bid).toString(), "ether"));

          // get highest bidder if the phunk has bid
          marketplaceContract.methods.getHighestBidder(id).call(function (res, bidder) {
            setBidder(bidder);
          });
        }
      });

      // set traits
      const currentTraits = res.data.traits;
      let traitsArray = {};
      for (let i = 0; i < currentTraits.length; i++) {
        traitsArray[currentTraits[i].trait_type] = {};
        traitsArray[currentTraits[i].trait_type].count = currentTraits[i].trait_count;
        traitsArray[currentTraits[i].trait_type]["value"] = currentTraits[i].value;
      }
      setTraits(traitsArray);

      setLoading(false);
    })();
  }, [account, transactionFinished]);

  async function connect() {
    try {
      await activate(injected)
      localStorage.setItem('isWalletConnected', true)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
      localStorage.setItem('isWalletConnected', false)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function buy() {
    await marketplaceContract.methods
      .buyPhunk(id)
      .send({ from: account, gas: 1000000, gasPrice: web3.eth.gas_price, value: web3.utils.toWei(price, "ether") });

    settransactionFinished(!transactionFinished);
  }

  async function acceptBid() {
    setModalForAcceptBid(false)

    // set approval to the new owner
    await phunkContract.methods
      .setApprovalForAll(MarketplaceAddress, true)
      .send({ from: account, gas: 1000000, gasPrice: web3.eth.gas_price });

    await marketplaceContract.methods
      .acceptBidForPhunk(id, web3.utils.toWei(minSalePrice, "ether"))
      .send({ from: account, gas: 1000000, gasPrice: web3.eth.gas_price });

    settransactionFinished(!transactionFinished);
  }

  async function sale() {
    setModalForSale(false)

    // set approval to the new owner
    await phunkContract.methods
      .setApprovalForAll(MarketplaceAddress, true)
      .send({ from: account, gas: 1000000, gasPrice: web3.eth.gas_price });

    await marketplaceContract.methods
      .offerPhunkForSale(id, web3.utils.toWei(minSalePrice, "ether"))
      .send({ from: account, gas: 1000000, gasPrice: web3.eth.gas_price});
    
    settransactionFinished(!transactionFinished);
  }

  async function cancelSale() {
    await marketplaceContract.methods
      .phunkNoLongerForSale(id)
      .send({ from: account, gas: 1000000, gasPrice: web3.eth.gas_price });

    settransactionFinished(!transactionFinished);
  }

  async function withdraw() {
    await marketplaceContract.methods
      .withdraw()
      .send({ from: account, gas: 1000000, gasPrice: web3.eth.gas_price});

    settransactionFinished(!transactionFinished);
  }

  async function placeBid() {
    setModalForBid(false)
    await marketplaceContract.methods
      .enterBidForPhunk(id)
      .send({ from: account, gas: 1000000, gasPrice: web3.eth.gas_price, value: web3.utils.toWei(bidPrice, "ether") });
    
    settransactionFinished(!transactionFinished);
  }

  async function withdrawBid() {
    await marketplaceContract.methods
      .withdrawBidForPhunk(id)
      .send({ from: account, gas: 1000000, gasPrice: web3.eth.gas_price });

    settransactionFinished(!transactionFinished);
  }

  return (
    <div className="App" >
      <div className="post-header-wrapper">
        <div className="breadcrumb">
          <Link className="phunk-item-link-title" to="/">
            <h2>ExpansionPhunks</h2>
          </Link>
          <h2 className="divider">/</h2>
          <h2 className="number">{id}</h2>
        </div>
        <div className="image-wrapper">
          <img width="312" height="312" alt="" src={imageUrl} className="ng-lazyloaded" />
        </div>
        <div className="details-wrapper">
          <div className="title-wrapper">
            <div className="title-color">
              <h1>ExpansionPhunks {id}</h1>
            </div>
            <h2>One of {traits["Type"] != null && traits["Type"].count} <span _ngcontent-erd-c39="" className="pink">{traits["Type"] != null && traits["Type"].value}</span> phunks.</h2>
          </div>
          <div className="accessories-wrapper">
            <h2>Attributes</h2>

            <div className="accessories">
              {traits["Attribute Count"] != null && <div className="accessory">
                <span className="value">Attribute Count {traits["Attribute Count"].value}</span>
                <span className="trait-count"><span>{traits["Attribute Count"].count}</span> xphunks have this.</span>
              </div>}
              {traits["Blemish"] != null && <div className="accessory">
                <span className="value">{traits["Blemish"].value}</span>
                <span className="trait-count"><span>{traits["Blemish"].count}</span> xphunks have this.</span>
              </div>}
              {traits["Ear"] != null && <div className="accessory">
                <span className="value">{traits["Ear"].value}</span>
                <span className="trait-count"><span>{traits["Ear"].count}</span> xphunks have this.</span>
              </div>}
              {traits["Eyes"] != null && <div className="accessory">
                <span className="value">{traits["Eyes"].value}</span>
                <span className="trait-count"><span>{traits["Eyes"].count}</span> xphunks have this.</span>
              </div>}
              {traits["Facial Hair"] != null && <div className="accessory">
                <span className="value">{traits["Facial Hair"].value}</span>
                <span className="trait-count"><span>{traits["Facial Hair"].count}</span> xphunks have this.</span>
              </div>}
              {traits["Hair"] != null && <div className="accessory">
                <span className="value">{traits["Hair"].value}</span>
                <span className="trait-count"><span>{traits["Hair"].count}</span> xphunks have this.</span>
              </div>}
              {traits["Mouth"] != null && <div className="accessory">
                <span className="value">{traits["Mouth"].value}</span>
                <span className="trait-count"><span>{traits["Mouth"].count}</span> xphunks have this.</span>
              </div>}
              {traits["Mouth Prop"] != null && <div className="accessory">
                <span className="value">{traits["Mouth Prop"].value}</span>
                <span className="trait-count"><span>{traits["Mouth Prop"].count}</span> xphunks have this.</span>
              </div>}
              {traits["Neck Accessory"] != null && <div className="accessory">
                <span className="value">{traits["Neck Accessory"].value}</span>
                <span className="trait-count"><span>{traits["Neck Accessory"].count}</span> xphunks have this.</span>
              </div>}
              {traits["Nose"] != null && <div className="accessory">
                <span className="value">{traits["Nose"].value}</span>
                <span className="trait-count"><span>{traits["Nose"].count}</span> xphunks have this.</span>
              </div>}
              {traits["Skin Tone"] != null && <div className="accessory">
                <span className="value">{traits["Skin Tone"].value}</span>
                <span className="trait-count"><span>{traits["Skin Tone"].count}</span> xphunks have this.</span>
              </div>}
              {traits["Type"] != null && <div className="accessory">
                <span className="value">{traits["Type"].value}</span>
                <span className="trait-count"><span>{traits["Type"].count}</span> xphunks have this.</span>
              </div>}
            </div>


          </div>
          { isLoading ? <div></div> : 
            <div className="market-status">
              <h2>Current Market Status</h2>
              <p>This phunk is currently owned by address <a
                href={"https://etherscan.io/address/" + ownerAddress} target="_blank" rel="noreferrer">
                <span className="pink">{ownerAddress.slice(0, 5) + "..." + ownerAddress.substr(ownerAddress.length - 4)}</span>
              </a>.</p>
              {
                Number(price) 
                ? <p>This phunk is currently for sale for <span className="pink">{price} ETH</span>
                    {/* <span className="bold"> ()</span>. */}
                  </p>
                : <p>This phunk is currently not for sale.</p>
              }
              {
                Number(bid)
                ? <p>There is a bid of <span className="pink">{bid} ETH</span> for this punk from <a
                href={"https://etherscan.io/address/" + bidder} target="_blank" rel="noreferrer">
                <span className="pink">{bidder.slice(0, 5) + "..." + bidder.substr(bidder.length - 4)}</span>
              </a>.</p>
                : <p>There are currently no bids on this phunk.</p>
              }
            </div>
          }
          { !account && 
            <div className="actions-wrapper">
              <p className="pink">Connect a web3 wallet to interact with this item</p>
            </div>
          }
          {active && <div className="actions-wrapper">
            { (account && account?.toLowerCase() === ownerAddress?.toLowerCase()) || !Number(price) ?
              <></>
              : <button className="button" onClick={buy}> Buy </button>
            }
            {
              account && account.toLowerCase() === ownerAddress?.toLowerCase() ? 
              <button className="button" onClick={() => setModalForSale(true)}> Sale </button>
              : <></>
            }
            {
              account && account.toLowerCase() === ownerAddress?.toLowerCase() && Number(price) ? 
              <button className="button" onClick={() => cancelSale()}> Cancel Sale Offer </button>
              : <></>
            }
            {
              account && account?.toLowerCase() === ownerAddress?.toLowerCase() ?
              <></>
              : <button className="button" onClick={() => setModalForBid(true)}> Place Bid </button>
            }
            {
              account && Number(bid) && account?.toLowerCase() === bidder?.toLowerCase() ?
              <button className="button" onClick={() => withdrawBid()}> Withdraw Bid </button>
              : <></>
            }
            {
              account && account?.toLowerCase() === ownerAddress?.toLowerCase() && Number(bid) ?
              <button className="button" onClick={ () => setModalForAcceptBid(true) }> Accept Bid </button>
              : <></>
            }
            {
              Number(pendingWithdrawal) ?
              <button className="button" onClick={ () => withdraw() }> Withdraw Pending Amount </button>
              : <></>
            }
          </div>}
        </div>
      </div>

      <div className={isShowConnectWallet ? "connect-wallet" : "connect-wallet hide-modal"}>
        <h3 className="hide-show" onClick={handleShowHideWallet}>{isShowConnectWallet ? "hide" : "show"}</h3>
        <h3 className={active ? "min-y-margin" : "middle-y-margin"}>{active ? "Connected To Ethereum" : "Ethereum Available"}</h3>
        <h4 className="min-y-margin">{active && account}</h4>
        {active && <button className={active ? "min-y-margin connect-button" : "middle-y-margin connect-button"} onClick={disconnect}>Disconnect</button>}
        {!active && <h3 className={active ? "min-y-margin connect-button" : "middle-y-margin connect-button"} onClick={connect}>Connect to MetaMask</h3>}

      </div>

      <PureModal
        isOpen={modalForSale}
        width="600px"
      >
        <div className="justify-center">
          {"Sale on CryptoPhunk " + id }
        </div>
        <div className="justify-center">
          <img width="240" height="240" alt="" src={imageUrl} className="ng-lazyloaded" />
        </div>
        <div className="justify-center" >
          <div >Sale Price (Ξ)</div>
          <input type="number" onChange={(e) => setMinSalePrice(e.target.value)} className="input-price" />
        </div>

        <div className="button-group-justify-center">
          <button onClick={() => setModalForSale(false)}>Cancel</button> &nbsp;&nbsp;    
          <button onClick={sale}>Submit</button>
        </div>
      </PureModal>

      <PureModal
        isOpen={modalForBid}
        width="600px"
      >
        <div className="justify-center">
          {"Bid on CryptoPhunk " + id }
        </div>
        <div className="justify-center">
          <img width="240" height="240" alt="" src={imageUrl} className="ng-lazyloaded" />
        </div>
        <div className="justify-center" >
          <div >Bid Price (Ξ)</div>
          <input type="number" onChange={(e) => setBidPrice(e.target.value)} className="input-price" />
        </div>

        <div className="button-group-justify-center">
          <button onClick={() => setModalForBid(false)}>Cancel</button> &nbsp;&nbsp;    
          <button onClick={placeBid}>Submit</button>
        </div>
      </PureModal>

      <PureModal
        isOpen={modalForAcceptBid}
        width="600px"
      >
        <div className="justify-center">
          {"Accept Bid on CryptoPhunk " + id }
        </div>
        <div className="justify-center">
          <img width="240" height="240" alt="" src={imageUrl} className="ng-lazyloaded" />
        </div>
        <div className="justify-center" >
          <div >Min Price (Ξ)</div>
          <input type="number" onChange={(e) => setMinSalePrice(e.target.value)} className="input-price" />
        </div>

        <div className="button-group-justify-center">
          <button onClick={() => setModalForAcceptBid(false)}>Cancel</button> &nbsp;&nbsp;    
          <button onClick={acceptBid}>Submit</button>
        </div>
      </PureModal>
    </div>
  );

}

export default Detail;