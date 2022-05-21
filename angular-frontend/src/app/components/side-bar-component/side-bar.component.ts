import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-component',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(
  ): void {

  }

  public goToHome(): void {
    this.router.navigate(['/home']);
  }

  public goToBudget(): void {
    this.router.navigate(['/budget']);
  }
}
