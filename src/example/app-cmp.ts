import {Component, EventEmitter} from '@angular/core'
import {socket} from '../services/socket-io-service'
import {Observable} from 'rxjs/Rx'

@Component({
  selector: 'app',
  template: `
    <div class='container'>
      <h1>Socket.io test</h1>
      <button type='btn btn-primary'
        (click)='sendMessage("manual click message" + counter)'>
        Send one manual message
      </button>
      <button type='btn btn-primary'
        (click)='startInterval$.emit()'>
        Start interval
      </button>
      <button type='btn btn-primary'
        (click)='stopInterval$.emit()'>
        Stop interval
      </button>
    </div>
  `
})
export class AppCmp {
  public startInterval$ = new EventEmitter();
  public stopInterval$ = new EventEmitter();

  constructor () {
    socket.on('new message', (msg) => {
      console.log('message: ' + msg)
    })

    const interval$ = Observable.interval(1000)

    const intervalThatStops$ = interval$
      .takeUntil(this.stopInterval$)

    this.startInterval$
      .switchMapTo(intervalThatStops$)
      .do((x) => {
        socket.emit('new message ', 'auto ' + x)
      })
      .subscribe((x) => console.log(x))
  }

  public counter = 0;
  public sendMessage (messageText) {
    socket.emit('new message', 'manual ' + this.counter)
    this.counter++
  }
}
