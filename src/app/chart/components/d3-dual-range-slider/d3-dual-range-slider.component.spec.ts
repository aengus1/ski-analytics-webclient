import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, DebugElement, getDebugNode, ViewEncapsulation} from '@angular/core';
import {D3Service} from 'd3-ng2-service';
import {ChartModule} from '../../chart.module';
import {By} from '@angular/platform-browser';



let fixture: ComponentFixture<AppMockComponent>;
let component: AppMockComponent;
let compiled: HTMLElement | null;

@Component({
  selector: 'app-mock-component',
  template: `<app-d3-dual-range-slider
    [minimum]=layout.minimum
    [maximum]=layout.maximum
    [width]=layout.width
    [unitLabel]=layout.unitLabel
    (changeEvent)=layout.receiveMessage($event)>
    </app-d3-dual-range-slider>`,
  encapsulation: ViewEncapsulation.None
})
class AppMockComponent {

  public layout = {
    minimum: 0,
    maximum: 100,
    width: 400,
    unitLabel: 'km/h',
    receiveMessage: function($event) { }
  };


  constructor() {

  }

}

describe('D3DualRangeSliderComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartModule],
      declarations: [AppMockComponent ],
      providers: [D3Service]

    });
    fixture = TestBed.createComponent(AppMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should display a slider track of the correct width`, () => {
    let sliderTrack;
    sliderTrack = compiled ? compiled.querySelector('#slider').querySelector('line.track') : undefined;
    expect(sliderTrack.attributes.getNamedItem('x1').value).toEqual('0',
      'slider track displayed in correct x position');
    expect(+sliderTrack.attributes.getNamedItem('x2').value).toEqual(component.layout.width - 20,
      'slider track length to equal width  minus margins');
  });


  //
  it('should have an appropriately scaled axis', () => {
    let ticks: NodeListOf<Element> | undefined[];
    ticks = compiled ? compiled.querySelector('g.ticks').querySelectorAll('text') : [];
    expect(+ticks[0].attributes.getNamedItem('x').value).toBe(0,
      'first slider tick mark starts at beginning of axis');
    expect(+ticks[0].innerHTML).toBe(component.layout.minimum,
      'slider axis scale starts at correct value');
    expect(+ticks[ticks.length - 1].attributes.getNamedItem('x').value).toBe(component.layout.width - 20,
      'slider last tick mark is positioned at end of axis');
    expect(+ticks[ticks.length - 1].innerHTML).toBe(component.layout.maximum,
      'slider scale ends at layout maximum');
  });

  it('should display the correct value range on the label', () => {
    let badge;
    badge = compiled ? compiled.querySelector('span.badge') : undefined;
    expect(badge.innerHTML.replace(/(\r\n\t|\n|\r\t)/gm, '').replace(/ +(?= )/g, ''))  // remove line breaks and duplicate spaces
      .toBe(component.layout.minimum.toFixed(1) + ' - '
      + component.layout.maximum.toFixed(1) + ' ' + component.layout.unitLabel,
      'label is incorrectly formatted');
  });

  // TODO -> this should be tested from the parent that is calling clear through viewchild
  // it('should reset the slider to initial values when clear is called', () => {
  //
  // });


  //
//   it(' should emit events when slider is dragged', () => {
//     spyOn(component.layout, 'receiveMessage');
//     const svg = compiled ? compiled.querySelector('svg') : undefined;
//
//     const minHandle = svg.querySelector('#minHandle');
//     const maxHandle = svg.querySelector('#maxHandle');
//     const trackHandle = fixture.debugElement.query(By.css('#trackoverlay'));
//     const mockEvent = {
//       type: 'dragstart',
//       preventDefault: jasmine.createSpy('preventdefault')
//     };
//     trackHandle.triggerEventHandler('dragstart', mockEvent);
//
//     const d3service = new D3Service();
//     const d3 = d3service.getD3();
//     const trackSelection = d3.select(compiled).select<SVGLineElement>('#trackoverlay');
//     const evt: Event = new Event('dragstart');
//     evt.initEvent('dragstart', true, true);
//     trackSelection.node().dispatchEvent(evt);
//   //
//   //   //const maxHandle = <DebugElement>getDebugNode(minSlider).query(By.css('#minHandle'));
//   //   //minSliderDebugElement.query(By.css('#trackoverlay'));
//   //   //TODO -> can't get a handle on the slider from the debug element.  Need the debugelement to triggerEventHandler
//   //   // this is related to the D3 view encapsulation.none.
//   //   // fixture.detectChanges();
//   //   // const minHandle = fixture.debugElement.query(By.css('.handle')); // queryAllNodes(By.css('#minHandle'));
//   //   expect(minHandle == null).toBeFalsy();
//   //   expect(maxHandle == null).toBeFalsy();
//   //   expect(minSliderDebugElement == null).toBeFalsy();
//   //   // minHandle.d
//   //   minSliderDebugElement.triggerEventHandler('start drag', { x: 10});
//   //
//   //
//   //
//   // //minSlider.dispatchEvent(new DragEvent('dragstart'));
//   //   // minSlider.triggerEventHandler('dragstart', { x: component.layout.minimum + 1});
//     fixture.detectChanges();
//
// //    expect(minHandle.getAttribute('cx')).not.toEqual('0');
//
//
//     expect(component.layout.receiveMessage).toHaveBeenCalled();
//   });
});
