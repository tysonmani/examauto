import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $: any;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable,Subject,combineLatest} from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
	  startAt = new Subject();
  endAt = new Subject();

startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
zip:boolean = false;
zip1:boolean = false;
QID:string;
name:string;
score:number;
rank:number[]=[];
quest;
exists:string;
i:number=0;
  constructor(private router: Router,private formBuilder: FormBuilder,private afs: AngularFirestore,private auth:AuthService) { }

  ngOnInit() {
const db = firebase.firestore();
var hello = this;
this.QID=localStorage.getItem("leadpap");
	this.auth.getexamers(this.QID).subscribe(data123 => {
  	  if(data123!='')
      {
      	this.zip = false;
  		this.zip1 = false;
    			/*console.log(data123[hello.i].user);
    	db.collection('UsersResults').doc(localStorage.getItem("epid"))
.collection("Results")
.where('user', '==', data123[hello.i].user).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
		doc.ref.update({rank:hello.i+1});
		hello.i++;
		console.log(hello.i,data123);
    });
      } 
    else {
       
      }
         });*/
        	        this.quest = data123;
    //this.rank[i]=i+1;
   // console.log(this.rank[0],this.quest[0].user);
	}
	else
	{
		this.zip1 = true;
  		this.zip = true;
		this.exists = "This Exam is not yet conducted by the admin!!";
	}
    });
        combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((clubs) => {
      	 if(clubs!='')
        {
       	this.zip = false;
        this.quest = clubs;
    	}
    	else
    	{
    		this.zip = true;
    		this.exists = "There is no such user avalaible!!";
    	}
      })
    })
}

onKey(event: any)
{
	let q = event.target.value;
	//console.log(q);
	    if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    else {
     this.auth.getexamers(this.QID).subscribe(data123 => {
    this.zip = false;
    this.quest = data123
    });
    }
}

  firequery(start, end): Observable<any>
{
    return this.afs.collection('UsersResults').doc(localStorage.getItem("epid"))
       .collection('Results', ref => ref.orderBy('user').startAt(start).endAt(end)).valueChanges();
}


}
