import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
import TogglePictoButton from '../TogglePictoButton/index';

function ToggleOptions({
  children, active, onToggle, type, label, ...props
}) {
  return (
    <div>
      <TogglePictoButton active={active} onToggle={onToggle} type={type} label={label} {...props} />
      {active && children}
    </div>
  );
}

ToggleOptions.defaultProps = {
  children: null
};

ToggleOptions.propTypes = {
  active: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.element,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default ToggleOptions;
