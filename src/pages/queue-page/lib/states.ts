import { HEAD, TAIL } from '#shared/constants';
import { ElementState, AnimationState } from '#shared/types';
import { Queue as QueueType } from '.';

export const setState =
  <T>(Queue: QueueType<T>) =>
  (animationState: AnimationState, i: number): ElementState => {
    if (animationState === 'add' && i === Queue.getTail()) {
      return 'changing';
    }
    if (animationState === 'delete' && i === Queue.getHead()) {
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
