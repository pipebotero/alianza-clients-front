import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PageableResponse } from 'src/app/shared/models/pageable-response.model';
import { ClientRequest } from 'src/app/features/clients/models/client-request.model';
import { Client } from 'src/app/features/clients/models/client.model';
import { AdvancedSearchRequest } from 'src/app/features/clients/models/advanced-search-request.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private path: string = 'client';

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<Client[]> {
    return this.http
      .get(`${environment.API.baseUrl}/${this.path}`, {})
      .pipe(
        map((res: Client[]) =>
          res.map((client: Client) => new Client().deserialize(client))
        )
      );
  }

  clientListPageable(
    pageNumber: number,
    size: number
  ): Observable<PageableResponse> {
    const options = {
      params: new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('size', size.toString()),
    };
    return this.http
      .get(`${environment.API.baseUrl}/${this.path}/pageable`, options)
      .pipe(
        map((res: PageableResponse) => new PageableResponse().deserialize(res))
      );
  }

  searchClientByUsername(
    username: string,
    pageNumber: number,
    size: number
  ): Observable<PageableResponse> {
    const options = {
      params: new HttpParams()
        .set('username', username)
        .set('pageNumber', pageNumber.toString())
        .set('size', size.toString()),
    };
    return this.http
      .get(`${environment.API.baseUrl}/${this.path}/data`, options)
      .pipe(
        map((res: PageableResponse) => new PageableResponse().deserialize(res))
      );
  }

  advanceSearchClient(
    request: AdvancedSearchRequest,
    pageNumber: number,
    size: number
  ): Observable<PageableResponse> {
    const options = {
      params: new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('size', size.toString()),
    };
    return this.http
      .post(`${environment.API.baseUrl}/${this.path}/search`, request, options)
      .pipe(
        map((res: PageableResponse) => new PageableResponse().deserialize(res))
      );
  }

  createClient(client: ClientRequest): Observable<any> {
    return this.http
      .post(`${environment.API.baseUrl}/${this.path}`, client)
      .pipe(map((res: Client) => new Client().deserialize(res)));
  }
}
