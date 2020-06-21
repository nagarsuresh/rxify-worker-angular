/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
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
var /**
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
export { RxifyWorker };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnhpZnktd29ya2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcnhpZnktd2Vid29ya2VyLyIsInNvdXJjZXMiOlsibGliL3J4aWZ5LXdvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7OztBQWdCL0I7Ozs7Ozs7Ozs7Ozs7SUFJRSxxQkFBb0IsTUFBYztRQUFsQyxpQkFNQztRQU5tQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSDFCLGtCQUFhLEdBQW9DLEVBQUUsQ0FBQztRQUNwRCxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUl2QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUzs7OztRQUFFLFVBQUMsQ0FBZTtZQUNqRCxLQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUFDLENBQUM7SUFFTCxDQUFDOzs7OztJQUVELGlDQUFXOzs7O0lBQVgsVUFBWSxPQUFZOztZQUNoQixTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7WUFDdkMsY0FBYyxHQUFrQixFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTs7WUFFN0UsT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBRXhDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRXhDLE9BQU8sT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2hDLENBQUM7Ozs7OztJQUdPLHdDQUFrQjs7Ozs7SUFBMUIsVUFBMkIsS0FBbUI7O1lBQ3RDLGFBQWEsR0FBa0IsS0FBSyxDQUFDLElBQUk7O1lBQ3pDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFDOUQsa0VBQWtFO1FBQ2xFLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxhQUFhLENBQUMsYUFBYSxLQUFLLFVBQVUsRUFBRTtnQkFDOUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3JCO2lCQUFNO2dCQUNMLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3ZDO1NBQ0Y7SUFDSCxDQUFDO0lBRUgsa0JBQUM7QUFBRCxDQUFDLEFBdENELElBc0NDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBckNDLG9DQUE0RDs7Ozs7SUFDNUQsbUNBQXlCOzs7OztJQUViLDZCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFdvcmtlck1lc3NhZ2UgfSBmcm9tICcuL2R0byc7XG5cblxuLyoqXG4gKiBUbyBSeGlmeSBhIHdvcmtlciB0aHJlYWQgYW5kIG1ha2UgdGhlIHdlYiB3b3JrZXIgZW5qb3lhYmxlLlxuICogUmV0dXJucyBhbiBvYnNlcnZhYmxlIGZvciBlYWNoIG1lc3NhZ2Ugc2VudCB0byB3b3JrZXIuICBUaGUgT3NlcnZhYmxlIGlzIGF1dG9tYXRpY2FsbHkgY29tcGxldGVkXG4gKiBpZiB0aGUgdGhyZWFkIGNvbXBsZXRlcyB0aGUgb2JzZXJ2YWJsZS5cbiAqIE11bHRpcGxlIG1lc3NhZ2VzIGNhbiBiZSBzZW50IHdoaWNoIHdpdGggdGhlaXIgb3duIHVuaXF1ZSBvYnNlcnZhYmxlLlxuICpcbiAqIGBgYHRzXG4gKiBjb25zdCByeGlmeSA9IG5ldyBSeGlmeVdvcmtlcihuZXcgV29ya2VyKCcuLi4nKSk7XG4gKiByeGlmeS5zZW5kTWVzc2FnZSgnaGVsbG8nKS5zdWJzY3JpYmUobXNnID0+IGNvbnNvbGUubG9nKG1zZykpO1xuICogYGBgXG4gKlxuICovXG5leHBvcnQgY2xhc3MgUnhpZnlXb3JrZXIge1xuICBwcml2YXRlIGNhbGxiYWNrU3RhY2s6IHsgW2tleTogc3RyaW5nXTogU3ViamVjdDxhbnk+IH0gPSB7fTtcbiAgcHJpdmF0ZSBtZXNzYWdlSW5kZXggPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd29ya2VyOiBXb3JrZXIpIHtcblxuICAgIHdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGU6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgICAgdGhpcy5oYW5kbGVNZXNzYWdlRXZlbnQoZSk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIHNlbmRNZXNzYWdlKHBheWxvYWQ6IGFueSkge1xuICAgIGNvbnN0IG1lc3NhZ2VJZCA9IFN0cmluZyh0aGlzLm1lc3NhZ2VJbmRleCsrKTtcbiAgICBjb25zdCBtZXNzZ2FnZVRvU2VuZDogV29ya2VyTWVzc2FnZSA9IHsgX19tZXNzYWdlSWQ6IG1lc3NhZ2VJZCwgdXNlckRhdGE6IHBheWxvYWQgfTtcblxuICAgIGNvbnN0IHN1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICAgIHRoaXMuY2FsbGJhY2tTdGFja1ttZXNzYWdlSWRdID0gc3ViamVjdDtcblxuICAgIHRoaXMud29ya2VyLnBvc3RNZXNzYWdlKG1lc3NnYWdlVG9TZW5kKTtcblxuICAgIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cblxuICBwcml2YXRlIGhhbmRsZU1lc3NhZ2VFdmVudChldmVudDogTWVzc2FnZUV2ZW50KSB7XG4gICAgY29uc3Qgd29ya2VyTWVzc2FnZTogV29ya2VyTWVzc2FnZSA9IGV2ZW50LmRhdGE7XG4gICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLmNhbGxiYWNrU3RhY2tbd29ya2VyTWVzc2FnZS5fX21lc3NhZ2VJZF07XG4gICAgLy8gaWYgbm8gY2FsbCBiYWNrIGZvdW5kLCBpdCBtaWdodCBiZSBhIG1lc3NhZ2UgZnJvbSB3cm9uZyB3aW5kb3cuXG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBpZiAod29ya2VyTWVzc2FnZS5fX21lc3NhZ2VUeXBlID09PSAnQ09NUExFVEUnKSB7XG4gICAgICAgIGNhbGxiYWNrLmNvbXBsZXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjay5uZXh0KHdvcmtlck1lc3NhZ2UudXNlckRhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG5cbiJdfQ==