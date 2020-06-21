import { Subject } from 'rxjs';
import { WorkerMessage } from './dto';


/**
 * To Rxify a worker thread and make the web worker enjoyable.
 * Returns an observable for each message sent to worker.  The Oservable is automatically completed
 * if the thread completes the observable.
 * Multiple messages can be sent which with their own unique observable.
 *
 * ```ts
 * const rxify = new RxifyWorker(new Worker('...'));
 * rxify.sendMessage('hello').subscribe(msg => console.log(msg));
 * ```
 *
 */
export class RxifyWorker {
  private callbackStack: { [key: string]: Subject<any> } = {};
  private messageIndex = 0;

  constructor(private worker: Worker) {

    worker.addEventListener('message', (e: MessageEvent) => {
      this.handleMessageEvent(e);
    });

  }

  sendMessage(payload: any) {
    const messageId = String(this.messageIndex++);
    const messgageToSend: WorkerMessage = { __messageId: messageId, userData: payload };

    const subject = new Subject();
    this.callbackStack[messageId] = subject;

    this.worker.postMessage(messgageToSend);

    return subject.asObservable();
  }


  private handleMessageEvent(event: MessageEvent) {
    const workerMessage: WorkerMessage = event.data;
    const callback = this.callbackStack[workerMessage.__messageId];
    // if no call back found, it might be a message from wrong window.
    if (callback) {
      if (workerMessage.__messageType === 'COMPLETE') {
        callback.complete();
      } else {
        callback.next(workerMessage.userData);
      }
    }
  }

}

