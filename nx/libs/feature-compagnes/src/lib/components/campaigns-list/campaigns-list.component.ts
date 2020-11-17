import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Campaign, CampaignsGQL } from '@chutney/data-access';
import { Subject } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'chutney-campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.scss']
})

export class CampaignsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'action'];
  protected _onDestroy = new Subject<void>();
  _campaignsDataSource: MatTableDataSource<Campaign> = new MatTableDataSource<Campaign>();
  campaigns: Campaign[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private campaignGQL: CampaignsGQL) {
  }

  ngOnInit(): void {
    this.campaignGQL.watch().valueChanges.pipe(pluck('data', 'campaigns')).subscribe((result: Campaign[]) => {
      this.campaigns = result;
      this._campaignsDataSource.data = result;
    })
    this._campaignsDataSource.paginator = this.paginator;
    this._campaignsDataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
