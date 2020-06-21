/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var /**
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
                var messageToSend = tslib_1.__assign({}, message, { __messageType: 'DATA', userData: data });
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
                var messageToSend = tslib_1.__assign({}, message, { __messageType: 'COMPLETE' });
                // @ts-ignore
                self.postMessage(messageToSend);
                // subscription.unsubscribe();
            }));
        }));
    };
    return RegisterWorker;
}());
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
export { RegisterWorker };
if (false) {
    /**
     * @type {?}
     * @private
     */
    RegisterWorker.prototype.handler;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItd29ya2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcnhpZnktd2Vid29ya2VyLyIsInNvdXJjZXMiOlsibGliL3JlZ2lzdGVyLXdvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR0U7UUFDRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCx1Q0FBYzs7Ozs7SUFBZCxVQUFlLE9BQXVCO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssK0NBQXNCOzs7OztJQUE5QjtRQUFBLGlCQTRCQztRQTNCQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUzs7OztRQUFFLFVBQUMsS0FBbUI7O2dCQUM3QyxPQUFPLEdBQWtCLEtBQUssQ0FBQyxJQUFJOztnQkFDbkMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRO1lBQ2pDLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNqQixPQUFPO2FBQ1I7O2dCQUNLLFVBQVUsR0FBb0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O2dCQUNsRSxZQUFZLEdBQUcsVUFBVSxDQUFDLFNBQVM7WUFDdkMsZUFBZTs7Ozs7O1lBQ2YsVUFBQyxJQUFJOztvQkFDRyxhQUFhLHdCQUF1QixPQUFPLElBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxHQUFFO2dCQUMxRixhQUFhO2dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbEMsQ0FBQztZQUNELGdCQUFnQjs7Ozs7O1lBQ2hCLFVBQUMsR0FBRztnQkFDRixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7WUFDRCxtQkFBbUI7Ozs7O1lBQ25COztvQkFDUSxhQUFhLHdCQUF1QixPQUFPLElBQUUsYUFBYSxFQUFFLFVBQVUsR0FBRTtnQkFDOUUsYUFBYTtnQkFDYixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNoQyw4QkFBOEI7WUFDaEMsQ0FBQyxFQUFDO1FBQ04sQ0FBQyxFQUFDLENBQUM7SUFFTCxDQUFDO0lBRUgscUJBQUM7QUFBRCxDQUFDLEFBaERELElBZ0RDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQS9DQyxpQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBXb3JrZXJNZXNzYWdlIH0gZnJvbSAnLi9kdG8nO1xuXG5leHBvcnQgdHlwZSBNZXNzYWdlSGFuZGxlciA9IChwYXlsb2FkOiBhbnkpID0+IE9ic2VydmFibGU8YW55PjtcblxuXG4vKipcbiAqIFRvIGJlIHVzZWQgaW4gdGhlIHdlYndvcmtlciB0byByZWNlaXZlIHRoZSBtZXNzYWdlcyBhbmQgcmV0dXJuIHRoZSByZXNwb25zZXMuXG4gKiBXcmFwcyB0aGUgZnVuY3Rpb25hbGl0eSBvZiBwb3N0TWVzc2FnaW5nIHRvIGhpZGUgdGhlIGNvbXBsZXhpdHkgb2YgZGVhbGluZyB3aXRoIHdlYiB3b3JrZXJzLlxuICogQSBoYW5kbGVyIHdoaWNoIGFjY2VwdHMgdGhlIG1lc3NhZ2UgYW5kIHJldHVybnMgdGhlIE9ic2VydmFibGUgc2hvdWxkIGJlIHJlZ2lzdGVyZWQuXG4gKiBgYGB0c1xuICogY29uc3QgciA9IG5ldyBSZWdpc3RlcldvcmtlcigpO1xuICogci5yZWdpc3RlcigobXNnKT0+e1xuICogIGNvbnN0IHMgPSBuZXcgU3ViamVjdCgpO1xuICogIHNldFRpbWVvdXQoKCk9PiB7XG4gKiAgICBzLm5leHQoJ0hlbGxvIFdvcmxkIScpO1xuICogICAgcy5jb21wbGV0ZSgpO1xuICogIH0pXG4gKiAgcmV0dXJuIHMuYXNPYnNlcnZhYmxlKCk7XG4gKiB9KTtcbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJXb3JrZXIge1xuICBwcml2YXRlIGhhbmRsZXI6IE1lc3NhZ2VIYW5kbGVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlSW5jb21pbmdNZXNzYWdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBtZXNzYWdlIGhhbmRsZXJcbiAgICogQHBhcmFtIGhhbmRsZXIgTWVzc2FnZUhhbmRsZXJcbiAgICovXG4gIGhhbmRsZU1lc3NhZ2VzKGhhbmRsZXI6IE1lc3NhZ2VIYW5kbGVyKSB7XG4gICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVzIGluY29taW5nIG1lc3NhZ2UgYW5kIHNlbmRzIHJlc3BvbnNlIGJhY2tcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlSW5jb21pbmdNZXNzYWdlcygpIHtcbiAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZTogV29ya2VyTWVzc2FnZSA9IGV2ZW50LmRhdGE7XG4gICAgICBjb25zdCB1c2VyRGF0YSA9IG1lc3NhZ2UudXNlckRhdGE7XG4gICAgICBpZiAoIXRoaXMuaGFuZGxlcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmhhbmRsZXIuYXBwbHkodGhpcywgW3VzZXJEYXRhXSk7XG4gICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBvYnNlcnZhYmxlLnN1YnNjcmliZShcbiAgICAgICAgLy8gbmV4dCBoYW5kbGVyXG4gICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZVRvU2VuZDogV29ya2VyTWVzc2FnZSA9IHsgLi4ubWVzc2FnZSwgX19tZXNzYWdlVHlwZTogJ0RBVEEnLCB1c2VyRGF0YTogZGF0YSB9O1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKG1lc3NhZ2VUb1NlbmQpO1xuICAgICAgICB9LFxuICAgICAgICAvLyBlcnJvciBoYW5kbGVyXG4gICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gY29tcGxldGUgaGFuZGxlclxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZVRvU2VuZDogV29ya2VyTWVzc2FnZSA9IHsgLi4ubWVzc2FnZSwgX19tZXNzYWdlVHlwZTogJ0NPTVBMRVRFJyB9O1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKG1lc3NhZ2VUb1NlbmQpO1xuICAgICAgICAgIC8vIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICB9XG5cbn1cblxuXG4iXX0=