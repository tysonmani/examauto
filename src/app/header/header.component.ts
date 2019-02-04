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
