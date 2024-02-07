import { RouterModule, Routes } from '@angular/router';
import { DataTransferComponent } from './data-transfer/data-transfer.component';
import { FormComponent } from './form/form.component';

import { NgModule } from '@angular/core';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'data',
  // },
  {
    path: 'data',
    component: DataTransferComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'edit/:id/:team',
    component: FormComponent,
  },
  {
    path: '**',
    redirectTo: 'data',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
