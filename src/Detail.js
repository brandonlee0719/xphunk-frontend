import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useWeb3React } from "@web3-react/core";
import { injected } from "./connectors";
import { MarketplaceAddress, MarketplaceABI } from "./redux/constants/marketAddress";
import Web3 from 'web3'

const BASE_URL = 'http://localhost:5000/api';

function Detail() {
  const { id } = useParams();
  const location = useLocation()
  const [isShowConnectWallet, setIsShowConnectWallet] = useState(false);
  const [traits, setTraits] = useState(new Array(20));
  const [isLoading, setLoading] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState("");
  const [price, setPrice] = useState("0.007");
  const [imageUrl, setImageUrl] = useState("");
  const { data } = location.state;
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const web3 = new Web3(window.ethereum)
  function handleShowHideWallet () {
    setIsShowConnectWallet(!isShowConnectWallet);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await axios.get('https://api.opensea.io/api/v1/asset/0x71eb5c179ceb640160853144cbb8df5bd24ab5cc/'+ id +'/?include_orders=false');
      const listingsRes = await axios.get('https://api.opensea.io/api/v1/asset/0x71eb5c179ceb640160853144cbb8df5bd24ab5cc/'+ id +'/listings');
      console.log(res);
      setImageUrl(res.data.image_url);
      const listings = listingsRes.data.listings[0];
      if (listings) {
        setPrice(web3.utils.fromWei(parseInt(listings.current_price).toString(), "ether"))
      }

      if (res?.data.top_ownerships[0].owner.address) {
        setOwnerAddress(res?.data.top_ownerships[0].owner.address)
      }

      // set traits
      const currentTraits = res.data.traits;
      let traitsArray = {};
      for (let i = 0; i < currentTraits.length; i ++) {
        traitsArray[currentTraits[i].trait_type] = {};
        traitsArray[currentTraits[i].trait_type].count = currentTraits[i].trait_count;
        traitsArray[currentTraits[i].trait_type]["value"] = currentTraits[i].value;
      }
      setTraits(traitsArray);

      setLoading(false);
    })();
  }, []);

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



  const marketplaceContract = new web3.eth.Contract(MarketplaceABI, MarketplaceAddress);
  const nftAddress = "0x71eb5c179ceb640160853144cbb8df5bd24ab5cc";

  async function buy() {
    
    const transaction = await marketplaceContract.methods
          .createMarketSale(nftAddress, 5)
          .send({ from: account, gas: 1000000, gasPrice: web3.eth.gas_price, value: web3.utils.toWei(price, "ether") });
  }

  return (
    isLoading ? <div></div> : <div className="App" >
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
          <div className="market-status">
            <h2>Current Market Status</h2>
            <p>This phunk is currently owned by address <a
              href={"https://etherscan.io/address/" + ownerAddress}>
              <span className="pink">{ownerAddress.slice(0, 5) + "..." + ownerAddress.substr(ownerAddress.length - 4)}</span>
            </a>.</p>
            <p>This phunk is currently for sale for <span className="pink">{price} ETH</span>
              <span className="bold"> ()</span>.
            </p>
            <p>There are currently no bids on this phunk.</p>
          </div>
          <div className="actions-wrapper">
            <p className="pink">Connect a web3 wallet to interact with this item</p>
          </div>
          {active && <div className="actions-wrapper">
            <button className="button" onClick={buy}> Buy </button>
          </div>}
        </div>
      </div>


      <div className={isShowConnectWallet ? "connect-wallet" : "connect-wallet hide-modal"}>
        <h2 className="hide-show" onClick={handleShowHideWallet}>{isShowConnectWallet ? "hide" : "show"}</h2>
        <h1>{active ? "Connected To Ethereum" : "Ethereum Available"}</h1>
        <h2>{active && account}</h2>
        {active && <h2 className='connect-button' onClick={disconnect}>Disconnect</h2>}
        {!active && <h2 className='connect-button' onClick={connect}>Connect to MetaMask</h2>}
      </div>
    </div>
  );

}

export default Detail;