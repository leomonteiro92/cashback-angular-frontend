import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderComponent } from './create-order.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../order.service';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { defer } from 'rxjs';

describe('CreateOrderComponent', () => {
  let component: CreateOrderComponent;
  let fixture: ComponentFixture<CreateOrderComponent>;
  let service: OrderService;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [OrderService],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbDatepickerModule,
        RouterModule.forRoot([])
      ],
      declarations: [CreateOrderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(OrderService);
    fixture = TestBed.createComponent(CreateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should form be invalid when empty', () => {
    expect(component.orderForm.valid).toBeFalsy();
  });

  it('should check code validity', () => {
    let errors = {};
    let code = component.orderForm.controls.code;
    expect(code.valid).toBeFalsy();

    errors = code.errors || {};
    expect(errors['required']).toBeTruthy();

    code.setValue('1234567');
    errors = code.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();

    code.setValue('abc1234');
    errors = code.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();
  });

  it('should check amount validity', () => {
    let errors = {};
    let amount = component.orderForm.controls.amount;
    expect(amount.valid).toBeFalsy();

    errors = amount.errors || {};
    expect(errors['required']).toBeTruthy();

    amount.setValue('1200');
    errors = amount.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('should emit an Order by submitting the form', () => {
    const mockInputOrder = {
      code: '123456',
      amount: '1200',
      orderDate: {
        year: 2020,
        month: 1,
        day: 1
      }
    };
    spy = spyOn(service, 'create').and.returnValue(
      defer(() => Promise.resolve({
        _id: '5e1dbe680659059c12ddfe31',
        code: 123456,
        amount: 1200,
        orderDate: '2020-01-01T00:00:02.018Z',
        status: 'under_review',
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    )
    expect(component.orderForm.valid).toBeFalsy();
    component.orderForm.controls.code.setValue(mockInputOrder.code);
    component.orderForm.controls.amount.setValue(mockInputOrder.amount);
    component.orderForm.controls.orderDate.setValue(mockInputOrder.orderDate);
    expect(component.orderForm.valid).toBeTruthy();

    component.submitOrder();
    expect(spy).toHaveBeenCalled();
  })


});
