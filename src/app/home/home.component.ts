import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Typed from 'typed.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
bool:boolean = false;
user:string;
spinner1:boolean = true;
  constructor(private router: Router,private formBuilder: FormBuilder,private afs: AngularFirestore,private auth:AuthService) { }

  ngOnInit() {

      setTimeout(()=>{
    $('#myModal9').modal('show');
      }, 5000) 


let options = {
          strings: ["CreateExam!!", "SetTimer!!", "ConductExam!!","LeaderBoard!!"],
          typeSpeed: 100,
          backSpeed: 100,
          showCursor: true,
          cursorChar: "|",
          loop:true
        }

      let typed = new Typed(".typing-element",options);

  	this.user = this.auth.getuser();
  	if(this.user == null)
  	{
  		this.bool = false;
  	}
  	else
  	{
  		this.bool = true;
  	}
    
  }
  demo123()
{
   $('#myModal').modal('show');
}
  demo12()
{
  $('#myModal9').modal('hide');
   $('#myModal').modal('show');
}
start()
{
this.spinner1 = false;
  const db = firebase.firestore();
  var hello = this;
   localStorage.setItem("epid1",'QP59212');
   if(localStorage.getItem("random") === null)
   {
     var ran = Math.floor(10000 + Math.random() * 90000);
      var rdom = '' + ran;
      localStorage.setItem("random",rdom);
      hello.auth.setdemoexamin(true);
      setTimeout(()=>{
    $('#myModal').modal('hide');
    $('#myModal9').modal('hide');
    this.spinner1 = true;
    this.router.navigate(['demo']);
      }, 2000) 
   }
   else
   {
        db.collection('DemoAnswers').doc(localStorage.getItem("random"))
        .collection(localStorage.getItem("epid1"))
      .get()
      .then((querySnapshot)=> {
    querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  });
});
    db.collection('DemoResults').doc(localStorage.getItem("epid1"))
    .collection("Results").where('user', '==',localStorage.getItem("random")).get()
    .then((querySnapshot)=> {
         querySnapshot.forEach((doc)=> {
    doc.ref.delete();
  });
});
localStorage.removeItem('random');
var ran = Math.floor(10000 + Math.random() * 90000);
var rdom = '' + ran;
localStorage.setItem("random",rdom);

      localStorage.removeItem('demoresult'+localStorage.getItem("random"));
      hello.auth.setdemoexamin(true);
      setTimeout(()=>{
    $('#myModal').modal('hide');
    $('#myModal9').modal('hide');
    this.spinner1 = true;
    this.router.navigate(['demo']);
      }, 2000) 

   }
}


}
