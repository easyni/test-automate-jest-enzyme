import React from 'react';
import { mount } from 'enzyme';
import TogglePictoButton from './TogglePictoButton.js';

describe('<TogglePictoButton />', () => {
  let props;
  let mountedTogglePictoButton;

  const createTogglePictoButton = () => {
    if (!mountedTogglePictoButton) {
      mountedTogglePictoButton = mount(<TogglePictoButton {...props} />);
    }
    return mountedTogglePictoButton;
  };

  beforeEach(() => {
    props = {
        classes: { test: 'a string'},
        type: 'a string',
        onToggle: () => null,
        label: 'a string',
        active: true
    };
    mountedTogglePictoButton = undefined;
  });

  it('should make a test for <TogglePictoButton />', () => {
    expect(1).toBe(1);
  });

  describe('when the prop `classes` is passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        classes: { test: 'a string'}
      };
    });

    it('should have property `classes` in <TogglePictoButton />', () => {
        const TogglePictoButtonTested = createTogglePictoButton();
        expect(TogglePictoButtonTested.prop('classes')).toBe(props.classes);
    });
  });

  describe('when the prop `type` is passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        type: 'a string'
      };
    });

    it('should have property `type` in <TogglePictoButton />', () => {
        const TogglePictoButtonTested = createTogglePictoButton();
        expect(TogglePictoButtonTested.prop('type')).toBe(props.type);
    });
  });

  describe('when the prop `onToggle` is passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        onToggle: () => null
      };
    });

    it('should have property `onToggle` in <TogglePictoButton />', () => {
        const TogglePictoButtonTested = createTogglePictoButton();
        expect(TogglePictoButtonTested.prop('onToggle')).toBe(props.onToggle);
    });
  });

  describe('when the prop `label` is passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        label: 'a string'
      };
    });

    it('should have property `label` in <TogglePictoButton />', () => {
        const TogglePictoButtonTested = createTogglePictoButton();
        expect(TogglePictoButtonTested.prop('label')).toBe(props.label);
    });
  });

  describe('when the prop `active` is passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        active: true
      };
    });

    it('should have property `active` in <TogglePictoButton />', () => {
        const TogglePictoButtonTested = createTogglePictoButton();
        expect(TogglePictoButtonTested.prop('active')).toBe(props.active);
    });
  });

});

