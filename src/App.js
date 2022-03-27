import React from 'react';
import axios from 'axios';

import TraitSelector from './TraitSelector';
import traits from './constant';
import './App.css';

const BASE_URL = 'http://192.168.115.63:8000/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowFilter: false,
      isLoaging: false,
      params: {},
      selected_traits: [],
      data: [],
      isLoading: false
    };
  }

  componentDidMount() {
    var temp_trait = [];
    for (var i = 0; i < traits.length; i++) {
      temp_trait.push(traits[i].trait_type);
    }
    this.setState({ selected_traits: temp_trait });
    this.handleFilterData();
  }

  handleTraitChange = (e, index) => {
    var temp_trait = this.state.selected_traits;
    temp_trait[index] = e.target.value;
    this.setState({ selected_traits: temp_trait });
    this.handleFilterData();
  }

  handleTraitClear = (index) => {
    var temp_trait = this.state.selected_traits;
    temp_trait[index] = traits[index].trait_type;
    this.setState({ selected_traits: temp_trait });
    this.handleFilterData();
  }

  handleSortButton = () => {
    this.setState({ isShowFilter: !this.state.isShowFilter });
  }

  handleFilterData = async () => {
    this.setState({ isLoading: true });
    const { selected_traits } = this.state;
    const params = {
      "traitAttributeCount": selected_traits[0] === "Attribute Count" ? null : selected_traits[0],
      "traitBlemish": selected_traits[1] === "Blemish" ? null : selected_traits[1],
      "traitEar": selected_traits[2] === "Ear" ? null : selected_traits[2],
      "traitEyes": selected_traits[3] === "Eyes" ? null : selected_traits[3],
      "traitFacialHair": selected_traits[4] === "Facial Hair" ? null : selected_traits[4],
      "traitHair": selected_traits[5] === "Hair" ? null : selected_traits[5],
      "traitMouth": selected_traits[6] === "Mouth" ? null : selected_traits[6],
      "traitMouthProp": selected_traits[7] === "Mouth Prop" ? null : selected_traits[7],
      "traitNeckAccessory": selected_traits[8] === "Neck Accessory" ? null : selected_traits[8],
      "traitNose": selected_traits[9] === "Nose" ? null : selected_traits[9],
      "traitSkinTone": selected_traits[10] === "Skin Tone" ? null : selected_traits[10],
      "traitType": selected_traits[11] === "Type" ? null : selected_traits[11],
    };
    const res = await axios.get(BASE_URL, { params });
    console.log(res.data);
    this.setState({ data: res.data, isLoading: false });
  }

  render() {
    const { isLoading, isShowFilter, data } = this.state;
    const temp_data = new Array(100);
    console.log(isLoading);
    return (
      <div className="App" >
        <div className="post-header-wrapper">
          <h1>xPhunks for Sale</h1>
          <h2>{data.length}/10000 xPhunks Total</h2>
        </div>
        <div className="filter">
          <button className="filter-button" onClick={this.handleSortButton}>
            {isShowFilter ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {isShowFilter && <TraitSelector
          selected_traits={this.state.selected_traits}
          handleTraitChange={this.handleTraitChange}
          handleTraitClear={this.handleTraitClear}
        />}

        <div className="listings-wrapper">
          {data.map((item, index) => (
            <a key={index} className="phunk-item-link" href="/">
              <div className="phunk-item">
                <img className="phunk-image" alt='' src={item.image} />
              </div>
              <div className="labels-wrapper">
                <div className="phunk-label-detail">{item.name.split(' ')[1]}</div>
                <div className="phunk-label-value">0.03E</div>
                <div className="phunk-label-value">$962.8</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export default App;