import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadOverlayComponent } from './preload-overlay.component';

describe('PreloadOverlayComponent', () => {
  let component: PreloadOverlayComponent;
  let fixture: ComponentFixture<PreloadOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloadOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
