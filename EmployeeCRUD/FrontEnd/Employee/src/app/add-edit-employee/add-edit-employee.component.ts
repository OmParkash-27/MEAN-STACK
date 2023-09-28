import { Component, Inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent {
  
  qualificationArray: any = [{'value':'10th'},  {'value':'12th'}, {'value':'graduate'}, {'value':'diploma'}, {'value':'PG'},{'value':'Phd'}];
  selectedOption: string='';
  employeeObj: any={};
  formData = new FormData;


  constructor(@Inject(MAT_DIALOG_DATA) public data: {isEdditing: boolean, employeId: string} ,private httpService: HttpService, private router: Router,
  private activatedRoute: ActivatedRoute, private location: Location) {
      // this.activatedRoute.params.subscribe(params => {
      //   if(params['id'] != undefined) {
      //     // alert(params['id']);
      //     this.fetchRecord(params['id']);
      //   }
      // });

      if(this.data.isEdditing == true) {
        // console.log(this.data);
        this.fetchRecord(this.data.employeId);
      } 

      
  }

  onSelectImg(event: any) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file, "-------------img");
      this.formData.append('img', file);
      //console.log(this.formData, "---------------");
    }
    
  }

   onSubmit() {
    for (const key in this.employeeObj) {
      if (this.employeeObj.hasOwnProperty(key)) {
        this.formData.append(key, this.employeeObj[key]);
      }
    }
    console.log(this.formData);
    console.log("--------------onSubmit file-----",this.formData);
    //console.log("--------------onSubmit file-----",this.formData.get('File'));
    if(this.employeeObj._id == undefined) {
      this.saveInDB();
    } else {
      this.updateInDB(this.employeeObj._id);
    }
  }

  saveInDB() {
    this.httpService.postRequest(this.formData, "employeeApi").subscribe( (response: any) => {
      console.log(response);      
      console.log(response.responseCode);      
    }, (error: any) => {
      console.log(error);
    });
    // this.router.navigate(['employee-list']); not work
    this.previousPage();
  }

  updateInDB(id: string) {
    this.httpService.putRequest(this.formData, "employeeApi", id).subscribe( (response: any) => {
      console.log(response);      
      console.log(response.responseCode);      
    }, (error: any) => {
      console.log(error);
    });
     this.router.navigate(['employee-list']);  
    // this.previousPage();
  }

  previousPage(): void {
    this.location.back();
  }

  fetchRecord(id: string) {
      this.httpService.getRequestById('employeeApi', id).subscribe( (response: any) => { 
        this.employeeObj = response[0];
      //  console.log(this.employeeObj);
        // console.log(this.employeeObj._id);
      })
  }
}
