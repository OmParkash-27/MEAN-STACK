import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { TestComponent } from './test/test.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  { path: '', component:EmployeeListComponent, pathMatch:'full'},
  { path: 'employee-list', component:EmployeeListComponent, pathMatch:'full'},
  { path: 'add-edit-employee', component:AddEditEmployeeComponent, pathMatch:'full'},
  { path: 'add-edit-employee/:id', component:AddEditEmployeeComponent, pathMatch:'full'},
  { path: 'test', component:TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
