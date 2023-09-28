import { Component, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

  dataArray: []= [];
  serverImgrUrl: string = 'http://127.0.0.1:8000';

  constructor(private matDialog: MatDialog, private httpService: HttpService, private route: Router,
     private ngZone: NgZone) {}

  ngOnInit() {
    this.fetchData();
  }

  openAddModal(): void {
    const matDialogRef = this.matDialog.open(AddEditEmployeeComponent, {
      height: '65%',
      width: '40%',
      data: { isEdditing: false}
  });
    matDialogRef.afterClosed().subscribe(result => {
    console.log("Dialog closed");
  });
  }

  fetchData() {
    this.httpService.getRequest("employeeApi").subscribe((response: any) => {
       this.dataArray = response;
              console.log("--------Fetched data--------",this.dataArray);
    }, (err: any) => {
      console.log("Not fetched ----", err);
  });
  }

  deleteEmployee(id: string): void {
    // console.log("deleted id -----", id);
    this.httpService.deleteRequest("employeeApi", id).subscribe((response: any)=> {
    // console.log("deleted--------", response);
    }, (err: any) => {
        console.log("Not Deleted ----", err);
    });
    this.fetchData();
  }

  openAddEditPage(id: string) {
    console.log(id);
    this.ngZone.run(() => this.route.navigate(['add-edit-employee', id]));
  }

  openEditModal(id: string) {
    this.matDialog.open(AddEditEmployeeComponent, {
      height: '65%',
      width: '40%',
      data: {isEdditing: true, employeId: id}
  });
  }
}
