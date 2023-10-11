import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { AddEditADRComponent } from './add-edit-adr/add-edit-adr.component';
import { AddEditPatientComponent } from './add-edit-patient/add-edit-patient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AdrListComponent } from './adr-list/adr-list.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { authGuard } from './common/auth.guard';

const routes: Routes = [
  { path: 'index', component:IndexComponent, pathMatch:'full'},
  { path: '', component:LoginComponent, pathMatch:'full'},
  { path: 'login', component:LoginComponent, pathMatch:'full'},
  { path: 'dashboard', component:DashboardComponent, pathMatch:'full', canActivate: [authGuard]},
  { path: 'add-edit-adr', component:AddEditADRComponent, pathMatch:'full', canActivate: [authGuard]},
  { path: 'add-edit-adr/:id', component:AddEditADRComponent, pathMatch:'full', canActivate: [authGuard]},
  { path: 'adr-list', component:AdrListComponent, pathMatch:'full', canActivate: [authGuard]},
  { path: 'add-edit-patient', component:AddEditPatientComponent, pathMatch:'full', canActivate: [authGuard]},
  { path: 'add-edit-patient/:id', component:AddEditPatientComponent, pathMatch:'full', canActivate: [authGuard]},
  { path: 'add-edit-patient/:id/:status', component:AddEditPatientComponent, pathMatch:'full', canActivate: [authGuard]},
  { path: 'patient-list', component:PatientListComponent, pathMatch:'full', canActivate: [authGuard]},
  { path: 'patient-history', component:PatientHistoryComponent, pathMatch:'full', canActivate: [authGuard]},
  { path: 'doctor-dashboard', component:DoctorDashboardComponent, pathMatch:'full', canActivate: [authGuard]},
  { path: 'doctor-dashboard/:id', component:DoctorDashboardComponent, pathMatch:'full', canActivate: [authGuard]},
 
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
