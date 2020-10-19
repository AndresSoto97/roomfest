import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ValidatorsService } from 'src/app/util/validators.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { EventsService } from 'src/app/services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { title } from 'process';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  @ViewChild('mes') mes:ElementRef

  constructor(
    private storageService:StorageServiceService,
    private validate: ValidatorsService,
    private firestore: EventsService,
    private routeActive: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private solictudService: SolicitudService
  ) { }

  anio: number = new Date().getFullYear();
  anios = [];
  meses = Array.from(Array(12).keys());
  horas = Array.from(Array(12).keys());
  minutos = Array.from(Array(60).keys());
  dias = [];
  horarios = ['am','pm'];
  url: any;
  image1: any;
  image2: any;
  image3: any;
  images = [];
  urls = [];
  guests = [];
  guestEmail: string = '';
  type:string;
  id:any;

  title:string = '';
  description:string = '';
  address:string = '';
  monthSelected:number = 1;
  daySelected:number = 1;
  yearSelected:any = new Date().getFullYear();
  hourSelected:number = 1;
  minuteSelected:number = 0;
  amOrpm:string = 'am';

  titleErrorMsg:string;
  descriptionErrorMsg:string;
  addErrorMsg:string;
  guestErrorMsg:string;

  products = [];

  ngOnInit(): void {
    this.dias = Array.from(Array(31).keys());
    for(let i = 0; i<4; i++){
      this.anios.push(this.anio+i);
    }

      if(this.routeActive.snapshot.params.type == 'editar'){
        this.type = this.routeActive.snapshot.params.type;
        this.id = this.routeActive.snapshot.params.id;
        this.title = this.routeActive.snapshot.params.titulo;
        this.description = this.routeActive.snapshot.params.description;
        this.address = this.routeActive.snapshot.params.address;
        this.monthSelected = parseInt(this.routeActive.snapshot.params.day.split('/')[1]);
        this.daySelected = parseInt(this.routeActive.snapshot.params.day.split('/')[0]);
        this.yearSelected = parseInt(this.routeActive.snapshot.params.day.split('/')[2]);
        this.hourSelected = parseInt(this.routeActive.snapshot.params.hour.split(':')[0]);
        this.minuteSelected = parseInt(this.routeActive.snapshot.params.hour.split(':')[1]);
        this.amOrpm = this.routeActive.snapshot.params.hour.split(' ')[1];
        this.guests = this.routeActive.snapshot.params.guests.split(',');
        this.urls = this.routeActive.snapshot.params.images.split(',');
        this.url = this.urls[0];
      }
    console.log(this.dias);
    this.productService.getAllProducts().subscribe((productSnapshot) => {
      this.products = [];
      productSnapshot.forEach((productData)=>{
        this.products.push({
          nombre: productData.payload.doc.data()['nombre'],
          precio: productData.payload.doc.data()['precio'],
          description: productData.payload.doc.data()['descripcion'],
          image: productData.payload.doc.data()['image'],
          idProveedor: productData.payload.doc.data()['idProveedor'],
          id: productData.payload.doc.id,
          qr: productData.payload.doc.data()['qrAR'],
          vumark: productData.payload.doc.data()['vumark']
        });
      });
    });
  }

  onChange(mes:number){
    if(mes == 2)
      this.dias = Array.from(Array(28).keys());
    else
      if(mes == 4 || mes == 6 || mes == 9 || mes == 11)
        this.dias = Array.from(Array(30).keys());
      else
        this.dias = Array.from(Array(31).keys());
  }

  selectFile(event, imgId:number) {
		var mimeType = event.target.files[0].type;
		if (mimeType.match(/image\/*/) == null) {
      Swal.fire({icon: 'error',title: 'Error al cargar archivo',text: 'Solo puede subir imagenes'});
      //this.images.splice(event.target.files[0]);
		} else{
      this.images.splice(imgId, 0,event.target.files[0]);
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        switch (imgId) {
          case 0: this.url = reader.result;break;
          case 1: this.image1 = reader.result;break;
          case 2: this.image2 = reader.result;break;
          case 3: this.image3 = reader.result;break;
        }
      }
    }
  }

  validateForm():boolean {
    if(this.validate.ValidateNotEmpty(this.title) === null && this.validate.ValidateNotEmpty(this.description) === null
        && this.validate.ValidateNotEmpty(this.address) === null && this.guests.length > 0){
          this.titleErrorMsg = null;
          this.descriptionErrorMsg = null;
          this.addErrorMsg = null;
          this.guestErrorMsg = null;
      return true;
    }else{
      this.titleErrorMsg = this.validate.ValidateNotEmpty(this.title);
      this.descriptionErrorMsg = this.validate.ValidateNotEmpty(this.description);
      this.addErrorMsg = this.validate.ValidateNotEmpty(this.address);
      this.guestErrorMsg = '*Debe haber al menos 1 invitado en tu evento';
      console.log(this.images);
      return false;
    }
  }

  async registerEvent(){
    if(this.validateForm()){
      if(this.url == null){
        Swal.fire({icon: 'warning',title: 'Advertencía',text: 'Debe subir aunque sea la foto representativa'});
      } else{
        let day = this.daySelected < 10? '0'+this.daySelected : this.daySelected;
        let month = this.monthSelected < 10? '0'+this.monthSelected : this.monthSelected;
        let hour = this.hourSelected < 10? '0'+this.hourSelected : this.hourSelected;
        let minute = this.minuteSelected < 10? '0'+this.minuteSelected : this.minuteSelected;
        let data = {
          titulo: this.title,
          description: this.description,
          direccion: this.address,
          dia: day+'/'+month+'/'+this.yearSelected,
          hora: hour+':'+minute+' '+this.amOrpm,
          invitados: this.guests
        };
        this.firestore.createEvent(data).then((doc) =>{
          this.uploadFile(doc.id);
          Swal.fire({icon:'success',title:'Felicidades', text:'Su evento ha sido creado con exito'}).then(() =>{
            this.router.navigate(['roompage/my-events']);
          });
        });
        console.log('registrado exitosamente');
      }
    } else {
      console.log('intente de nuevo');
    }
  }

  async uploadFile(id:any){
    try {
      for(let i=0; i < this.images.length; i++){
        let ref = this.storageService.reference(this.images[i].name);
        this.storageService.upToStorage(this.images[i].name, this.images[i]).then(()=>{
          ref.getDownloadURL().subscribe((urlD)=>{
            this.urls.push(urlD);
            this.firestore.updateEvent({
              images: this.urls
            }, id);
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  _updateEvent(){
    if(this.validateForm()){
      let day = this.daySelected < 10? '0'+this.daySelected : this.daySelected;
      let month = this.monthSelected < 10? '0'+this.monthSelected : this.monthSelected;
      let hour = this.hourSelected < 10? '0'+this.hourSelected : this.hourSelected;
      let minute = this.minuteSelected < 10? '0'+this.minuteSelected : this.minuteSelected;
      let data = {
        titulo: this.title,
        description: this.description,
        direccion: this.address,
        dia: day+'/'+month+'/'+this.yearSelected,
        hora: hour+':'+minute+' '+this.amOrpm,
        images: this.urls,
        invitados: this.guests
      };
      this.firestore.updateEvent(data, this.id).then(() =>{
        Swal.fire({icon:'success',title:'Felicidades', text:'Su evento ha sido actualizado con exito'}).then(() =>{
          this.router.navigate(['roompage/my-events']);
        });
      });
    }

  }

  _addGuests(){
    console.log(this.guests);
    if(this.validate.validateGuest(this.guestEmail) == null){
      this.guests.push(this.guestEmail);
      this.guestErrorMsg = null;
      this.guestEmail = '';
    } else{
      this.guestErrorMsg = this.validate.validateGuest(this.guestEmail);
    }
  }

  sendRequest(product:any){
    if(this.validateForm()){
      let day = this.daySelected < 10? '0'+this.daySelected : this.daySelected;
      let month = this.monthSelected < 10? '0'+this.monthSelected : this.monthSelected;
      this.solictudService.createRequest(product.idProveedor, {
        direccion: this.address,
        estado: 'en espera',
        fecha: day+'/'+month+'/'+this.yearSelected,
        nombre: localStorage.getItem('username'),
        producto: product.nombre,
        idCliente: localStorage.getItem('id'),
        emailCliente: localStorage.getItem('email')
      }).then((doc)=>{
        this.solictudService.updateRequest(product.idProveedor, doc.id, {id: doc.id}).then(()=>{
          Swal.fire({icon: 'success', title: 'Solicitud de contratación enviada'});
        }).catch((err)=>{
          Swal.fire({icon: 'error', title: 'Error al eviar solicitud'});
        });
      });
    }else{
      Swal.fire({icon: 'warning', title: 'Debe llener los campos anteriores antes de solicitar este producto'});
    }
  }

}
