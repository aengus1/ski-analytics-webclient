// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {Component, forwardRef, ViewEncapsulation} from '@angular/core';
// import {D3Service} from 'd3-ng2-service';
// import {ActivityModule} from '../../activity.module';
// import {FilterBase} from '../filter/filter-base.model';
// import {FilterSpeedComponent} from './filter-speed.component';
// import {MockActivity} from  '../../model/activity/activity.mock';
//
// let fixture: ComponentFixture<AppMockComponent>;
// let component: AppMockComponent;
// let compiled: HTMLElement | null;
//
// @Component({
//   selector: 'app-mock-component',
//   template: `<app-filter-speed
//     [activity]=layout.activity
//     (changeEvent)="layout.receiveMessage($event)">
//     </app-filter-speed>`,
// })
// class AppMockComponent {
//
//   public layout = {
//     activity: MockActivity.generateMockActivity(),
//     receiveMessage: function($event) { }
//   };
//
//
//   constructor() {
//
//   }
//
// }
//
// describe('SpeedFilterComponent', () => {
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [ActivityModule],
//       declarations: [AppMockComponent],
//       providers: [{ provide: FilterBase, useExisting: forwardRef(() => FilterSpeedComponent)}]
//
//     });
//     fixture = TestBed.createComponent(AppMockComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     compiled = fixture.debugElement.nativeElement;
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AppMockComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     // expect(component).toBeTruthy();
//   });
//
//   // it(`should emit an addActivityFilter event when enable is called`, () => {
//   //
//   //
//   // });
//   //
//   // it(`should emit a removeActivityEvent  when disable is called`, () => {
//   //
//   //
//   // });
//   //
//   // it(`should emit a minValue event when the slider is moved`, () => {
//   //
//   //
//   // });
//   //
//   // it(`should emit a maxValue event when the slider is moved`, () => {
//   //
//   //
//   // });
//
// });
