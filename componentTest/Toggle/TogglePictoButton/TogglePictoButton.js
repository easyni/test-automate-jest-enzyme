import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import getButtonType from '../../../../wyndpay-app/src/Core/helpers/getButtonType';
import { blueLight } from '../../../../wyndpay-app/src/Core/config/constant';
import './_toggle-picto-button.scss';

const styles = {
  icon: {
    backgroundColor: blueLight
  },
  bar: {
    backgroundColor: blueLight
  },
  formControlLabel: {
    margin: 0
  },
  label: {
    order: 0
  },
  switch: {
    order: 1
  }
};

function TogglePictoButton({
  type,
  label,
  onToggle,
  active,
  classes,
  ...props
}) {
  return (
    <div className="toggle-picto-button" >
      {getButtonType(type, 'toggle-picto-button__picto')}
      <FormControlLabel
        control={
          <Switch
            checked={active}
            onChange={onToggle}
            color="primary"
            classes={{
              root: classes.switch
            }}
            {...props}
          />
        }
        label={label}
        classes={{
          root: classes.formControlLabel,
          label: classes.label
        }}
        />
    </div>
  );
}

TogglePictoButton.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};

export default withStyles(styles)(TogglePictoButton);
