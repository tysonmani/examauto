import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
declare var $: any;
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
EmailForm: FormGroup;
  OtpForm: FormGroup;
  otp123:string;
  emailsuc:boolean = false;
  //otpfail:boolean = false;
  constructor(private router: Router,private formBuilder: FormBuilder,private otpBuilder: FormBuilder,private auth:AuthService,private afs: AngularFirestore) { }

  ngOnInit() {
  	this.createform();
  }

createform()
{
this.EmailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email] ]
    });
this.OtpForm = this.otpBuilder.group({
      otp: ['', [Validators.required, Validators.pattern,Validators.min(1000),, Validators.max(9999)] ]
    });
}

onSubmit()
{
if(this.EmailForm.value.email=="")
{
  //console.log("hello");
this.router.navigate(['verify']);
}
else
{

const db = firebase.firestore();
	var hello = this;
	//console.log(hello.LoginForm.value.password);
 	 db.collection('UserDetails')
 	 .where("email", "==", this.EmailForm.value.email)
	.get()
	.then(function(querySnapshot) {
 	if (querySnapshot.size > 0) {
 		//console.log(querySnapshot.docs[0].data());
 		$('#myModal1').modal('show');
 		    hello.EmailForm.reset({
      email: ''
    });
  		} 
  	else {
  		//console.log("No such document!");
  		//console.log(typeof hello.LoginForm.value.password);
    	  	hello.auth.sendmail(hello.EmailForm.value.email).subscribe((data) => {
            if (data) {
            	hello.otp123 = JSON.stringify(data);
              console.log('mail sent');
              }
         });

	hello.emailsuc = true;


  		}
    })
    .catch(function(error) {
        //console.log("Error getting documents: ", error);
    });

  
}

}
onSubmitotp()
{
	if(this.OtpForm.value.otp == this.otp123)
	{
		this.auth.setsignedup(true);
		this.router.navigate(['signup']);
	}
	else
		$('#myModal').modal('show');
}

}
