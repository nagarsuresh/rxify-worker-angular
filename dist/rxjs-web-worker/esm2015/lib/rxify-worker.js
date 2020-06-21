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
export class RxifyWorker {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnhpZnktd29ya2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcnhpZnktd2Vid29ya2VyLyIsInNvdXJjZXMiOlsibGliL3J4aWZ5LXdvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7OztBQWdCL0IsTUFBTSxPQUFPLFdBQVc7Ozs7SUFJdEIsWUFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFIMUIsa0JBQWEsR0FBb0MsRUFBRSxDQUFDO1FBQ3BELGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBSXZCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTOzs7O1FBQUUsQ0FBQyxDQUFlLEVBQUUsRUFBRTtZQUNyRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUFDLENBQUM7SUFFTCxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFZOztjQUNoQixTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7Y0FDdkMsY0FBYyxHQUFrQixFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTs7Y0FFN0UsT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBRXhDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRXhDLE9BQU8sT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2hDLENBQUM7Ozs7OztJQUdPLGtCQUFrQixDQUFDLEtBQW1COztjQUN0QyxhQUFhLEdBQWtCLEtBQUssQ0FBQyxJQUFJOztjQUN6QyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO1FBQzlELGtFQUFrRTtRQUNsRSxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksYUFBYSxDQUFDLGFBQWEsS0FBSyxVQUFVLEVBQUU7Z0JBQzlDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNyQjtpQkFBTTtnQkFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN2QztTQUNGO0lBQ0gsQ0FBQztDQUVGOzs7Ozs7SUFyQ0Msb0NBQTREOzs7OztJQUM1RCxtQ0FBeUI7Ozs7O0lBRWIsNkJBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgV29ya2VyTWVzc2FnZSB9IGZyb20gJy4vZHRvJztcblxuXG4vKipcbiAqIFRvIFJ4aWZ5IGEgd29ya2VyIHRocmVhZCBhbmQgbWFrZSB0aGUgd2ViIHdvcmtlciBlbmpveWFibGUuXG4gKiBSZXR1cm5zIGFuIG9ic2VydmFibGUgZm9yIGVhY2ggbWVzc2FnZSBzZW50IHRvIHdvcmtlci4gIFRoZSBPc2VydmFibGUgaXMgYXV0b21hdGljYWxseSBjb21wbGV0ZWRcbiAqIGlmIHRoZSB0aHJlYWQgY29tcGxldGVzIHRoZSBvYnNlcnZhYmxlLlxuICogTXVsdGlwbGUgbWVzc2FnZXMgY2FuIGJlIHNlbnQgd2hpY2ggd2l0aCB0aGVpciBvd24gdW5pcXVlIG9ic2VydmFibGUuXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IHJ4aWZ5ID0gbmV3IFJ4aWZ5V29ya2VyKG5ldyBXb3JrZXIoJy4uLicpKTtcbiAqIHJ4aWZ5LnNlbmRNZXNzYWdlKCdoZWxsbycpLnN1YnNjcmliZShtc2cgPT4gY29uc29sZS5sb2cobXNnKSk7XG4gKiBgYGBcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBSeGlmeVdvcmtlciB7XG4gIHByaXZhdGUgY2FsbGJhY2tTdGFjazogeyBba2V5OiBzdHJpbmddOiBTdWJqZWN0PGFueT4gfSA9IHt9O1xuICBwcml2YXRlIG1lc3NhZ2VJbmRleCA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3b3JrZXI6IFdvcmtlcikge1xuXG4gICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZTogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZU1lc3NhZ2VFdmVudChlKTtcbiAgICB9KTtcblxuICB9XG5cbiAgc2VuZE1lc3NhZ2UocGF5bG9hZDogYW55KSB7XG4gICAgY29uc3QgbWVzc2FnZUlkID0gU3RyaW5nKHRoaXMubWVzc2FnZUluZGV4KyspO1xuICAgIGNvbnN0IG1lc3NnYWdlVG9TZW5kOiBXb3JrZXJNZXNzYWdlID0geyBfX21lc3NhZ2VJZDogbWVzc2FnZUlkLCB1c2VyRGF0YTogcGF5bG9hZCB9O1xuXG4gICAgY29uc3Qgc3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgdGhpcy5jYWxsYmFja1N0YWNrW21lc3NhZ2VJZF0gPSBzdWJqZWN0O1xuXG4gICAgdGhpcy53b3JrZXIucG9zdE1lc3NhZ2UobWVzc2dhZ2VUb1NlbmQpO1xuXG4gICAgcmV0dXJuIHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuXG4gIHByaXZhdGUgaGFuZGxlTWVzc2FnZUV2ZW50KGV2ZW50OiBNZXNzYWdlRXZlbnQpIHtcbiAgICBjb25zdCB3b3JrZXJNZXNzYWdlOiBXb3JrZXJNZXNzYWdlID0gZXZlbnQuZGF0YTtcbiAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMuY2FsbGJhY2tTdGFja1t3b3JrZXJNZXNzYWdlLl9fbWVzc2FnZUlkXTtcbiAgICAvLyBpZiBubyBjYWxsIGJhY2sgZm91bmQsIGl0IG1pZ2h0IGJlIGEgbWVzc2FnZSBmcm9tIHdyb25nIHdpbmRvdy5cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGlmICh3b3JrZXJNZXNzYWdlLl9fbWVzc2FnZVR5cGUgPT09ICdDT01QTEVURScpIHtcbiAgICAgICAgY2FsbGJhY2suY29tcGxldGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrLm5leHQod29ya2VyTWVzc2FnZS51c2VyRGF0YSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cblxuIl19