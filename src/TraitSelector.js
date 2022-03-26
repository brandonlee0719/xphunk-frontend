import React from 'react';
import traits from './constant';

import { IoIosCloseCircleOutline } from 'react-icons/io';

class TraitSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_traits: [],
    };
  }

  componentDidMount() {
    var temp_trait = [];
    for (var i = 0; i < traits.length; i++) {
      temp_trait.push(traits[i].trait_type);
    }
    this.setState({ selected_traits: temp_trait });
  }

  handleChange = (e, index) => {
    var temp_trait = this.state.selected_traits;
    temp_trait[index] = e.target.value;
    this.setState({ selected_traits: temp_trait });
  }

  handleClear = (index) => {
    var temp_trait = this.state.selected_traits;
    temp_trait[index] = traits[index].trait_type;
    this.setState({ selected_traits: temp_trait });
  }

  render() {
    const { selected_traits } = this.state;
    return (
      <div className="select-container">
        {traits.map((trait, index) => {
          return (
            <div key={index} className="selector-group">
              <select
                required
                className={selected_traits[index] === trait.trait_type ? "selector inactive-color" : "selector"}
                placeholder={trait.trait_type}
                value={selected_traits[index]}
                onChange={(e) => this.handleChange(e, index)}>
                <option value="" hidden >
                  {trait.trait_type}
                </option>
                {trait.values.map((option, option_index) => (
                  <option key={option_index} className="option" value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
              <div className={selected_traits[index] === trait.trait_type ? "flex hidden" : "flex visible"} onClick={() => this.handleClear(index)}>
                <IoIosCloseCircleOutline size={30} />

              </div>
            </div>
          )
        })}

      </div>
    );
  }
}

export default TraitSelector;