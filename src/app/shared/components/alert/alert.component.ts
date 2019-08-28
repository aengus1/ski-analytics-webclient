import {Component} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {SocketService} from '../../services/socket.service';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';


export class Alert {
  type: String;
  message: String;
  status: String;
  url: String;

  constructor(type: String, message: String, url: String) {
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
export class AlertComponent {

  private alerts: Alert[] = new Array<Alert>();

  constructor(private alertService: AlertService) {
    alertService.startSubscription().then(x => {
      alertService.messages.subscribe(msg => {
        console.log('response from websocket ' + JSON.stringify(msg));
      });
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
    this.alertService.messages.next(this.message);
  }


}
