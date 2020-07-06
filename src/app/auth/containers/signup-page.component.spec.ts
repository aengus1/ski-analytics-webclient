import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import * as fromAuth from '../reducers';
import {SignupFormComponent} from '../components/signup-form/signup-form.component';
import {Confirm, Signup} from '../actions/auth.actions';
import {SignupPageComponent} from './signup-page.component';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient} from '@angular/common/http';

describe('SignupPageComponent', () => {
  let fixture: ComponentFixture<SignupPageComponent>;
  let store: Store<fromAuth.State>;
  let instance: SignupPageComponent;
  let modal: NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          auth: combineReducers(fromAuth.reducers),
        }),
        NgbModule,
        ReactiveFormsModule, RouterTestingModule
      ],
      declarations: [SignupPageComponent, SignupFormComponent],
      providers: [NgbModal, HttpClient]
    });
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.inject(Store);
    modal = TestBed.inject(NgbModal);
    spyOn(store, 'dispatch').and.callThrough();
  });

  /**
     * Container components are used as integration points for connecting
     * the store to presentational components and dispatching
     * actions to the store.
     *
     * Container methods that dispatch events are like a component's output observables.
     * Container properties that select state from store are like a component's input properties.
     * If pure components are functions of their inputs, containers are functions of state
     *
     * Traditionally you would query the components rendered template
     * to validate its state. Since the components are analogous to
     * pure functions, we take snapshots of these components for a given state
     * to validate the rendered output and verify the component's output
     * against changes in state.
     */
    it('should compile', () => {
      fixture.detectChanges();

      // noinspection TypeScriptUnresolvedFunction
      (<any>expect(fixture)).toMatchSnapshot();
    });

    it('should dispatch a signup event on submit', () => {
      const $event: any = {};
      const action = new Signup($event);

      instance.onSubmitSignup($event);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

  it('should dispatch a confirm event on submit', () => {
    const $event: any = {};
    const action = new Confirm($event);

    instance.onSubmitConfirm($event);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});

