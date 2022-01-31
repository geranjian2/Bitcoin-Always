import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadOverlayComponent } from './preloads/preload-overlay/preload-overlay.component';



@NgModule({
  declarations: [PreloadOverlayComponent],
  imports: [
    CommonModule
  ],
  exports:[
    PreloadOverlayComponent
  ]
})
export class ComponentsModule { }
