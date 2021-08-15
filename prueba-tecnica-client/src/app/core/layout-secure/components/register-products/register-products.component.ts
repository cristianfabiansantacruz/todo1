import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertService, TYPES } from 'src/app/core/servicios/alert.service';
import { ProductService } from 'src/app/core/servicios/product.service';

@Component({
  selector: 'app-register-products',
  templateUrl: './register-products.component.html',
  styleUrls: ['./register-products.component.css']
})
export class RegisterProductsComponent implements OnInit {

  public form: FormGroup;

  public error: string;

  @ViewChild('formV', { static: false }) formV: NgForm;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      detalle: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      stock: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      precio: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      codigoProducto: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    });
  }

  public registerProduct() {
    this.error = null;
    this.alertService.loading();
    this.form.controls.precio.setValue(parseFloat(this.form.controls.precio.value));
    this.productService.registerProduct(this.form.value)
      .toPromise()
      .then(res => {
        console.log(res);
        this.alertService.message("Producto Registrado con exito", TYPES.SUCCES);
        this.formV.resetForm();
      })
      .catch(err => {
        this.error = err;
        console.log(err);
        this.alertService.close();
      });
  }

}
