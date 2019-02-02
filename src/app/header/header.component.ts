import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
user:string;
bool:boolean = true;
  constructor(private auth:AuthService,private router: Router) { }

  ngOnInit() {
  	//console.log(typeof localStorage.getItem('loggeduser'));
  	this.user = this.auth.getuser();
  	if(this.user == null)
  	{
  		this.user = "Login";
  		this.bool = false;
  	}
    window.onload = ()=> {
  (<any>window).jQuery
     $(document).ready(()=> {
        $(".sidebarNavigation .navbar-collapse")
          .hide()
          .clone()
          .appendTo("body")
          .removeAttr("class")
          .addClass("sideMenu")
          .show(),
          $("body").append("<div class='overlay'></div>"),
          $(".sideMenu").addClass(
            $(".sidebarNavigation").attr("data-sidebarClass")
          ),
          $(".navbar-toggle, .navbar-toggler").on("click", ()=> {
            $(".sideMenu, .overlay").toggleClass("open"),
              $(".overlay").on("click", ()=> {
                $(this).removeClass("open"), $(".sideMenu").removeClass("open");
              });
          }),
          $("body").on("click", ".sideMenu.open .nav-item", ()=> {
            $(this).hasClass("dropdown") ||
              $(".sideMenu, .overlay").toggleClass("open");
          }),
          $(window).resize(()=> {
            $(".navbar-toggler").is(":hidden")
              ? $(".sideMenu, .overlay").hide()
              : $(".sideMenu, .overlay").show();
          });
      })
     console.log("sidebarNavigation Requires jQuery");
};
  }
  logout()
  {
    this.bool = false;
  	localStorage.removeItem('loggeduser');
  	localStorage.removeItem('loggedin');
  	localStorage.removeItem('signedup');
  	this.router.navigate(['login']);
  }
}
