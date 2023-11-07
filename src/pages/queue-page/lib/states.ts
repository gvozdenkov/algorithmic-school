import { ElementStates, AnimationState } from '#shared/types';
import { Queue as QueueType } from '.';

export const setState =
  <T>(Queue: QueueType<T>) =>
  (animationState: AnimationState, i: number): ElementStates => {
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
    i === Queue.getTail() && Queue.getLength() > 0 && 'tail';

export const setHead =
  <T>(Queue: QueueType<T>) =>
  (i: number): string | false =>
    i === Queue.getHead() && Queue.getLength() > 0 && 'head';
