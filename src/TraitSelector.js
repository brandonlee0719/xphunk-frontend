import React from 'react';
import traits from './constant';

import { IoIosCloseCircleOutline } from 'react-icons/io';

function TraitSelector(props) {
  return (
    <div className="select-container">
      {traits.map((trait, index) => {
        return (
          <div key={index} className="selector-group">
            <select
              required
              className={props.selectedTraits[index] === trait.trait_type ? "selector inactive-color" : "selector"}
              placeholder={trait.trait_type}
              value={props.selectedTraits[index]}
              onChange={(e) => props.handleTraitChange(e, index)}>
              <option value="" hidden >
                {trait.trait_type}
              </option>
              {trait.values.map((option, option_index) => (
                <option key={option_index} className="option" value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
            <div className={props.selectedTraits[index] === trait.trait_type ? "flex hidden" : "flex visible"}
              onClick={() => props.handleTraitClear(index)}>
              <IoIosCloseCircleOutline size={30} />

            </div>
          </div>
        )
      })}

    </div>
  );
}

export default TraitSelector;