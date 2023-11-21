import { ColorValueHex, ElementState } from '#shared/types';

export const colorSwitch = (color: ElementState): ColorValueHex => {
  switch (color) {
    case 'default': {
      return '#7a7a7a';
    }

    case 'changing': {
      return '#e0bc72';
    }

    case 'modified': {
      return '#7cbe5d';
    }
  }
};
