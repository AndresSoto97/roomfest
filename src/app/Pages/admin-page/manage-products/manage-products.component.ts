import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  constructor(private productService: ProductService, private storage: StorageServiceService) { }

  products = [];
  imagen:any;

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((productSnapshot)=>{
      this.products = [];
      productSnapshot.forEach((productData)=>{
        this.products.push({
          id: productData.payload.doc.id,
          data: productData.payload.doc.data()
        })
      });
    });
  }

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

  updateVM(id:any){
    Swal.fire({
      title: 'Cargando',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      onOpen: () => {
        Swal.showLoading();
        this.uploadImage(id);
      }
    }).then(() => {
      Swal.fire({icon: 'success', title: 'Vumark del producto agregado'});
    }).catch((e)=>{
      Swal.fire({icon: 'error', title: 'Error al agregar Vumark', text: e});
    });
  }

  uploadImage(id:any){
    try {
      let ref = this.storage.reference(this.imagen.name);
      this.storage.upToStorage(this.imagen.name, this.imagen).then(()=>{
        ref.getDownloadURL().subscribe((urlD)=>{
          this.productService.updateProductData(id,{
            vumark: urlD
          }).then(() => {
            this.imagen = null;
          });
        });
      });
    } catch (error) {
      Swal.fire({icon: 'error', title: 'Error al agregar Vumark', text: 'Error al intentar subir imagen'});
    }
  }

  deleteProduct(id:any){
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
            this.productService.deleteProduct(id);
          }
        }).then(() => {
          Swal.fire({icon: 'success', title: 'Producto eliminado con exito'});
        }).catch((err)=>{
          Swal.fire({icon: 'error', title: 'Error al intentar eliminar producto'});
        });
      }
    });
  }

}
