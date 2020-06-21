import { Observable } from 'rxjs';
export declare type MessageHandler = (payload: any) => Observable<any>;
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
export declare class RegisterWorker {
    private handler;
    constructor();
    /**
     * Registers message handler
     * @param handler MessageHandler
     */
    handleMessages(handler: MessageHandler): void;
    /**
     * handles incoming message and sends response back
     */
    private handleIncomingMessages;
}
