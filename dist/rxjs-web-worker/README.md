[![Known Vulnerabilities](https://snyk.io//test/github/nagarsuresh/rxify-worker-angular/badge.svg?targetFile=package.json)](https://snyk.io//test/github/nagarsuresh/rxify-worker-angular?targetFile=package.json)
# rxify-webworker

Using RxJS to communicate with webworker.

### Consumer Code
 ```
 const rxify = new RxifyWorker(new Worker('...'));
 rxify.sendMessage('hello').subscribe(msg => console.log(msg));
 ```

### Exposing Worker

```
 const r = new RegisterWorker();
 r.handleMessages((msg)=>{
  const s = new Subject();
  setTimeout(()=> {
    s.next('Hello World!');
    s.complete();
  })
  return s.asObservable();
 });


```


## Repo
https://github.com/nagarsuresh/rxify-worker-angular

