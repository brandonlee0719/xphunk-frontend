import React, { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { injected } from "./connectors";
import { fetchData } from "./redux/data/dataActions";
import TraitSelector from './TraitSelector';
import traits from './constant';
import './App.css';

const BASE_URL = 'https://xphunk-backend.herokuapp.com/api';

function App(props) {
  const [isShowFilter, setShowFilter] = useState(false);
  const [isShowConnectWallet, setShowConnectWallet] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [data, setData] = useState(false);
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, []);

  useEffect(async () => {

    var temp_trait = [];
    for (var i = 0; i < traits.length; i++) {
      temp_trait.push(traits[i].trait_type);
    }
    setSelectedTraits(temp_trait)
    handleFilterData();

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

  const handleTraitChange = (e, index) => {
    var temp_trait = selectedTraits;
    temp_trait[index] = e.target.value;
    setSelectedTraits(temp_trait);
    handleFilterData();
  };

  const handleTraitClear = (index) => {
    var temp_trait = selectedTraits;
    temp_trait[index] = traits[index].trait_type;
    setSelectedTraits(temp_trait);
    handleFilterData();
  };

  const handleSortButton = () => {
    setShowFilter(!isShowFilter);
  };

  const handleFilterData = async () => {
    setLoading(true);
    const params = {
      "traitAttributeCount": selectedTraits[0] === "Attribute Count" ? null : selectedTraits[0],
      "traitBlemish": selectedTraits[1] === "Blemish" ? null : selectedTraits[1],
      "traitEar": selectedTraits[2] === "Ear" ? null : selectedTraits[2],
      "traitEyes": selectedTraits[3] === "Eyes" ? null : selectedTraits[3],
      "traitFacialHair": selectedTraits[4] === "Facial Hair" ? null : selectedTraits[4],
      "traitHair": selectedTraits[5] === "Hair" ? null : selectedTraits[5],
      "traitMouth": selectedTraits[6] === "Mouth" ? null : selectedTraits[6],
      "traitMouthProp": selectedTraits[7] === "Mouth Prop" ? null : selectedTraits[7],
      "traitNeckAccessory": selectedTraits[8] === "Neck Accessory" ? null : selectedTraits[8],
      "traitNose": selectedTraits[9] === "Nose" ? null : selectedTraits[9],
      "traitSkinTone": selectedTraits[10] === "Skin Tone" ? null : selectedTraits[10],
      "traitType": selectedTraits[11] === "Type" ? null : selectedTraits[11],
    };
    const res = await axios.get(BASE_URL, { params });
    setData(res.data);
    setLoading(false);
  };

  const handleShowHideWallet = () => {
    setShowConnectWallet(!isShowConnectWallet);
  };

  return (
    isLoading ? <></> : <div className="App" >
      <div className="post-header-wrapper">
        <h1>xPhunks for Sale</h1>
        <h2>{data.length}/10000 xPhunks Total</h2>
      </div>
      <div className="filter">
        <button className="filter-button" onClick={handleSortButton}>
          {isShowFilter ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {isShowFilter && <TraitSelector
        selectedTraits={selectedTraits}
        handleTraitChange={handleTraitChange}
        handleTraitClear={handleTraitClear}
      />}

      <div className="listings-wrapper">
        {data && data.map((item, index) => (
          <Link key={index} className="phunk-item-link" to={`/details/${item.name.split('#')[1]}`} state={{ data: item }}>
            <div className="phunk-item">
              <img className="phunk-image" alt='' src={item.image} />
            </div>
            <div className="labels-wrapper">
              <div className="phunk-label-detail">{item.name.split(' ')[1]}</div>
              <div className="phunk-label-value">0.007E</div>
              <div className="phunk-label-value">$962.8</div>
            </div>
          </Link>
        ))}
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

export default App;