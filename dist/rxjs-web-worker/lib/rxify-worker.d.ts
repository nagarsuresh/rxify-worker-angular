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
export declare class RxifyWorker {
    private worker;
    private callbackStack;
    private messageIndex;
    constructor(worker: Worker);
    sendMessage(payload: any): import("rxjs").Observable<unknown>;
    private handleMessageEvent;
}
