import React from 'react';
import traits from './constant';

import { IoIosCloseCircleOutline } from 'react-icons/io';

class TraitSelector extends React.Component {
  render() {
    const { selected_traits, handleTraitChange, handleTraitClear } = this.props;
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
                onChange={(e) => handleTraitChange(e, index)}>
                <option value="" hidden >
                  {trait.trait_type}
                </option>
                {trait.values.map((option, option_index) => (
                  <option key={option_index} className="option" value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
              <div className={selected_traits[index] === trait.trait_type ? "flex hidden" : "flex visible"}
                onClick={() => handleTraitClear(index)}>
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