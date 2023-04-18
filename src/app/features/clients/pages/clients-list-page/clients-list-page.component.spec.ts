import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientsListPageComponent } from './clients-list-page.component';
import { of } from 'rxjs';
import { ClientsService } from 'src/app/core/http/clients.service';
import { PageableResponse } from 'src/app/shared/models/pageable-response.model';
import { MatDialogModule } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

describe('ClientsListPageComponent', () => {
  let component: ClientsListPageComponent;
  let fixture: ComponentFixture<ClientsListPageComponent>;
  let clientsService: ClientsService;
  let snackBarServiceSpy: jasmine.SpyObj<SnackBarService>;

  beforeEach(async () => {
    snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', [
      'openSnackBar',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ClientsListPageComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        ClientsService,
        { provide: SnackBarService, useValue: snackBarServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsListPageComponent);
    component = fixture.componentInstance;
    clientsService = TestBed.inject(ClientsService);
    fixture.detectChanges();
  });

  it('should call searchClientByUsername with the correct parameters', () => {
    const spy = spyOn(clientsService, 'searchClientByUsername').and.returnValue(
      of({ content: [], totalElements: 0 } as PageableResponse)
    );
    component.basicSearchInput = 'test';
    component.basicSearchFn();
    expect(spy).toHaveBeenCalledWith('test', 0, 5);
  });
});
