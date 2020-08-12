import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserSettingsFormComponent} from './user-settings-form.component';
import {ApolloTestingController, ApolloTestingModule} from 'apollo-angular/testing';
import {Apollo} from 'apollo-angular';
import {ReactiveFormsModule} from '@angular/forms';
import {UiSwitchModule} from 'ngx-toggle-switch';
import {RouterTestingModule} from '@angular/router/testing';
import {GetUserGQL} from './get-user.gql';

describe('UserSettingsFormComponent', () => {
  let controller: ApolloTestingController;
  let component: UserSettingsFormComponent;
  let fixture: ComponentFixture<UserSettingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule, ReactiveFormsModule, UiSwitchModule, RouterTestingModule],
      declarations: [ UserSettingsFormComponent ],
      providers: [Apollo, GetUserGQL]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsFormComponent);
    component = fixture.componentInstance;
    controller = TestBed.inject(ApolloTestingController);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
