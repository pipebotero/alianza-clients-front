import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ClientsService } from 'src/app/core/http/clients.service';
import { Client } from '../../models/client.model';
import { PageableResponse } from 'src/app/shared/models/pageable-response.model';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ClientFormDialogComponent } from '../../components/client-form-dialog/client-form-dialog.component';
import { ClientRequest } from '../../models/client-request.model';
import { AdvancedSearchRequest } from '../../models/advanced-search-request.model';
import { SearchCriteriaRequest } from '../../models/search-criteria-request.model';
import { AdvancedSearchForm } from '../../models/advanced-search-form.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { downloadCSV } from 'src/app/core/utils/common-functions';

@Component({
  selector: 'app-clients-list-page',
  templateUrl: './clients-list-page.component.html',
  styleUrls: ['./clients-list-page.component.scss'],
})
export class ClientsListPageComponent implements OnInit {
  clients: Client[];
  pageIndex: number = 0;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 20];
  totalElements: number = 0;

  basicSearchInput: string = '';
  advancedSearch: boolean = false;

  exportCsvReqStatus: any = {
    isLoading: false,
    isSubmitted: false,
  }

  constructor(
    private clientsService: ClientsService,
    public dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  reset() {
    this.pageIndex = 0;
    this.pageSize = 5;
    this.pageSizeOptions = [5, 10, 20];
    this.totalElements = 0;
    this.basicSearchInput = '';
    this.advancedSearch = false;
  }

  getClients(): void {
    this.reset();
    this.clientsService
      .clientListPageable(this.pageIndex, this.pageSize)
      .subscribe((data) => {
        console.log(data);
        let response: PageableResponse = data;
        this.totalElements = response.totalElements;
        console.log(this.totalElements);
        this.clients = response.content;
        console.log(this.clients);
      });
  }

  paginateClientsTable(event?: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.clientsService
      .clientListPageable(event.pageIndex, event.pageSize)
      .subscribe((data) => {
        console.log(data);
        let response: PageableResponse = data;
        this.totalElements = response.totalElements;
        this.clients = response.content;
        console.log(this.clients);
      });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ClientFormDialogComponent, {
      width: '350px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        // Object.keys(this.data).length > 0
        this.createNewClient(result);
      }
    });
  }

  createNewClient(client: ClientRequest): void {
    this.clientsService.createClient(client).subscribe(
      (data: Client) => {
        this.snackBarService.openSnackBar('Client created successfully', 'Ok', 5);
        this.getClients();
      },
      (e) => {
        if (e.status === 400) {
          this.snackBarService.openSnackBar(e.error, 'Ok', 5);
        }
        console.error(e);
      }
    );
  }

  basicSearchFn() {
    this.pageIndex = 0;
    this.pageSize = 5;
    this.clientsService
      .searchClientByUsername(
        this.basicSearchInput,
        this.pageIndex,
        this.pageSize
      )
      .subscribe((data: PageableResponse) => {
        console.log({ data });
        let response: PageableResponse = data;
        this.totalElements = response.totalElements;
        this.clients = response.content;
      });
  }

  advancedSearchFn(event: AdvancedSearchForm) {
    console.log('advancedSearchFn');
    console.log({event});
    
    let request: AdvancedSearchRequest = new AdvancedSearchRequest().deserialize({
      dataOption: "all",
      searchCriteriaList: this.buildSearchCriteriaList(event)
    });

    this.clientsService
      .advanceSearchClient(
        request,
        this.pageIndex,
        this.pageSize
      )
      .subscribe((data: PageableResponse) => {
        console.log({ data });
        let response: PageableResponse = data;
        this.totalElements = response.totalElements;
        this.clients = response.content;
      });

  }

  buildSearchCriteriaList(advancedSearchForm: AdvancedSearchForm): SearchCriteriaRequest[] {
    let searchCriteriaList: SearchCriteriaRequest[] = [];
    if(advancedSearchForm.name !== "") {
      let searchNameCriteria = new SearchCriteriaRequest().deserialize({
        filterKey: "name",
        operation: "cn",
        value: advancedSearchForm.name
      });
      searchCriteriaList.push(searchNameCriteria)
    }
    if(advancedSearchForm.phone !== "") {
      let searchPhoneCriteria = new SearchCriteriaRequest().deserialize({
        filterKey: "phone",
        operation: "eq",
        value: advancedSearchForm.phone
      });
      searchCriteriaList.push(searchPhoneCriteria)
    }
    if(advancedSearchForm.email !== "") {
      let searchEmailCriteria = new SearchCriteriaRequest().deserialize({
        filterKey: "email",
        operation: "eq",
        value: advancedSearchForm.email
      });
      searchCriteriaList.push(searchEmailCriteria)
    }
    if(advancedSearchForm.startDate !== "") {
      let dateFormated: string = this.customformatDate(advancedSearchForm.startDate);
      let searchStartDateCriteria = new SearchCriteriaRequest().deserialize({
        filterKey: "createdAt",
        operation: "ge",
        value: dateFormated
      });
      searchCriteriaList.push(searchStartDateCriteria)
    }
    if(advancedSearchForm.endDate !== "") {
      let dateFormated: string = this.customformatDate(advancedSearchForm.endDate);
      let searchEndDateCriteria = new SearchCriteriaRequest().deserialize({
        filterKey: "createdAt",
        operation: "le",
        value: dateFormated
      });
      searchCriteriaList.push(searchEndDateCriteria)
    }
    return searchCriteriaList;
  }

  exportCSV() {
    this.exportCsvReqStatus.isLoading = true;
    let now = new Date();
    console.log(now.getTime())
    let fileName: string = `alianza-clients-${now.getTime()}`;
    this.clientsService.getAllClients()
    .subscribe((data: Client[]) => {
      downloadCSV(data, fileName);
      this.exportCsvReqStatus.isLoading = false;
    });
  }

  customformatDate(d): string {
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    console.log(`${ye}-${mo}-${da}`);
    return `${ye}-${mo}-${da}`;
  }

  changeSearchType() {
    this.advancedSearch = !this.advancedSearch;
  }
}
