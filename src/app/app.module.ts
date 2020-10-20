import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderHomepageComponent } from './Pages/Homepage/header-homepage/header-homepage.component';
import { LoginFormComponent } from './Pages/Homepage/login-form/login-form.component';
import { MoreinfoComponent } from './Pages/Homepage/moreinfo/moreinfo.component';
import { AboutusComponent } from './Pages/Homepage/aboutus/aboutus.component';
import { FooterComponent } from './Pages/Homepage/footer/footer.component';
import { SignupPageComponent } from './Pages/SignUp/signup-page.component';
import { HomepageComponent } from './Pages/Homepage/homepage.component';
import { SignupFormComponent } from './Pages/SignUp/signup-form/signup-form.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { RoompageComponent } from './Pages/roompage/roompage.component';
import { NavbarComponent } from './Pages/Global/navbar/navbar.component';
import { MyEventsComponent } from './Pages/roompage/my-events/my-events.component';
import { CreateEventComponent } from './Pages/roompage/create-event/create-event.component';
import { BodyroomComponent } from './Pages/roompage/bodyroom/bodyroom.component';
import { CardEventComponent } from './Pages/roompage/my-events/card-event/card-event.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ProfileComponent } from './Pages/roompage/profile/profile.component';
import { ProveedorComponent } from './Pages/proveedor/proveedor.component';
import { PerfilProveedorComponent } from './Pages/proveedor/perfil-proveedor/perfil-proveedor.component';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { SolicitudesComponent } from './Pages/proveedor/solicitudes/solicitudes.component';
import { ProductosComponent } from './Pages/proveedor/productos/productos.component';
import { GuestComponent } from './Pages/guest/guest.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProductViewComponent } from './Pages/Global/product-view/product-view.component';
import { AdminPageComponent } from './Pages/admin-page/admin-page.component';
import { ManageUsersComponent } from './Pages/admin-page/manage-users/manage-users.component';
import { MangaEventsComponent } from './Pages/admin-page/manga-events/manga-events.component';
import { ManageProductsComponent } from './Pages/admin-page/manage-products/manage-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderHomepageComponent,
    LoginFormComponent,
    MoreinfoComponent,
    AboutusComponent,
    FooterComponent,
    SignupPageComponent,
    HomepageComponent,
    SignupFormComponent,
    RoompageComponent,
    NavbarComponent,
    MyEventsComponent,
    CreateEventComponent,
    BodyroomComponent,
    CardEventComponent,
    ProfileComponent,
    ProveedorComponent,
    PerfilProveedorComponent,
    SolicitudesComponent,
    ProductosComponent,
    GuestComponent,
    ProductViewComponent,
    AdminPageComponent,
    ManageUsersComponent,
    MangaEventsComponent,
    ManageProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
    Ng2PageScrollModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
