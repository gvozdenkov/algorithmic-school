import { Queue as QueueType } from '.';

import { HEAD, TAIL } from '#shared/constants';
import { ElementState } from '#shared/types';

import { ProcessingQueueAction } from '../queue-page';

export const setState =
  <T>(Queue: QueueType<T>) =>
  (animationState: ProcessingQueueAction, i: number): ElementState => {
    if (animationState === 'addToTail' && i === Queue.getTail()) {
      return 'changing';
    }
    if (animationState === 'removeFromHead' && i === Queue.getHead()) {
      return 'changing';
    }
    return 'default';
  };

export const setTail =
  <T>(Queue: QueueType<T>) =>
  (i: number): string | false =>
    i === Queue.getTail() && Queue.getLength() > 0 && TAIL;

export const setHead =
  <T>(Queue: QueueType<T>) =>
  (i: number): string | false =>
    i === Queue.getHead() && Queue.getLength() > 0 && HEAD;
