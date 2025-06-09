import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddproductComponent } from './seller-addproduct.component';

describe('SellerAddproductComponent', () => {
  let component: SellerAddproductComponent;
  let fixture: ComponentFixture<SellerAddproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerAddproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerAddproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
