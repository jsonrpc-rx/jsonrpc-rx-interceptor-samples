import { JsonrpcClient, wrap } from '@jsonrpc-rx/client';
import { HandlersType } from './worker';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { asJsonrpcObserver } from './util';

const worker = new Worker(new URL('./worker', import.meta.url));

const msgSender = (msg) => worker.postMessage(msg);
const msgReceiver = (h) => (worker.onmessage = (e) => h(e.data));
const jsonrpcClient = new JsonrpcClient(msgSender, msgReceiver);

const reomte = wrap<HandlersType>(jsonrpcClient);

(async () => {
  const sum = await reomte.sum(5, 6);
  console.log(sum); // 11

  reomte.hello('jsonrpc-rx');

  reomte.timer({
    next: (value) => console.log('timer: ', value), // 1---2---3--...
  });

  // 与 rxjs 结合使用
  const rxSubject = new Subject<number>();
  reomte.behaviorTimer(asJsonrpcObserver(rxSubject));
  rxSubject.pipe(filter((x) => x % 2 === 0)).subscribe({
    next: (value) => console.log('behaviorTimer: ', value), // 0---2---4---6--...
  });
})();
