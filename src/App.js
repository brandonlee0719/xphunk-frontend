import React from 'react';

import { GetMetaData } from './fetch';
import TraitSelector from './TraitSelector';
import arts from './arts';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowFilter: false,
      isLoaging: false
    };
  }

  componentDidMount() {
    console.log(GetMetaData());
  }

  handleSortButton = () => {
    this.setState({ isShowFilter: !this.state.isShowFilter });
  }

  render() {
    const { isShowFilter } = this.state;
    return (
      <div className="App" >
        <div className="post-header-wrapper">
          <h1>xPhunks for Sale</h1>
          <h2>1477 xPhunks Total</h2>
        </div>
        <div className="filter">
          <button className="filter-button" onClick={this.handleSortButton}>
            {isShowFilter ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {isShowFilter && <TraitSelector />}

        <div className="listings-wrapper">
          {arts.map((item, index) => (
            <a key={index} className="phunk-item-link" href="/cryptophunks/details/5803">
              <div className="phunk-item">
                <img className="phunk-image" alt='' src={item.values.image} />
              </div>
              <div className="labels-wrapper">
                <div className="phunk-label-detail">#0001</div>
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