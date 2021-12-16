import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SayingsService } from 'src/app/services/sayings.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  sayings: any[] = [];
  
  constructor(
    private sayingsService: SayingsService,
    private formBuilder: FormBuilder,

  ) { }

  checkForm: FormGroup = this.formBuilder.group({
    checkArray: this.formBuilder.array([])
  });

  textForm = new FormControl('');

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.sayingsService.getAllSayings('alliecat').subscribe((res: any) => {
      this.sayings = res;
      this.sayings.forEach(saying => {
        if (saying?.active?.S === 'A') {
          const checkArray: FormArray = this.checkForm.get('checkArray') as FormArray;
          if (!checkArray.controls.includes(saying?.sayingId?.S)) {
            checkArray.push(new FormControl(saying?.sayingId?.S));
          }
        }
      })
    });
  }

  shuffleAllSayings() {
    this.sayingsService.setToShuffle('alliecat').subscribe(() => {
      this.refreshData();
    });
  }

  setSaying() {
    console.log(this.checkForm.value);
    this.sayingsService.setSaying(this.checkForm.value.checkArray, 'alliecat').subscribe(() => {
      this.refreshData();
    });
  }

  addNewSaying() {
    this.sayingsService.addSaying('alliecat', this.textForm.value).subscribe(() => {
      this.refreshData();
    });
  }

  deleteSaying() {
    this.checkForm.value.checkArray.forEach((val: any) => {
      this.sayingsService.deleteSaying(val).subscribe(() => {
        this.refreshData();
      });
    })
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.checkForm.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
