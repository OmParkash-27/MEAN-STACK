import { Component } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.css']
})
export class AddEditStudentComponent {

  title = 'Add';
  studentObj: any = {};
  formData = new FormData;

  constructor(private httpService: HttpService) {

  }

  onSubmit() {
    console.log(this.studentObj);
    
    for(const key in this.studentObj) {
      if(this.studentObj.hasOwnProperty(key)) {
        this.formData.append(key, this.studentObj[key]);
      }
    }
    this.saveInDb(this.formData);
  }

  saveInDb(form: any) {
    console.log("on Submit save in Db", form);
    this.httpService.postRequest("studentApi", form).subscribe( res => {
      console.log(res);
      
    })
  }

  onChange(event: any) {
    //console.log(event.target.files[0]);
   this.formData.append('image', event.target.files[0]) 
   //console.log(this.formData);
   
  }
}
