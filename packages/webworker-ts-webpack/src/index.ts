import { JsonrpcClient, wrap } from '@jsonrpc-rx/client';
import { HandlersType } from './worker';

const worker = new Worker(new URL('./worker', import.meta.url));

// the message sender
const msgSender = (msg) => worker.postMessage(msg);
// the message receiver
const msgReceiver = (h) => (worker.onmessage = (e) => h(e.data));
// create jsonrpcClient
const jsonrpcClient = new JsonrpcClient(msgSender, msgReceiver);

// warp with Proxy
const reomte = wrap<HandlersType>(jsonrpcClient);

(async () => {
  // call the method "sum"
  const sum = await reomte.sum(5, 6);
  console.log(sum); // 11

  // subscribe to the subject "timer"
  reomte.timer({
    next: (value) => console.log(value), // 0---1---2---3--...
  });
})();
