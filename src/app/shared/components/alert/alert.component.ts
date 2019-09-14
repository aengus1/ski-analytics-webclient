import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {SocketService} from '../../services/socket.service';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';


export class Alert {
  private status: String;

  constructor(public type: String, public message: String, public url: String) {
    this.type = type;
    this.message = message;
    this.url = url;
    this.status = 'NEW';
  }
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  providers: [AlertService, SocketService, NgbDropdown]
})
export class AlertComponent implements OnInit {

 public alerts: Alert[] = new Array<Alert>();

  constructor(private alertService: AlertService, private ref: ChangeDetectorRef) {
    this.alertService.startSubscription().then(() => {
      this.alertService.messages.subscribe(msg => {

        console.log('key = ' + msg.key);
        console.log('payload = ' + msg.payload);
        console.log('url = ' + msg.url);
        this.alerts.push(new Alert(msg.key, msg.payload, msg.url));
        this.ref.detectChanges();
      });
    }, (e) => {
      console.log('error' + e);
    });
  }

  private message = {
    action: 'test action',
    message: {
      key: 'test',
      payload: 'hello from angular client',
      url: 'testurl'
    }
  };

  sendMsg() {
    console.log('new message from client to websocket', this.message);
    this.alertService.messages.next(this.message.message);
  }

  ngOnInit(): void {
   // null
  }


}
