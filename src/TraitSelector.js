import React from 'react';
import traits from './constant';

import { IoIosCloseCircleOutline } from 'react-icons/io';
import Select from 'react-select';

function TraitSelector(props) {
  // let options = [];
  
  // options = traits.map((trait, index) => {
  //   console.log(traits);
  //   trait.values.map((option, option_index) => (
  //     { value: option.value, label: option.value }
  //   ))
  // });
  // console.log(options);
  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]
  return (
    <div className="select-container">
      {traits.map((trait, index) => {
        const options = trait.values.map((option, option_index) => (
          { value: option.value, label: option.value }
        ))
        return (
          <div key={index} className="selector-group">

            <Select
              className={props.selectedTraits[index] === trait.trait_type ? "selector inactive-color basic-single" : "selector basic-single"}
              classNamePrefix="select"
              defaultOptions=""
              // isDisabled={true}
              isClearable={true}
              // isRtl={isRtl}
              // isSearchable={isSearchable}
              name="color"
              placeholder={trait.trait_type}
              options={options}
              onChange={(e) => props.handleTraitChange(e, index)}
            />
            
          </div>
        )
      })}

    </div>
  );
}

export default TraitSelector;