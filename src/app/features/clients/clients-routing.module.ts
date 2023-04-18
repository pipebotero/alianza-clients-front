import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientsListPageComponent } from './pages/clients-list-page/clients-list-page.component';

const routes: Routes = [

  { path: '', component: ClientsListPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}

export const routedComponents = [
  ClientsComponent,
  ClientsListPageComponent,
];
