import { JsonrpcClient, wrap } from '@jsonrpc-rx/client';
import { HandlersType } from './handlers';

const worker = new Worker(new URL('./worker', import.meta.url));

const messageSender = (msg) => worker.postMessage(msg);
const messageReceiver = (handler) => (worker.onmessage = (evt) => handler(evt.data));
const jsonrpcClient = new JsonrpcClient(messageSender, messageReceiver);

const reomte = wrap<HandlersType>(jsonrpcClient);

(async () => {
  const sum = await reomte.sum(5, 6);
  console.log(sum); // 11

  const upperCase = await reomte.upperCase('aaa');
  console.log(upperCase); // 'AAA'

  const multiply = (...nums: number[]) => nums.reduce((sum, n) => sum * n);
  const product = await reomte.math(multiply, 5, 6); // multiply 为 function 类型的参数，由 asyncFuncParamsInterceptor 拦截器提供这个能力
  console.log(product); // 30

  reomte.hello();

  reomte.behaviorTimer({
    next: (value) => console.log(value), // '0---1---2---3--...--10---complete!'
    complete: () => console.log('complete!'),
  });
})();
