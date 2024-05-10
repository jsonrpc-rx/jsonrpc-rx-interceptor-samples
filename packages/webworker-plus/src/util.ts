import { Observer } from '@jsonrpc-rx/client';
import { Subject } from 'rxjs';

export const asJsonrpcObserver = <T>(rxjsSubject: Subject<T>): Observer<T> => {
  return {
    next: rxjsSubject.next.bind(rxjsSubject),
    error: rxjsSubject.error.bind(rxjsSubject),
    complete: rxjsSubject.complete.bind(rxjsSubject),
  };
};
