import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { Orbital } from './orbital/models/orbital';
import { OrbitalCardComponent } from './orbital/orbital-card.component';

import { Vector } from './utils/vector';
import Utils from './utils/utils';
import { Renderer } from './utils/renderer/renderer.component';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(Renderer) private renderer: Renderer;
  @ViewChild('sunCard') private sunCard: OrbitalCardComponent;
  @ViewChild('planetCard') private planetCard: OrbitalCardComponent;
  @ViewChild('moonCard') private moonCard: OrbitalCardComponent;
  private sun: Orbital;
  private stars: Vector[];
  private starCount = 2000;
  private starRadius = 0.5;
  private starColor = '#ffffff';

  ngAfterViewInit() {
    this.generateSolarSystem();
  }

  /**
   * Generates a solor system based on the current orbital options from the UI.
   */
  generateSolarSystem() {
    let sunX = this.renderer.width / 2;
    let sunY = this.renderer.height / 2;
    this.sun = new Orbital(this.sunCard.orbitalOptions, 0, sunX, sunY);
    this.sun.setName('The Sun');
    this.sun.createChildren([this.sunCard.orbitalOptions, this.planetCard.orbitalOptions, this.moonCard.orbitalOptions]);
    
    this.generateStars();

    this.sunCard.save();
    this.planetCard.save();
    this.moonCard.save();
  }

  private generateStars() {
    let originX = this.renderer.originX;
    let originY = this.renderer.originY;
    this.stars = new Array<Vector>();
    for (let i = 0; i < this.starCount; i++) {
      let x = Utils.randomInt(originX, this.renderer.width);
      let y = Utils.randomInt(originY, this.renderer.height);
      this.stars.push(new Vector(x, y));
    }
  }

  resetToDefault() {
    this.sunCard.save(true);
    this.planetCard.save(true);
    this.moonCard.save(true);
    this.generateSolarSystem();
  }

  doRender(renderer: Renderer) {
    if (!this.sun) {
      return;
    }

    this.renderStars();
    this.sun.update();
    this.sun.render(renderer);
    this.renderChildren(this.sun);
  }

  renderStars() {
    for (let i = 0, l = this.stars.length; i < l; i++) {
      let star = this.stars[i];
      star.x += 1;
      star.y += 0.5;
      this.renderer.ellipse(star.x, star.y, this.starRadius, this.starColor);

      if (star.x > this.renderer.width) {
        star.x = this.renderer.originX;
      }
      if (star.y > this.renderer.height) {
        star.y = this.renderer.originY;
      }
    }
  }

	/**
	 * Recursivly renders an orbital's children.
	 * @param orbital
	 */
  private renderChildren(orbital: Orbital) {
    for (let i = 0; i < orbital.children.length; i++) {
      let child = orbital.children[i];
      child.update(orbital);
      child.render(this.renderer, orbital);
      this.renderChildren(child);
    }
  }

  onRenderResize(renderer: Renderer) {
    //Regenerate the stars
    this.generateStars();

    // Reposition the sun in the middle
    let sunX = this.renderer.width / 2;
    let sunY = this.renderer.height / 2;
    this.sun.position.x = sunX;
    this.sun.position.y = sunY;
  }
}
