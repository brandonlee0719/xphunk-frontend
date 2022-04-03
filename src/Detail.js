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
  const [isShowConnectWallet, handleShowHideWallet] = useState(false);
  const [traitsCount, setTraitsCount] = useState(new Array(20));
  const [isLoading, setLoading] = useState(false);
  const { data } = location.state;
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  useEffect(() => {
    (async () => {
      setLoading(true);
      data.traitType != null && await getFilterCount(11, data.traitType);
      data.traitBlemish != null && await getFilterCount(1, data.traitBlemish);
      data.traitEar != null && await getFilterCount(2, data.traitEar);
      data.traitEyes != null && await getFilterCount(3, data.traitEyes);
      data.traitFacialHair != null && await getFilterCount(4, data.traitFacialHair);
      data.traitHair != null && await getFilterCount(5, data.traitHair);
      data.traitMouth != null && await getFilterCount(6, data.traitMouth);
      data.traitMouthProp != null && await getFilterCount(7, data.traitMouthProp);
      data.traitNeckAccessory != null && await getFilterCount(8, data.traitNeckAccessory);
      data.traitNose != null && await getFilterCount(9, data.traitNose);
      setLoading(false);
    })();
  }, []);

  async function connect() {
    console.log("connect------------");
    try {
      await activate(injected)
      localStorage.setItem('isWalletConnected', true)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    console.log("disconnect------------");
    try {
      deactivate()
      localStorage.setItem('isWalletConnected', false)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function getFilterCount(index, value) {
    const params = {
      "traitAttributeCount": null,
      "traitBlemish": index === 1 ? value : null,
      "traitEar": index === 2 ? value : null,
      "traitEyes": index === 3 ? value : null,
      "traitFacialHair": index === 4 ? value : null,
      "traitHair": index === 5 ? value : null,
      "traitMouth": index === 6 ? value : null,
      "traitMouthProp": index === 7 ? value : null,
      "traitNeckAccessory": index === 8 ? value : null,
      "traitNose": index === 9 ? value : null,
      "traitSkinTone": null,
      "traitType": index === 11 ? value : null,
    };
    const res = await axios.get(`${BASE_URL}/count`, { params });
    const temp_traitsCount = traitsCount;
    temp_traitsCount[index] = res.data;
    console.log("-------------");
    console.log(temp_traitsCount);

    setTraitsCount(temp_traitsCount);
  }

  const wallet = '0x7E7...51E1B';

  console.log("================", isLoading);
  console.log(traitsCount);

  const web3 = new Web3(window.ethereum)
  const marketplaceContract = new web3.eth.Contract(MarketplaceABI, MarketplaceAddress);
  const nftAddress = "0x71eb5c179ceb640160853144cbb8df5bd24ab5cc";
  async function buy() {
    
    const transaction = await marketplaceContract.methods
          .createMarketSale(nftAddress, data.id)
          .send({ from: account });
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
          <img width="312" height="312" alt="" src={data.image} className="ng-lazyloaded" />
        </div>
        <div className="details-wrapper">
          <div className="title-wrapper">
            <div className="title-color">
              <h1>ExpansionPhunks {id}</h1>
            </div>
            <h2>One of {traitsCount[11]} <span _ngcontent-erd-c39="" className="pink">{data.traitType}</span> phunks.</h2>
          </div>
          <div className="accessories-wrapper">
            <h2>Attributes</h2>

            <div className="accessories">
              {data.traitBlemish != null && <div className="accessory">
                <span className="value">{data.traitBlemish}</span>
                <span className="trait-count"><span>{traitsCount[1]}</span> xphunks have this.</span>
              </div>}
              {data.traitEar != null && <div className="accessory">
                <span className="value">{data.traitEar}</span>
                <span className="trait-count"><span>{traitsCount[2]}</span> xphunks have this.</span>
              </div>}
              {data.traitEyes != null && <div className="accessory">
                <span className="value">{data.traitEyes}</span>
                <span className="trait-count"><span>{traitsCount[3]}</span> xphunks have this.</span>
              </div>}
              {data.traitFacialHair != null && <div className="accessory">
                <span className="value">{data.traitFacialHair}</span>
                <span className="trait-count"><span>{traitsCount[4]}</span> xphunks have this.</span>
              </div>}
              {data.traitHair != null && <div className="accessory">
                <span className="value">{data.traitHair}</span>
                <span className="trait-count"><span>{traitsCount[5]}</span> xphunks have this.</span>
              </div>}
              {data.traitMouth != null && <div className="accessory">
                <span className="value">{data.traitMouth}</span>
                <span className="trait-count"><span>{traitsCount[6]}</span> xphunks have this.</span>
              </div>}
              {data.traitMouthProp != null && <div className="accessory">
                <span className="value">{data.traitMouthProp}</span>
                <span className="trait-count"><span>{traitsCount[7]}</span> xphunks have this.</span>
              </div>}
              {data.traitNeckAccessory != null && <div className="accessory">
                <span className="value">{data.traitNeckAccessory}</span>
                <span className="trait-count"><span>{traitsCount[8]}</span> xphunks have this.</span>
              </div>}
              {data.traitNose != null && <div className="accessory">
                <span className="value">{data.traitNose}</span>
                <span className="trait-count"><span>{traitsCount[9]}</span> xphunks have this.</span>
              </div>}
            </div>


          </div>
          <div className="market-status">
            <h2>Current Market Status</h2>
            <p>This phunk is currently owned by address <a
              href="https://etherscan.io/address/0xF32C74cA26465DCe91dF6Eed7021d6dC110E3BA5">
              <span className="pink">{wallet}</span>
            </a>.</p>
            <p>This phunk is currently for sale for <span className="pink">0.4 ETH</span>
              <span className="bold"> ()</span>.
            </p>
            <p>There are currently no bids on this phunk.</p>
          </div>
          <div className="actions-wrapper">
            <p className="pink">Connect a web3 wallet to interact with this item</p>
          </div>
          {active && <div className="actions-wrapper">
            <button className="button" onClick={buy}> Buy </button>
            <button className="button"> Place Bid </button>
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