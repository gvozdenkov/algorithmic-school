import { ColorValueHex, ElementStates } from '#shared/types';

export const colorSwitch = (color: ElementStates): ColorValueHex => {
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
