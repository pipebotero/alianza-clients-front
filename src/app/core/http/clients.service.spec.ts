import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ClientsService } from './clients.service';
import { PageableResponse } from 'src/app/shared/models/pageable-response.model';
import { environment } from 'src/environments/environment';
import { AdvancedSearchRequest } from 'src/app/features/clients/models/advanced-search-request.model';
import { PageableSort } from 'src/app/shared/models/pageable-sort.model';
import { SearchCriteriaRequest } from 'src/app/features/clients/models/search-criteria-request.model';

describe('ClientsService', () => {
  let service: ClientsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientsService],
    });
    service = TestBed.inject(ClientsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a PageableResponse when calling clientListPageable()', () => {
    const pageNumber = 0;
    const size = 10;
    const sort: PageableSort = new PageableSort().deserialize({
      empty: true,
      sorted: false,
      unsorted: false,
    });
    const response: PageableResponse = new PageableResponse().deserialize({
      content: [],
      first: true,
      last: true,
      number: 0,
      numberOfElements: 0,
      size: 10,
      sort: sort,
      totalElements: 0,
      totalPages: 0,
    });
    service.clientListPageable(pageNumber, size).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(
      `${environment.API.baseUrl}/client/pageable?pageNumber=${pageNumber}&size=${size}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should return a PageableResponse when calling searchClientByUsername()', () => {
    const username = 'test';
    const pageNumber = 0;
    const size = 10;
    const sort: PageableSort = new PageableSort().deserialize({
      empty: true,
      sorted: false,
      unsorted: false,
    });
    const response: PageableResponse = new PageableResponse().deserialize({
      content: [],
      first: true,
      last: true,
      number: 0,
      numberOfElements: 0,
      size: 10,
      sort: sort,
      totalElements: 0,
      totalPages: 0,
    });
    service
      .searchClientByUsername(username, pageNumber, size)
      .subscribe((res) => {
        expect(res).toEqual(response);
      });

    const req = httpMock.expectOne(
      `${environment.API.baseUrl}/client/data?username=${username}&pageNumber=${pageNumber}&size=${size}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should return a PageableResponse when calling advanceSearchClient()', () => {
    const criteria1: SearchCriteriaRequest = new SearchCriteriaRequest().deserialize({
      filterKey: 'userna',
      operation: 'cn',
      value: 'jdoe',
    });
    let searchCriteriaRequest: SearchCriteriaRequest[] = [];
    searchCriteriaRequest.push(criteria1);
    const request: AdvancedSearchRequest =
      new AdvancedSearchRequest().deserialize({
        dataOption: 'all',
        searchCriteriaList: searchCriteriaRequest,
      });
    const pageNumber = 0;
    const size = 10;
    const sort: PageableSort = new PageableSort().deserialize({
      empty: true,
      sorted: false,
      unsorted: false,
    });
    const response: PageableResponse = new PageableResponse().deserialize({
      content: [],
      first: true,
      last: true,
      number: 0,
      numberOfElements: 0,
      size: 10,
      sort: sort,
      totalElements: 0,
      totalPages: 0,
    });
    service.advanceSearchClient(request, pageNumber, size).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${environment.API.baseUrl}/client/search?pageNumber=${pageNumber}&size=${size}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush(response);
  });
});
