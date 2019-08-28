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

export interface Message {
  action: String;
  message: MessageBody;
}



export enum Action {
  KEEPALIVE,
  SEND_MESSAGE
}

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AlertService {
  public messages: Subject<Message>;

  constructor(private wsService: SocketService, private authService: AuthService) {
  }

  async startSubscription() {
    if (this.messages === undefined || this.messages == null) {
      return this.authService.getToken().then(x => {
        console.log('token = ' + x);
        this.messages = <Subject<Message>>this.wsService.connect(environment.ws + '?token=' + x).pipe(map(
          (response: MessageEvent): Message => {
            const data = JSON.parse(response.data);
            return {
              action: 'action test',
              message: {
                  key: data.message.key,
                  payload: data.message.payload,
                  url: data.message.url
              }
            };
          }
        ));
      });
    }
  }

  // private async getConnectionUrl(){
  //   this.authService.getToken().then( x => {
  //     return environment.ws + '?token=' + x;
  //   });
  // }
  //
  // public reconnectSocket() {
  //   this.wsService.connect(this.getConnectionUrl());
  // }
}
