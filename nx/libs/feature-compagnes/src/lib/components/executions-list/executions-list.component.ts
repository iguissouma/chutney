import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { CampaignsLastExecution, CampaignsLastExecutionsGQL } from '@chutney/data-access';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'chutney-executions-list',
  templateUrl: './executions-list.component.html',
  styleUrls: ['./executions-list.component.scss']
})
export class ExecutionsListComponent implements OnInit {

  displayedColumns: string[] = ['campaignName', 'startDate', 'status'];
  protected _onDestroy = new Subject<void>();
  _campaignsLastExecutionsDataSource: MatTableDataSource<CampaignsLastExecution> = new MatTableDataSource<CampaignsLastExecution>();
  campaignsLastExecution: CampaignsLastExecution[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private campaignsLastExecutionsGQL: CampaignsLastExecutionsGQL) {
  }

  ngOnInit(): void {
    this.campaignsLastExecutionsGQL.watch().valueChanges.pipe(pluck('data', 'campaignsLastExecution')).subscribe((result: CampaignsLastExecution[]) => {
      this.campaignsLastExecution = result;
      this._campaignsLastExecutionsDataSource.data = result;
    })
    this._campaignsLastExecutionsDataSource.paginator = this.paginator;
    this._campaignsLastExecutionsDataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
