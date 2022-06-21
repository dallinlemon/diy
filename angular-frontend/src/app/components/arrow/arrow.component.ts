import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import Group from '../../models/group.model';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.html',
  styleUrls: ['./arrow.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
        state('rotated', style({ transform: 'rotate(0)' })),
        state('default', style({ transform: 'rotate(90deg)' })),
        transition('rotated => default', animate('400ms ease-out')),
        transition('default => rotated', animate('400ms ease-in'))
    ])
  ]
})
export class Arrow implements OnInit {
  @Input() public classList: string = 'large-arrow';
  state: string = 'default';


  constructor() { }

  ngOnInit(): void {
  }

  rotate() {
      this.state = (this.state === 'default' ? 'rotated' : 'default');
  }

}
