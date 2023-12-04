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

export const colorSwitchToRGB = (color: ElementState): string => {
  switch (color) {
    case 'default': {
      return 'rgb(122, 122, 122)';
    }

    case 'changing': {
      return 'rgb(224, 188, 114)';
    }

    case 'modified': {
      return 'rgb(124, 190, 93)';
    }
  }
};
