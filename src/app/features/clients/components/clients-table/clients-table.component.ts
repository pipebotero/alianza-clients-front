import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Client } from '../../models/client.model';

@Component({
  selector: 'ac-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent implements OnInit {

  @Input() clients: Client[];
  @Input() pageSize: number;
  @Input() pageSizeOptions: number[];
  @Input() totalElements: number;
  @Input() pageIndex: number;
  pageEvent: PageEvent;
  displayedColumns: string[] = ['username', 'name', 'email', 'phone', 'createdAt', 'edit'];
  dataSource = new MatTableDataSource<Client>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() paginate = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Client>(this.clients);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log({changes});
    this.dataSource = new MatTableDataSource<Client>(this.clients);
    // this.clients = changes
    // changes.prop contains the old and the new value...
  }

  public getServerData(event?:PageEvent){
    this.paginate.emit(event);
    // this.fooService.getdata(event).subscribe(
    //   response =>{
    //     if(response.error) {
    //       // handle error
    //     } else {
    //       this.datasource = response.data;
    //       this.pageIndex = response.pageIndex;
    //       this.pageSize = response.pageSize;
    //       this.length = response.length;
    //     }
    //   },
    //   error =>{
    //     // handle error
    //   }
    // );
    return event;
  }

}
