import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService, TYPES } from 'src/app/core/servicios/alert.service';
import { ProductService } from 'src/app/core/servicios/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  public form: FormGroup;

  public displayedColumns: string[] = ['codigoProducto', 'nombre', 'detalle', 'stock', 'precio', 'options'];

  public dataSource: MatTableDataSource<Object>;

  public listCarrito: any = [];

  public displayedColumns2: string[] = ['codigoProducto', 'cantidadAumentarRestar', 'options'];

  public dataSource2: MatTableDataSource<Object>;

  @ViewChild('formV', { static: false }) formV: NgForm;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({

    });

    this.loadProducts();
  }

  public loadProducts() {
    this.productService.getProducts().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.alertService.showError(error.error.error)
      }
    );
  }

  public increment(codigoProducto) {
    this.alertService.loading();
    const modelIncrement =
    {
      "cantidadAumentarRestar": 1,
      "codigoProducto": codigoProducto
    };

    this.productService.increment(modelIncrement)
      .toPromise()
      .then(res => {
        this.loadProducts();
        this.alertService.message("Se incremento con exito", TYPES.SUCCES);
      })
      .catch(err => {
        this.alertService.showError(err.error.error)
      });
  }

  public decrement(codigoProducto) {
    this.alertService.loading();
    const modelIncrement =
    {
      "cantidadAumentarRestar": 1,
      "codigoProducto": codigoProducto
    };

    this.productService.decrement(modelIncrement)
      .toPromise()
      .then(res => {
        this.loadProducts();
        this.alertService.message("Se decremento con exito", TYPES.SUCCES);
      })
      .catch(err => {
        this.alertService.showError(err.error.error)
      });
  }

  public addCarrito(codigoProducto){
    let p = this.listCarrito.find(x => x.codigoProducto === codigoProducto);
    if(p != null){
      p.cantidadAumentarRestar = p.cantidadAumentarRestar + 1;
    }else{
      p = {
        "cantidadAumentarRestar": 1,
        "codigoProducto": codigoProducto
      };
      this.listCarrito.push(p);
    }

    this.dataSource2 = new MatTableDataSource(this.listCarrito);

  }

  public eliminarCarrito(codigoProducto){
    let index = this.listCarrito.findIndex(x => x.codigoProducto === codigoProducto);
    if(index != -1){
      this.listCarrito.splice(index, 1);
      this.dataSource2 = new MatTableDataSource(this.listCarrito);
    }
  }

  public enviarCarrito(){
    this.productService.carrito(this.listCarrito)
      .toPromise()
      .then(res => {
        this.loadProducts();
        console.log(res)
        this.alertService.message(`El carrito se ejecuto con exito \n

        Errores:  \n${res.productoerror}\n

        Valor Total:\n${res.valorTotal}`, 
        TYPES.SUCCES);
        this.listCarrito = [];
        this.dataSource2 = new MatTableDataSource(this.listCarrito);
      })
      .catch(err => {
        console.log(err)
        this.alertService.showError(err.error.error)
      });
  }
}
