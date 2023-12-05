import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-employee-doc',
  templateUrl: './employee-doc.component.html',
  styleUrls: ['./employee-doc.component.css']
})
export class EmployeeDocComponent {

  employeeId: string = '';
  fileExp: string = '';
  fileRes: string = '';
  formData = new FormData;


  constructor(private activateRoute: ActivatedRoute, private http: HttpService, private router: Router) {
      this.activateRoute.params.subscribe((data) => {
        if(data['id'] != undefined) {
          this.formData.append('e_id',data['id']);
        }
      });
  }

  docsForm= new FormGroup({
    file1: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    file2: new FormControl('', [Validators.required])
  });

  get file1() {
    return this.docsForm.get('file1');
  }
  get file2() {
    return this.docsForm.get('file2');
  }

  
  onSelectImg (event: any) {
    // console.log(event.target.files);
    // console.log(event.target.value ,"is path of file");
    // console.log(event.target.name ,"is name field value");
    if(event.target.name == "doc1") {
      this.fileExp = event.target.value;  
      this.formData.append(event.target.name, event.target.files[0]);
    } else {
      this.fileRes = event.target.value;
      this.formData.append(event.target.name, event.target.files[0]);
    }

  }

  onSubmit() {
    //console.log(this.docsForm.controls,"---------form");
    for(let controlName in this.docsForm.controls) {
      //const control = this.docsForm.controls[controlName]; //this line give error because TypeScript cannot determine the type of this.docsForm.controls[controlName] with certainty. 
        const control = this.docsForm.get(controlName) as FormControl;
        this.formData.append(controlName, control.value);
    }
    console.log(this.formData,"------------formData");
    this.saveInDB(this.formData);
  }

  saveInDB(formData: any) {
    try{
    this.http.postRequest(formData, 'employeeDoc').subscribe((response: any) => {
      console.log(response);
    })
  } catch(err) {
    console.log(err);
    
  }
  }

  backList() {
    this.router.navigate(['/employee-list']);
  }

}
