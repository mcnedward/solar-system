import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { OrbitalCardComponent } from './orbital/orbital-card.component';
import { Renderer } from './utils/renderer/renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    OrbitalCardComponent,
    Renderer,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
