import React from 'react';
import { mount } from 'enzyme';
import PaymentOptions from './PaymentOptions.js';

describe('<PaymentOptions />', () => {
  let props;
  let mountedPaymentOptions;

  const createPaymentOptions = () => {
    if (!mountedPaymentOptions) {
      mountedPaymentOptions = mount(<PaymentOptions {...props} />);
    }
    return mountedPaymentOptions;
  };

  beforeEach(() => {
    props = {
        intl: null // toDo you need to mock it
    };
    mountedPaymentOptions = undefined;
  });

  it('should make a test for <PaymentOptions />', () => {
    expect(1).toBe(1);
  });

  describe('when the prop `intl` is passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        intl: null // toDo you need to mock it
      };
    });

    it('should have props `intl` in <PaymentOptions />', () => {
      const PaymentOptionsTested = createPaymentOptions();
      expect(PaymentOptionsTested.prop('intl')).toBe(props.intl);
    });
  });

});

