import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { MainComponent } from './components/main/main.component';
import { RegisterProductsComponent } from './components/register-products/register-products.component';
import { TemplateComponent } from './template/template.component';


const routes: Routes = [
  {
    path: '', component: TemplateComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'products', component: ListProductsComponent },
      { path: 'register-product', component: RegisterProductsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutSecureRoutingModule { }
