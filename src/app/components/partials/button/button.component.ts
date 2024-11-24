import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() type:'submit'| 'button' = 'submit';
  @Input() text:string = 'Submit';
  @Input() bgColor = '#e72929';
  @Input() color = 'white';
  @Input() fontSizeRem=1.3;
  @Input() widthRem = 12;
  @Output() onClick = new EventEmitter() //should be from angular core not from streams

    constructor() { }

  ngOnInit(): void {
  }

}
