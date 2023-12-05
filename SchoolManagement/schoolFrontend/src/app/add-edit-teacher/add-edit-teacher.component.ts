import { Component } from '@angular/core';

@Component({
  selector: 'app-add-edit-teacher',
  templateUrl: './add-edit-teacher.component.html',
  styleUrls: ['./add-edit-teacher.component.css']
})
export class AddEditTeacherComponent {

  title = 'Add';
  teacherObj: any = {};
  classes= [{"name":"1st"}, {"name":"2nd"} ,{"name": "3rd"}, {"name": "4th"}, {"name":"5th"}, {"name":"6th"}, {"name":"7th"}, {"name":"8th"}, {"name":"9th"}, {"name":"10th"}, {"name":"11th"}, {"name":"12th"}];   

  constructor(){

  }
  
  onSubmit() {

  }
}
