import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from 'src/app/Pages/admin-page/admin-page.component';
import { ManageProductsComponent } from 'src/app/Pages/admin-page/manage-products/manage-products.component';
import { ManageUsersComponent } from 'src/app/Pages/admin-page/manage-users/manage-users.component';
import { MangaEventsComponent } from 'src/app/Pages/admin-page/manga-events/manga-events.component';
import { ProductViewComponent } from './Pages/Global/product-view/product-view.component';
import { GuestComponent } from 'src/app/Pages/guest/guest.component';
import { HomepageComponent } from 'src/app/Pages/Homepage/homepage.component';
import { PerfilProveedorComponent } from 'src/app/Pages/proveedor/perfil-proveedor/perfil-proveedor.component';
import { ProductosComponent } from 'src/app/Pages/proveedor/productos/productos.component';
import { ProveedorComponent } from 'src/app/Pages/proveedor/proveedor.component';
import { SolicitudesComponent } from 'src/app/Pages/proveedor/solicitudes/solicitudes.component';
import { CreateEventComponent } from 'src/app/Pages/roompage/create-event/create-event.component';
import { MyEventsComponent } from 'src/app/Pages/roompage/my-events/my-events.component';
import { ProfileComponent } from 'src/app/Pages/roompage/profile/profile.component';
import { RoompageComponent } from 'src/app/Pages/roompage/roompage.component';
import { SignupPageComponent } from 'src/app/Pages/SignUp/signup-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'homepage', pathMatch: 'full' },
  {path: 'homepage', component: HomepageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'roompage', component: RoompageComponent, children: [
    {path: '', redirectTo: 'my-events', pathMatch: 'full' },
    {path: 'my-events', component: MyEventsComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'create', component: CreateEventComponent,},
    {path: 'edit-event', component: CreateEventComponent}
  ]},
  {path: 'proveedor', component: ProveedorComponent, children: [
    {path: '', redirectTo: 'account', pathMatch: 'full'},
    {path: 'account', component: PerfilProveedorComponent},
    {path: 'solicitudes', component: SolicitudesComponent},
    {path: 'productos', component: ProductosComponent},
  ]},
  {path: 'admin', component: AdminPageComponent, children:[
    {path: '', redirectTo: 'users', pathMatch: 'full'},
    {path: 'users', component: ManageUsersComponent},
    {path: 'manage-events', component: MangaEventsComponent},
    {path: 'manage-products', component: ManageProductsComponent},
  ]},
  {path:'guest', component:GuestComponent},
  {path:'product-view', component: ProductViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
