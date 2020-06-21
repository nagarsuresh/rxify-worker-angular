import { Subject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
class RxifyWorker {
    /**
     * @param {?} worker
     */
    constructor(worker) {
        this.worker = worker;
        this.callbackStack = {};
        this.messageIndex = 0;
        worker.addEventListener('message', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.handleMessageEvent(e);
        }));
    }
    /**
     * @param {?} payload
     * @return {?}
     */
    sendMessage(payload) {
        /** @type {?} */
        const messageId = String(this.messageIndex++);
        /** @type {?} */
        const messgageToSend = { __messageId: messageId, userData: payload };
        /** @type {?} */
        const subject = new Subject();
        this.callbackStack[messageId] = subject;
        this.worker.postMessage(messgageToSend);
        return subject.asObservable();
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handleMessageEvent(event) {
        /** @type {?} */
        const workerMessage = event.data;
        /** @type {?} */
        const callback = this.callbackStack[workerMessage.__messageId];
        // if no call back found, it might be a message from wrong window.
        if (callback) {
            if (workerMessage.__messageType === 'COMPLETE') {
                callback.complete();
            }
            else {
                callback.next(workerMessage.userData);
            }
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    RxifyWorker.prototype.callbackStack;
    /**
     * @type {?}
     * @private
     */
    RxifyWorker.prototype.messageIndex;
    /**
     * @type {?}
     * @private
     */
    RxifyWorker.prototype.worker;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
class RegisterWorker {
    constructor() {
        this.handleIncomingMessages();
    }
    /**
     * Registers message handler
     * @param {?} handler MessageHandler
     * @return {?}
     */
    handleMessages(handler) {
        this.handler = handler;
    }
    /**
     * handles incoming message and sends response back
     * @private
     * @return {?}
     */
    handleIncomingMessages() {
        self.addEventListener('message', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const message = event.data;
            /** @type {?} */
            const userData = message.userData;
            if (!this.handler) {
                return;
            }
            /** @type {?} */
            const observable = this.handler.apply(this, [userData]);
            /** @type {?} */
            const subscription = observable.subscribe((
            // next handler
            /**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                const messageToSend = Object.assign({}, message, { __messageType: 'DATA', userData: data });
                // @ts-ignore
                self.postMessage(messageToSend);
            }), (
            // error handler
            /**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                throw new Error(err);
            }), (
            // complete handler
            /**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const messageToSend = Object.assign({}, message, { __messageType: 'COMPLETE' });
                // @ts-ignore
                self.postMessage(messageToSend);
                // subscription.unsubscribe();
            }));
        }));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    RegisterWorker.prototype.handler;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function WorkerMessage() { }
if (false) {
    /** @type {?} */
    WorkerMessage.prototype.__messageId;
    /** @type {?|undefined} */
    WorkerMessage.prototype.__messageType;
    /** @type {?} */
    WorkerMessage.prototype.userData;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { RegisterWorker, RxifyWorker };
//# sourceMappingURL=rxify-webworker.js.map
