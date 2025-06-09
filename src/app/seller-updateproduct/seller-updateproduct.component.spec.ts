import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpdateproductComponent } from './seller-updateproduct.component';

describe('SellerUpdateproductComponent', () => {
  let component: SellerUpdateproductComponent;
  let fixture: ComponentFixture<SellerUpdateproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerUpdateproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerUpdateproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
