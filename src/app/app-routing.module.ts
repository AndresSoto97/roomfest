import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './Pages/admin-page/admin-page.component';
import { ManageUsersComponent } from './Pages/admin-page/manage-users/manage-users.component';
import { ProductViewComponent } from './Pages/Global/product-view/product-view.component';
import { GuestComponent } from './Pages/guest/guest.component';
import { HomepageComponent } from './Pages/Homepage/homepage.component';
import { PerfilProveedorComponent } from './Pages/proveedor/perfil-proveedor/perfil-proveedor.component';
import { ProductosComponent } from './Pages/proveedor/productos/productos.component';
import { ProveedorComponent } from './Pages/proveedor/proveedor.component';
import { SolicitudesComponent } from './Pages/proveedor/solicitudes/solicitudes.component';
import { CreateEventComponent } from './Pages/roompage/create-event/create-event.component';
import { MyEventsComponent } from './Pages/roompage/my-events/my-events.component';
import { ProfileComponent } from './Pages/roompage/profile/profile.component';
import { RoompageComponent } from './Pages/roompage/roompage.component';
import { SignupPageComponent } from './Pages/SignUp/signup-page.component';

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

  ]},
  {path:'guest', component:GuestComponent},
  {path:'product-view', component: ProductViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
