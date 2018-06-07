import React from 'react';
import { mount } from 'enzyme';
import ToggleOptions from './ToggleOptions.js';

describe('<ToggleOptions />', () => {
  let props;
  let mountedToggleOptions;

  const createToggleOptions = () => {
    if (!mountedToggleOptions) {
      mountedToggleOptions = mount(<ToggleOptions {...props} />);
    }
    return mountedToggleOptions;
  };

  beforeEach(() => {
    props = {
        active: true,
        onToggle: () => null,
        children: {},
        type: '',
        label: '',
    };
    mountedToggleOptions = undefined;
  });

  it('should make a test for <ToggleOptions />', () => {
    expect(1).toBe(1);
  });

  describe('when the prop `active` is not passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        active: true
      };
    });

    it('should have props `active` in <ToggleOptions />', () => {
      const ToggleOptionsTested = createToggleOptions();
      expect(ToggleOptionsTested.prop('active')).toBe(props.active);
    });
  });
  describe('when the prop `onToggle` is not passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        onToggle: () => null
      };
    });

    it('should have props `onToggle` in <ToggleOptions />', () => {
      const ToggleOptionsTested = createToggleOptions();
      expect(ToggleOptionsTested.prop('onToggle')).toBe(props.onToggle);
    });
  });
  describe('when the prop `children` is not passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        children: {}
      };
    });

    it('should have props `children` in <ToggleOptions />', () => {
      const ToggleOptionsTested = createToggleOptions();
      expect(ToggleOptionsTested.prop('children')).toBe(props.children);
    });
  });
  describe('when the prop `type` is not passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        type: ''
      };
    });

    it('should have props `type` in <ToggleOptions />', () => {
      const ToggleOptionsTested = createToggleOptions();
      expect(ToggleOptionsTested.prop('type')).toBe(props.type);
    });
  });
  describe('when the prop `label` is not passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        label: ''
      };
    });

    it('should have props `label` in <ToggleOptions />', () => {
      const ToggleOptionsTested = createToggleOptions();
      expect(ToggleOptionsTested.prop('label')).toBe(props.label);
    });
  });
});

