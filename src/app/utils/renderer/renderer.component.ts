import { Component, Input, Output, EventEmitter, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Vector } from './../vector';

import Logger from '../../utils/logger';

/**A Component for rendering shapes and colors on a canvas.*/
@Component({
  selector: 'renderer',
  template: `
  <div #canvasContainer id="canvasContainer" [ngClass]="{'fixed-canvas': fixedSize, 'text-center': center}">
    <canvas #theCanvas id="theCanvas"></canvas>
  </div>`,
  styles: [
    '.fixed-canvas {overflow: auto}',
    '#theCanvas {width: 100%}',
    // '#canvasContainer {max-width: 800px}'
  ]
})
export class Renderer implements AfterViewInit {
  @Input() width: number;
  @Output() widthChange: EventEmitter<number> = new EventEmitter();
  @Input() height: number;
  @Output() heightChange: EventEmitter<number> = new EventEmitter();
  @Output() render: EventEmitter<Renderer> = new EventEmitter();
  @Output() mouseOver: EventEmitter<Vector> = new EventEmitter();
  @Input() fixedSize: boolean;
  @Input() center = true;
  @ViewChild('theCanvas') canvas;
  @ViewChild('canvasContainer') canvasContainer;
  originX: number;
  originY: number;
  clientHeight: string;
  private scale: number;
  private context: CanvasRenderingContext2D;
  private imageBackground: HTMLImageElement;
  private imageLoaded = false;
  private backgroundColor = 'black';

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    let canvas = this.canvas.nativeElement;
    this.context = canvas.getContext('2d');
    
    this.resizeCanvas();
    this.renderLoop();
  }

  ellipse(x: number, y: number, radius: number, color: string) {
    this.context.beginPath();
    let scaledRadius = this.scale * radius;
    this.context.ellipse(x, y, scaledRadius, scaledRadius, 0, 2 * Math.PI, 0, false);
    this.context.fillStyle = color;
    this.context.fill();
    this.context.closePath();
  }

  polygon(points: Vector[], color: string, alpha?: number) {
    let polygonPoints = points.slice(0);  // Need a copy of the points here
    this.context.beginPath();
    color = this.convertHex(color, alpha);
    this.context.fillStyle = color;

    let firstPoint = polygonPoints[0];
    let separatePoints = new Array<Vector>();
    for (let i = 0; i < polygonPoints.length; i++) {
      let point = polygonPoints[i];
      if (i === 0) {
        this.context.moveTo(point.x, point.y);
      } else {
        if (point.x === firstPoint.x && point.y === firstPoint.y && i < polygonPoints.length - 1) {
          // Need to create a separate polygon for these points
          separatePoints = polygonPoints.splice(i + 1, polygonPoints.length - i);
        }
        this.context.lineTo(point.x, point.y);
      }
    }

    this.context.fill();
    this.context.closePath();

    if (separatePoints.length > 0) {
      this.polygon(separatePoints, color);
    }
  }

  text(x: number, y: number, text: string, color: string, centerText?: boolean) {
    this.context.font = 'bold 16px Segoe UI';
    this.context.fillStyle = color;
    if (centerText) {
      let metrics = this.context.measureText(text);
      x -= metrics.width / 2;
    }
    this.context.fillText(text, x, y);
  };

	/**
	 * Loads an image to the background of the canvas.
	 * @param url The image url
	 * @param error An error callback
	 */
  loadImageBackground(url: string, error: any) {
    if (this.imageBackground === undefined) {
      this.imageBackground = new Image();
    }
    this.imageBackground.onload = () => { this.imageLoaded = true; };
    this.imageBackground.onerror = () => { error(`Could not load image at ${url}...`); };
    this.imageBackground.src = url;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    let rect = this.canvas.nativeElement.getBoundingClientRect();

    let centerX = this.width / 2,
      centerY = this.height / 2;

    let x = event.clientX - rect.left - centerX;
    let y = event.clientY - rect.top - centerY;
    this.mouseOver.emit(new Vector(x, y));
  }

  private renderLoop() {
    try {
      requestAnimationFrame(() => { this.renderLoop(); });

      this.context.save();
      
      this.originX = -(this.width / 2);
      this.originY = -(this.height / 2);
      this.context.translate(this.width / 2, this.height / 2);
      
      this.clear();
      this.drawImageBackground();
      
      this.render.emit(this);
      
      this.context.restore();
    } catch (e) {
      Logger.error(e);
    }
  }

  private drawImageBackground() {
    if (!this.imageBackground || !this.imageLoaded) {
      return;
    }
    let centerX = this.width / 2;
    let centerY = this.height / 2;
    this.context.beginPath();
    this.context.drawImage(this.imageBackground, (centerX) * -1, (centerY) * -1, this.width, this.height);
    this.context.closePath();
  }

  private clear() {
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(this.originX, this.originY, this.width, this.height);
  }

  private convertHex(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    let a = parseInt(alpha, 16) / 255;
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
  }

  @HostListener('window:resize', ['$event'])
  resizeCanvas(event?) {
    if (!this.fixedSize) {
      let nativeElement = this.canvas.nativeElement;
      let width = nativeElement.width;
      // let height = width * 1;
      let height = nativeElement.height;
      console.log(this.canvas)
      console.log(height)
      
      this.canvas.height = height;
      this.width = width;
      this.height = height;
      this.clientHeight = nativeElement.clientHeight + 'px';
      // this.clientHeight = height + 'px';
      // this.scale = this.width / this.height;
      this.scale = (this.height / this.width) * 0.5;

      this.widthChange.emit(this.width);
      this.heightChange.emit(this.height);
      this.cdr.detectChanges();
    }
  }
}
