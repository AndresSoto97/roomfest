import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bodyroom',
  templateUrl: './bodyroom.component.html',
  styleUrls: ['./bodyroom.component.css']
})
export class BodyroomComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    $(document).ready(function(){
      $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });
    });
  }

  logOut(){
    Swal.fire({
      title: '¿Esta seguro de querer cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('type');
        this.router.navigate(['homepage']);
      }
    });
  }

}
