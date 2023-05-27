import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeanimationComponent } from './homeanimation.component';

describe('HomeanimationComponent', () => {
  let component: HomeanimationComponent;
  let fixture: ComponentFixture<HomeanimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeanimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeanimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
