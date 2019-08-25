# RxifyWorkerAngular

Using RxJS to communicate with webworker in angular application.

Consumer Code
 ```
 const rxify = new RxifyWorker(new Worker('...'));
 rxify.sendMessage('hello').subscribe(msg => console.log(msg));
 ```

Exposing Worker
```
 const r = new RegisterWorker();
 r.register((msg)=>{
  const s = new Subject();
  setTimeout(()=> {
    s.next('Hello World!');
    s.complete();
  })
  return s.asObservable();
 });
```


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Demo
![Consumer](/src/assets/force-layout.gif)

