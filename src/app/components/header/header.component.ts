import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  activeRoute = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.changeItem();
  }

   changeItem(): void {
    setTimeout(() => {
      const { url } = this.router
      this.activeRoute = url.slice(1);
    },0)
  }
}
