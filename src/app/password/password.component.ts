import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
declare var $: any;
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

EmailForm: FormGroup;
  OtpForm: FormGroup;
  	SignupForm: FormGroup;
  otp123:string;
  emailsuc:boolean = false;
  bool:boolean = false;
  bool1:boolean = false;
  bool2:boolean = false;
  status:string = "Nothing!!";
  constructor(private router: Router,private formBuilder: FormBuilder,private otpBuilder: FormBuilder,private auth:AuthService,private afs: AngularFirestore) { }

  ngOnInit() {
  	this.createform();
  	    $(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});
  }

createform()
{
this.EmailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email] ]
    });
this.OtpForm = this.otpBuilder.group({
      otp: ['', [Validators.required, Validators.pattern,Validators.min(1000),, Validators.max(9999)] ]
    });
this.SignupForm = this.formBuilder.group({
     password: ['', [Validators.required, Validators.pattern] ],
     cpassword: ['', [Validators.required, Validators.pattern] ]
    });
}

onSubmit()
{
if(this.EmailForm.value.email=="")
{
this.router.navigate(['password']);
}
else
{
   this.auth.sendmail(this.EmailForm.value.email).subscribe((data) => {
    if (data) {
     this.otp123 = JSON.stringify(data);
      //console.log('mail sent');
            }
         });

	this.emailsuc = true; 
}

}
onSubmitotp()
{
	if(this.OtpForm.value.otp == this.otp123)
	{
		$('#myModal1').modal('show');
	}
	else
		$('#myModal').modal('show');
}
onpassword()
{
	$('[data-toggle="tooltip"]').tooltip('dispose');
	  const db = firebase.firestore();
  var hello = this;
  if(hello.SignupForm.value.password == hello.SignupForm.value.cpassword)
  {
	     db.collection('UserDetails')
	     .where('email', '==',this.EmailForm.value.email).get()
      .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
          // console.log("bufoon1");
           doc.ref.update({
           	secretkey:hello.SignupForm.value.password});
         hello.status = "Password Succesfully Updated!!";
         hello.bool=true;
         hello.bool1=false;
         hello.bool2=false;
         setTimeout(()=>{
         	$('#myModal1').modal('hide');
    		hello.router.navigate(['login']);
    		}, 3000)
         });
       }
       else
       {
       	hello.status = "You didn't get registered with us!!";
         hello.bool2=true;
         hello.bool=false;
         hello.bool1=false;
                  setTimeout(()=>{
                  	$('#myModal1').modal('hide');
    		hello.router.navigate(['verify']);
    		}, 3000)
       }
     });
  }
  else
  {
  	this.status = "Password and ConfirmPassword are not same!!";
  	this.bool1=true;
 	this.bool=false;
 	this.bool2=false;
  }

}

}
