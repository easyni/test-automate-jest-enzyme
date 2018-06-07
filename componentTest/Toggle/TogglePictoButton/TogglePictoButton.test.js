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
        classes: {},
        type: '',
        onToggle: () => null,
        label: '',
        active: true,
    };
    mountedTogglePictoButton = undefined;
  });

  it('should make a test for <TogglePictoButton />', () => {
    expect(1).toBe(1);
  });

  describe('when the prop `classes` is not passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        classes: {}
      };
    });

    it('should have props `classes` in <TogglePictoButton />', () => {
      const TogglePictoButtonTested = createTogglePictoButton();
      expect(TogglePictoButtonTested.prop('classes')).toBe(props.classes);
    });
  });
  describe('when the prop `type` is not passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        type: ''
      };
    });

    it('should have props `type` in <TogglePictoButton />', () => {
      const TogglePictoButtonTested = createTogglePictoButton();
      expect(TogglePictoButtonTested.prop('type')).toBe(props.type);
    });
  });
  describe('when the prop `onToggle` is not passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        onToggle: () => null
      };
    });

    it('should have props `onToggle` in <TogglePictoButton />', () => {
      const TogglePictoButtonTested = createTogglePictoButton();
      expect(TogglePictoButtonTested.prop('onToggle')).toBe(props.onToggle);
    });
  });
  describe('when the prop `label` is not passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        label: ''
      };
    });

    it('should have props `label` in <TogglePictoButton />', () => {
      const TogglePictoButtonTested = createTogglePictoButton();
      expect(TogglePictoButtonTested.prop('label')).toBe(props.label);
    });
  });
  describe('when the prop `active` is not passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        active: true
      };
    });

    it('should have props `active` in <TogglePictoButton />', () => {
      const TogglePictoButtonTested = createTogglePictoButton();
      expect(TogglePictoButtonTested.prop('active')).toBe(props.active);
    });
  });
});

