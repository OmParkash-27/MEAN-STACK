import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditStudentComponent } from './add-edit-student/add-edit-student.component';
import { AddEditTeacherComponent } from './add-edit-teacher/add-edit-teacher.component';

const routes: Routes = [
  // { path: '', component: AddEditStudentComponent, pathMatch:'full'},
  { path: 'add-edit-student', component: AddEditStudentComponent, pathMatch:'full'},
  { path: '', component: AddEditTeacherComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
