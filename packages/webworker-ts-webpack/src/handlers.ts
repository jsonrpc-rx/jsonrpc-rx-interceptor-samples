import { Publisher } from '@jsonrpc-rx/server';

export const handlers = {
  call: {
    sum: (a: number, b: number) => a + b,
    upperCase: (a: string) => a.toUpperCase(),
    math: async (calculator: (...nums: number[]) => number, a: number, b: number) => {
      return await calculator(a, b);
    },
  },
  notify: {
    hello: () => {
      console.log('hello jsonrpc-rx');
    },
  },
  subscribe: {
    timer: (publisher: Publisher<number>, maxSecond = 10) => {
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
    },
  },
};

export type HandlersType = typeof handlers;
