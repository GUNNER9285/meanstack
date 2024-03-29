import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activedRouter: ActivatedRoute,
    private crudService: CrudService
  ) { 
    this.getId = this.activedRouter.snapshot.paramMap.get('id');

    this.crudService.GetBook(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        price: res['price'],
        description: res['description'],
      })
    })

    this.updateForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: [''],
    })
  }

  ngOnInit(): void {
  }

  onUpdate(): any {
    this.crudService.UpdateBook(this.getId, this.updateForm.value)
    .subscribe(() => {
      this.ngZone.run(() => this.router.navigateByUrl('/book-list'))
    }, (err) => {
      console.log(err);
    })
  }

}
