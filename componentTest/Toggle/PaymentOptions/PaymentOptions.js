import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
import { injectIntl, intlShape } from 'react-intl';
import { SubHeaderPicto } from '../../Header';
import './_payment-options.scss';

function PaymentOptions({ intl }) {
  return (
    <div className="payment-options">
      <SubHeaderPicto
        label={intl.formatMessage({ id: 'payment.ticketTable' })}
        type="cashback" />
    </div>
  );
}

PaymentOptions.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(PaymentOptions);
