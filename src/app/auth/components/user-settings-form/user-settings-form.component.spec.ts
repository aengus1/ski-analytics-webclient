import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserSettingsFormComponent} from './user-settings-form.component';
import {ApolloTestingController, ApolloTestingModule} from 'apollo-angular/testing';
import {Apollo} from 'apollo-angular';
import {ReactiveFormsModule} from '@angular/forms';

describe('UserSettingsFormComponent', () => {
  let controller: ApolloTestingController;
  let component: UserSettingsFormComponent;
  let fixture: ComponentFixture<UserSettingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule, ReactiveFormsModule],
      declarations: [ UserSettingsFormComponent ],
      providers: [Apollo]
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
