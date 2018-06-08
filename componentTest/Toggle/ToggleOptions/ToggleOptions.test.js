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
        type: 'a string',
        label: 'a string'
    };
    mountedToggleOptions = undefined;
  });

  it('should make a test for <ToggleOptions />', () => {
    expect(1).toBe(1);
  });

  describe('when the prop `active` is passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        active: true
      };
    });

    it('should have property `active` in <ToggleOptions />', () => {
        const ToggleOptionsTested = createToggleOptions();
        expect(ToggleOptionsTested.prop('active')).toBe(props.active);
    });
  });

  describe('when the prop `onToggle` is passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        onToggle: () => null
      };
    });

    it('should have property `onToggle` in <ToggleOptions />', () => {
        const ToggleOptionsTested = createToggleOptions();
        expect(ToggleOptionsTested.prop('onToggle')).toBe(props.onToggle);
    });
  });

  describe('when the prop `children` is passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        children: <div></div>
      };
    });

    it('should have property `children` in <ToggleOptions />', () => {
        const ToggleOptionsTested = createToggleOptions();
        expect(ToggleOptionsTested.prop('children')).toBe(props.children);
    });
  });

  describe('when the prop `type` is passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        type: 'a string'
      };
    });

    it('should have property `type` in <ToggleOptions />', () => {
        const ToggleOptionsTested = createToggleOptions();
        expect(ToggleOptionsTested.prop('type')).toBe(props.type);
    });
  });

  describe('when the prop `label` is passed', () => {
    beforeEach(() => {
      props = {
        ...props,
        label: 'a string'
      };
    });

    it('should have property `label` in <ToggleOptions />', () => {
        const ToggleOptionsTested = createToggleOptions();
        expect(ToggleOptionsTested.prop('label')).toBe(props.label);
    });
  });

});

