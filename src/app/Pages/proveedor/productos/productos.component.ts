import { Component, OnInit } from '@angular/core';
import { EasingLogic } from 'ng2-page-scroll';
import { ProductService } from 'src/app/services/product.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { ValidatorsService } from 'src/app/util/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private productService: ProductService, private validate: ValidatorsService, private storage: StorageServiceService) { }

  products:any;
  toedit: boolean = false;

  productName:string='';
  price:number;
  description:string = '';
  imagen: any;
  productId:any;

  nameValidateMsg: string;
  priceValidateMsg: string;
  descValidateMsg: string;
  imgValidateMsg: string;


  ngOnInit(): void {
    this.productService.getProducts().subscribe((productSnapshot)=>{
      this.products = [];
      productSnapshot.forEach((productData)=>{
        this.products.push({
          nombre: productData.payload.doc.data()['nombre'],
          precio: productData.payload.doc.data()['precio'],
          description: productData.payload.doc.data()['descripcion'],
          imagen: productData.payload.doc.data()['image'],
          id: productData.payload.doc.data()['idProveedor'],
          idproduct: productData.payload.doc.id
        });
      });
    });
    if(this.productName == '' && this.price == null && this.description == ''){
      this.toedit = false;
    }
  }

  myEasing: EasingLogic = {
    ease: (t: number, b: number, c: number, d: number): number => {
        // easeInOutExpo easing
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  };


  selectFile(event) {
		var mimeType = event.target.files[0].type;
		if (mimeType.match(/image\/*/) == null) {
      Swal.fire({icon: 'error',title: 'Error al cargar archivo',text: 'Solo puede subir imagenes'});
		} else{
      this.imagen = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  validateForm(){
    this.nameValidateMsg = this.validate.ValidateNotEmpty(this.productName);
    this.priceValidateMsg = this.validate.validateNumber(this.price);
    this.descValidateMsg = this.validate.ValidateNotEmpty(this.description);
    if(this.validate.ValidateNotEmpty(this.productName) === null && this.validate.validateNumber(this.price) === null
        && this.validate.ValidateNotEmpty(this.description) === null && this.imagen != null){
      this.imgValidateMsg = null;
      return true;
    }else{
      this.imgValidateMsg = '*debe agregar una imagen';
      return false;
    }
  }

  addProduct(){
    if(this.validateForm()){
      Swal.fire({
        title: 'Cargando',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 2000,
        onOpen: () => {
          Swal.showLoading();
          this.uploadFile();
        }
      }).then(() => {
        Swal.fire({icon: 'success', title: 'Producto agregado'});
      }).catch((e)=>{
        Swal.fire({icon: 'error', title: 'Error al agregar producto', text: e});
      });
    }
  }

  uploadFile(){
    try {
      let ref = this.storage.reference(this.imagen.name);
      this.storage.upToStorage(this.imagen.name, this.imagen).then(()=>{
        ref.getDownloadURL().subscribe((urlD)=>{
          this.productService.addProduct({
            nombre: this.productName,
            precio: this.price,
            descripcion: this.description,
            image: urlD,
            idProveedor: localStorage.getItem('id'),
            proveedor: localStorage.getItem('username'),
            qrAr: 'https://firebasestorage.googleapis.com/v0/b/roomfest-a6feb.appspot.com/o/qrExample.png?alt=media&token=0c3b23e3-0471-414b-bc0d-c154bf559037',
            vumark: ''
          }).then(() => {
            this.resetForm();
          });
        });
      });
    } catch (error) {
      Swal.fire({icon: 'error', title: 'Error al agregar producto', text: 'Error al intentar subir imagen'});
    }
  }

  setDataToEdit(index:any){
    this.productName = this.products[index].nombre;
    this.price = this.products[index].precio;
    this.description = this.products[index].description;
    this.productId = this.products[index].idproduct;
    this.toedit = true;
  }

  updateProduct(){
    if(this.validateForm()){
      let ref = this.storage.reference(this.imagen.name);
      Swal.fire({
        title: 'Cargando',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 2000,
        onOpen: () => {
          Swal.showLoading();
          this.storage.upToStorage(this.imagen.name, this.imagen).then(()=>{
            ref.getDownloadURL().subscribe((urlD)=>{
              this.productService.updateProductData(this.productId, {
                nombre: this.productName,
                precio: this.price,
                descripcion: this.description,
                image: urlD,
              });
            });
          }).catch((e)=>{
            Swal.fire({icon: 'error', title: 'Error al agregar producto', text: 'Error al intentar subir imagen'});
          });
        },
      }).then(() => {
        this.resetForm();
        this.toedit = false;
        Swal.fire({icon: 'success', title: 'Información del producto actualizada'});
      }).catch((e)=>{
        Swal.fire({icon: 'error', title: 'Error al actualizar información', text: e});
      });
    }
  }

  deleteProduct(index:any){
    Swal.fire({
      title: '¿Esta seguro de querer eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si',
      cancelButtonText: 'no'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cargando',
          allowEscapeKey: false,
          allowOutsideClick: false,
          timer: 2000,
          onOpen: () => {
            Swal.showLoading();
            this.productService.deleteProduct(this.products[index].idproduct);
          }
        }).then(() => {
          Swal.fire({icon: 'success', title: 'Producto eliminado con exito'});
        }).catch((err)=>{
          Swal.fire({icon: 'error', title: 'Error al intentar eliminar producto'});
        });
      }
    });
  }

  resetForm(){
    this.productName = '';
    this.price = null;
    this.description = '';
  }

}
