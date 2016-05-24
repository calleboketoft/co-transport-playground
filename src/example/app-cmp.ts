import {Component} from '@angular/core'
import {socket} from '../services/socket-io-service'


@Component({
  selector: 'app',
  template: `
    <div class='container'>
      <h1>Socket.io test</h1>
      <button type='btn btn-primary' (click)='sendMessage()'>
        Emit
      </button>
    </div>
  `
})
export class AppCmp {
  constructor () {
    socket.on('new message', (msg) => {
      console.log('message: ' + msg)
    })
  }

  public counter = 0;

  public sendMessage () {
    socket.emit('new message', 'testing ' + this.counter)
    this.counter++
  }
}