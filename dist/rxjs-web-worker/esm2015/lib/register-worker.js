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
export class RegisterWorker {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItd29ya2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcnhpZnktd2Vid29ya2VyLyIsInNvdXJjZXMiOlsibGliL3JlZ2lzdGVyLXdvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNLE9BQU8sY0FBYztJQUd6QjtRQUNFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2hDLENBQUM7Ozs7OztJQU1ELGNBQWMsQ0FBQyxPQUF1QjtRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDOzs7Ozs7SUFLTyxzQkFBc0I7UUFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVM7Ozs7UUFBRSxDQUFDLEtBQW1CLEVBQUUsRUFBRTs7a0JBQ2pELE9BQU8sR0FBa0IsS0FBSyxDQUFDLElBQUk7O2tCQUNuQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVE7WUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pCLE9BQU87YUFDUjs7a0JBQ0ssVUFBVSxHQUFvQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7a0JBQ2xFLFlBQVksR0FBRyxVQUFVLENBQUMsU0FBUzs7Ozs7O1lBRXZDLENBQUMsSUFBSSxFQUFFLEVBQUU7O3NCQUNELGFBQWEscUJBQXVCLE9BQU8sSUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEdBQUU7Z0JBQzFGLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNsQyxDQUFDOzs7Ozs7WUFFRCxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsQ0FBQzs7Ozs7WUFFRCxHQUFHLEVBQUU7O3NCQUNHLGFBQWEscUJBQXVCLE9BQU8sSUFBRSxhQUFhLEVBQUUsVUFBVSxHQUFFO2dCQUM5RSxhQUFhO2dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ2hDLDhCQUE4QjtZQUNoQyxDQUFDLEVBQUM7UUFDTixDQUFDLEVBQUMsQ0FBQztJQUVMLENBQUM7Q0FFRjs7Ozs7O0lBL0NDLGlDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFdvcmtlck1lc3NhZ2UgfSBmcm9tICcuL2R0byc7XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VIYW5kbGVyID0gKHBheWxvYWQ6IGFueSkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xuXG5cbi8qKlxuICogVG8gYmUgdXNlZCBpbiB0aGUgd2Vid29ya2VyIHRvIHJlY2VpdmUgdGhlIG1lc3NhZ2VzIGFuZCByZXR1cm4gdGhlIHJlc3BvbnNlcy5cbiAqIFdyYXBzIHRoZSBmdW5jdGlvbmFsaXR5IG9mIHBvc3RNZXNzYWdpbmcgdG8gaGlkZSB0aGUgY29tcGxleGl0eSBvZiBkZWFsaW5nIHdpdGggd2ViIHdvcmtlcnMuXG4gKiBBIGhhbmRsZXIgd2hpY2ggYWNjZXB0cyB0aGUgbWVzc2FnZSBhbmQgcmV0dXJucyB0aGUgT2JzZXJ2YWJsZSBzaG91bGQgYmUgcmVnaXN0ZXJlZC5cbiAqIGBgYHRzXG4gKiBjb25zdCByID0gbmV3IFJlZ2lzdGVyV29ya2VyKCk7XG4gKiByLnJlZ2lzdGVyKChtc2cpPT57XG4gKiAgY29uc3QgcyA9IG5ldyBTdWJqZWN0KCk7XG4gKiAgc2V0VGltZW91dCgoKT0+IHtcbiAqICAgIHMubmV4dCgnSGVsbG8gV29ybGQhJyk7XG4gKiAgICBzLmNvbXBsZXRlKCk7XG4gKiAgfSlcbiAqICByZXR1cm4gcy5hc09ic2VydmFibGUoKTtcbiAqIH0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWdpc3RlcldvcmtlciB7XG4gIHByaXZhdGUgaGFuZGxlcjogTWVzc2FnZUhhbmRsZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oYW5kbGVJbmNvbWluZ01lc3NhZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIG1lc3NhZ2UgaGFuZGxlclxuICAgKiBAcGFyYW0gaGFuZGxlciBNZXNzYWdlSGFuZGxlclxuICAgKi9cbiAgaGFuZGxlTWVzc2FnZXMoaGFuZGxlcjogTWVzc2FnZUhhbmRsZXIpIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXMgaW5jb21pbmcgbWVzc2FnZSBhbmQgc2VuZHMgcmVzcG9uc2UgYmFja1xuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVJbmNvbWluZ01lc3NhZ2VzKCkge1xuICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudDogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlOiBXb3JrZXJNZXNzYWdlID0gZXZlbnQuZGF0YTtcbiAgICAgIGNvbnN0IHVzZXJEYXRhID0gbWVzc2FnZS51c2VyRGF0YTtcbiAgICAgIGlmICghdGhpcy5oYW5kbGVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9ic2VydmFibGU6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuaGFuZGxlci5hcHBseSh0aGlzLCBbdXNlckRhdGFdKTtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IG9ic2VydmFibGUuc3Vic2NyaWJlKFxuICAgICAgICAvLyBuZXh0IGhhbmRsZXJcbiAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlVG9TZW5kOiBXb3JrZXJNZXNzYWdlID0geyAuLi5tZXNzYWdlLCBfX21lc3NhZ2VUeXBlOiAnREFUQScsIHVzZXJEYXRhOiBkYXRhIH07XG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UobWVzc2FnZVRvU2VuZCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIGVycm9yIGhhbmRsZXJcbiAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICB9LFxuICAgICAgICAvLyBjb21wbGV0ZSBoYW5kbGVyXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlVG9TZW5kOiBXb3JrZXJNZXNzYWdlID0geyAuLi5tZXNzYWdlLCBfX21lc3NhZ2VUeXBlOiAnQ09NUExFVEUnIH07XG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UobWVzc2FnZVRvU2VuZCk7XG4gICAgICAgICAgLy8gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gIH1cblxufVxuXG5cbiJdfQ==