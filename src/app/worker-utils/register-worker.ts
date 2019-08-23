import { Observable } from 'rxjs';
import { WorkerMessage } from './rxify-worker';

export type MessageHandler = (payload: any) => Observable<any>;


/**
 * To be used in the webworker to receive the messages and return the responses.
 * Wraps the functionality of postMessaging to hide the complexity of dealing with web workers.
 * A handler which accepts the message and returns the Observable should be registered.
 * ```ts
 * const r = new RegisterWorker();
 * r.register((msg)=>{
 *  const s = new Subject();
 *  setTimeout(()=> {
 *    s.next('Hello World!');
 *    s.complete();
 *  })
 *  return s.asObservable();
 * });
 * ```
 */
export class RegisterWorker {
  private handler: MessageHandler;

  constructor() {
    this.handleIncomingMessages();
  }

  /**
   * Registers message handler
   * @param handler MessageHandler
   */
  handleMessages(handler: MessageHandler) {
    this.handler = handler;
  }

  /**
   * handles incoming message and sends response back
   */
  private handleIncomingMessages() {
    self.addEventListener('message', (event: MessageEvent) => {
      const message: WorkerMessage = event.data;
      const userData = message.userData;
      if (!this.handler) {
        return;
      }
      const observable: Observable<any> = this.handler.apply(this, [userData]);
      const subscription = observable.subscribe(
        // next handler
        (data) => {
          const messageToSend: WorkerMessage = { ...message, __messageType: 'DATA', userData: data };
          // @ts-ignore
          self.postMessage(messageToSend);
        },
        // error handler
        (err) => {
          throw new Error(err);
        },
        // complete handler
        () => {
          const messageToSend: WorkerMessage = { ...message, __messageType: 'COMPLETE' };
          // @ts-ignore
          self.postMessage(messageToSend);
          // subscription.unsubscribe();
        });
    });

  }

}


