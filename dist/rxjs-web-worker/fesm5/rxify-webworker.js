import { Subject } from 'rxjs';
import { __assign } from 'tslib';

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
var  /**
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
RxifyWorker = /** @class */ (function () {
    function RxifyWorker(worker) {
        var _this = this;
        this.worker = worker;
        this.callbackStack = {};
        this.messageIndex = 0;
        worker.addEventListener('message', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.handleMessageEvent(e);
        }));
    }
    /**
     * @param {?} payload
     * @return {?}
     */
    RxifyWorker.prototype.sendMessage = /**
     * @param {?} payload
     * @return {?}
     */
    function (payload) {
        /** @type {?} */
        var messageId = String(this.messageIndex++);
        /** @type {?} */
        var messgageToSend = { __messageId: messageId, userData: payload };
        /** @type {?} */
        var subject = new Subject();
        this.callbackStack[messageId] = subject;
        this.worker.postMessage(messgageToSend);
        return subject.asObservable();
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    RxifyWorker.prototype.handleMessageEvent = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var workerMessage = event.data;
        /** @type {?} */
        var callback = this.callbackStack[workerMessage.__messageId];
        // if no call back found, it might be a message from wrong window.
        if (callback) {
            if (workerMessage.__messageType === 'COMPLETE') {
                callback.complete();
            }
            else {
                callback.next(workerMessage.userData);
            }
        }
    };
    return RxifyWorker;
}());
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
var  /**
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
RegisterWorker = /** @class */ (function () {
    function RegisterWorker() {
        this.handleIncomingMessages();
    }
    /**
     * Registers message handler
     * @param handler MessageHandler
     */
    /**
     * Registers message handler
     * @param {?} handler MessageHandler
     * @return {?}
     */
    RegisterWorker.prototype.handleMessages = /**
     * Registers message handler
     * @param {?} handler MessageHandler
     * @return {?}
     */
    function (handler) {
        this.handler = handler;
    };
    /**
     * handles incoming message and sends response back
     */
    /**
     * handles incoming message and sends response back
     * @private
     * @return {?}
     */
    RegisterWorker.prototype.handleIncomingMessages = /**
     * handles incoming message and sends response back
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        self.addEventListener('message', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var message = event.data;
            /** @type {?} */
            var userData = message.userData;
            if (!_this.handler) {
                return;
            }
            /** @type {?} */
            var observable = _this.handler.apply(_this, [userData]);
            /** @type {?} */
            var subscription = observable.subscribe((
            // next handler
            // next handler
            /**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                /** @type {?} */
                var messageToSend = __assign({}, message, { __messageType: 'DATA', userData: data });
                // @ts-ignore
                self.postMessage(messageToSend);
            }), (
            // error handler
            // error handler
            /**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                throw new Error(err);
            }), (
            // complete handler
            // complete handler
            /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var messageToSend = __assign({}, message, { __messageType: 'COMPLETE' });
                // @ts-ignore
                self.postMessage(messageToSend);
                // subscription.unsubscribe();
            }));
        }));
    };
    return RegisterWorker;
}());
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
