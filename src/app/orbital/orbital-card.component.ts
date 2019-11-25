import { Component, Input, OnInit } from '@angular/core';
import { OrbitalOptions } from './models/orbitalOptions';

@Component({
  selector: 'orbital-card',
  templateUrl: './orbital-card.component.html',
  styleUrls: ['./orbital-card.component.scss']
})
export class OrbitalCardComponent implements OnInit {
  @Input() orbitalType: string;
  orbitalOptions: OrbitalOptions;
  title: string;

  ngOnInit() {
    this.title = `${this.orbitalType.charAt(0).toUpperCase() + this.orbitalType.slice(1)} Options`;
    this.orbitalOptions = new OrbitalOptions(this.orbitalType);
  }

  save(useDefault?: boolean) {
    this.orbitalOptions.save(useDefault);
  }
}

