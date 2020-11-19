import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chutney-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrls: ['./top-banner.component.scss']
})
export class TopBannerComponent implements OnInit {

  @Input('title') title: string;
  @Input('icon') icon: string;
  constructor() { }

  ngOnInit(): void {
  }

}
