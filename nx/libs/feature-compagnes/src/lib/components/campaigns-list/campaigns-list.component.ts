import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Campaign } from '@chutney/data-access';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'chutney-campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.scss']
})

export class CampaignsListComponent implements OnInit {
  @Input() set campaigns(campaigns: Campaign[]) {
    if (!isNullOrUndefined(campaigns)) {
      this._campaignsDataSource.data = campaigns;
    }
  }

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  displayedColumns: string[] = ['id', 'title', 'description', 'action'];
  _campaignsDataSource: MatTableDataSource<Campaign> = new MatTableDataSource<Campaign>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor() {
  }

  ngOnInit(): void {
    this._campaignsDataSource.paginator = this.paginator;
    this._campaignsDataSource.sort = this.sort;
  }

  get campaignsDataSource(): MatTableDataSource<Campaign> {
    return this._campaignsDataSource;
  }

  editCampaign(id: any) {
    this.edit.emit(id);
  }

  deleteCampaign(id: any) {
    this.delete.emit(id);
  }

}
