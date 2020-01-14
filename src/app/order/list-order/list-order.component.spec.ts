import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderComponent } from './list-order.component';
import { RouterModule, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { defer } from 'rxjs';
import * as faker from 'faker';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StatusPipe } from '../status.pipe';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

const mockOrders = [
  {
    _id: faker.random.number(),
    amount: 999.0,
    code: faker.random.number(),
    orderDate: faker.date.past(),
    cashbackPercentage: 10,
    cashbackValue: 99.9,
    status: "under_review",
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    user: {
      _id: '5e1716bbe11965806372cc42',
      cpf: '12021036006'
    }
  }, {
    _id: faker.random.number(),
    amount: 2000.0,
    code: faker.random.number(),
    orderDate: faker.date.past(),
    cashbackPercentage: 15,
    cashbackValue: 300,
    status: "approved",
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    user: {
      _id: '5e1716bbe11965806372cc42',
      cpf: '12021036006'
    }
  }, {
    _id: faker.random.number(),
    amount: 2000.0,
    code: faker.random.number(),
    orderDate: faker.date.past(),
    cashbackPercentage: 15,
    cashbackValue: 300,
    status: "rejected",
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    user: {
      _id: '5e1716bbe11965806372cc42',
      cpf: '12021036006'
    }
  }];
const mockBalance = 1000;

describe('ListOrderComponent', () => {
  let component: ListOrderComponent;
  let fixture: ComponentFixture<ListOrderComponent>;
  let service: OrderService;
  let spyOnList: any;
  let spyOnBalance: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderService
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        NgbPaginationModule,
        RouterModule.forRoot([])
      ],
      declarations: [ListOrderComponent, StatusPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(OrderService);
    fixture = TestBed.createComponent(ListOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOnList = spyOn(service, 'list').and.returnValue(
      defer(() => Promise.resolve({
        count: mockOrders.length,
        orders: mockOrders
      }))
    );
    spyOnBalance = spyOn(service, 'balance').and.returnValue(
      defer(() => Promise.resolve({
        credit: mockBalance
      }))
    );
    component.ngOnInit();
  });

  it('should init and display the order list and the balance', async () => {
    await fixture.whenStable();
    expect(spyOnList).toHaveBeenCalled();
    expect(spyOnBalance).toHaveBeenCalled();
    expect(component.orders).toBeDefined();
    expect(component.orders.length).toEqual(3);
    expect(component.totalOrders).toEqual(3);
    expect(component.balance).toEqual(1000);
  });
});
