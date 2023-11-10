import { ColorValueHex, ElementState } from '#shared/types';

export const colorSwitch = (color: ElementState): ColorValueHex => {
  switch (color) {
    case 'default': {
      return '#0032FF';
    }

    case 'changing': {
      return '#D252E1';
    }

    case 'modified': {
      return '#7FE051';
    }
  }
};
