import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {SocketService} from './socket.service';
import {environment} from '../../../environments/environment';
import 'rxjs/add/operator/map';
import {AuthService} from '../../auth/services/auth.service';
import {map} from 'rxjs/operators';

export interface MessageBody {
  key: string;
  payload: string;
  url: string;
}

// export interface Message {
//   action: String;
//   message: MessageBody;
// }


// export enum Action {
//   KEEPALIVE,
//   SEND_MESSAGE
// }

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AlertService {
  public messages: Subject<MessageBody>;

  constructor(private wsService: SocketService, private authService: AuthService) {

  }

  async startSubscription() {
    if (this.messages === undefined || this.messages == null) {
      return this.authService.getToken().then(x => {

        this.messages = <Subject<MessageBody>>this.wsService.connect(environment.ws + '?token=' + x).pipe(map(
          (response: MessageEvent): MessageBody => {
            console.log('alert service response:' + response.data);
            const body = <MessageBody>JSON.parse(response.data);
            this.messages.next(body);
            return body;
          }
        ));
      });
    }
  }

}
