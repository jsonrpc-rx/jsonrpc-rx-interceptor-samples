import { Publisher, asBehaviorSubject, asCall, asNotify, asSubject } from '@jsonrpc-rx/server';

export const handlers = {
  sum: (a: number, b: number) => a + b,
  upperCase: (a: string) => a.toUpperCase(),
  math: asCall(async (calculator: (...nums: number[]) => number, a: number, b: number) => {
    return await calculator(a, b);
  }),
  hello: asNotify(() => {
    console.log('hello jsonrpc-rx');
  }),
  timer: asSubject((publisher: Publisher<number>, maxSecond: number = 10) => {
    let second = 0;
    const interval = setInterval(() => {
      if (++second > maxSecond) {
        clearInterval(interval);
        publisher.complete();
        return;
      }
      publisher.next(second);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }),
  behaviorTimer: asBehaviorSubject((publisher: Publisher<number>, maxSecond: number = 10) => {
    let second = 0;
    const interval = setInterval(() => {
      if (++second > maxSecond) {
        clearInterval(interval);
        publisher.complete();
        return;
      }
      publisher.next(second);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, 0),
};

export type HandlersType = typeof handlers;
