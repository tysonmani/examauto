import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $: any;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable,Subject,combineLatest} from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
sco:number=0;
totsco:number=0;
corans:string;
ans:string;
count:number;
horror:boolean = false;
horror1:boolean = false;
horror2:boolean = false;
status1:boolean;
status2:boolean;
status3:boolean;
temp:number=0;
quest:object={};
lost;
paperber;
numblimit;
paperID:string;
vary:boolean = false;
spinner:boolean = true;
attempt=[0];
  constructor(private router: Router,private formBuilder: FormBuilder,private afs: AngularFirestore,private auth:AuthService) { }

  ngOnInit() {

this.paperID = localStorage.getItem("epid");
const db = firebase.firestore();
var hello = this;
setTimeout(()=>{
db.collection('UsersResults').doc(localStorage.getItem("epid"))
.collection("Results")
.where('user', '==', this.auth.getuser()).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
        hello.sco=doc.data().score;
        hello.totsco=doc.data().totscore;
    });
         
hello.paperber = JSON.parse(localStorage.getItem('paperber0'+localStorage.getItem("epid")+localStorage.getItem("user123")) || 'false');
hello.numblimit = JSON.parse(localStorage.getItem('numblimit0'+localStorage.getItem("epid")+localStorage.getItem("user123")) || '0');
hello.temp = parseInt(hello.numblimit);
if(hello.paperber == false)
{
 // console.log(hello.paperber);
        hello.auth.getpap(localStorage.getItem("epid"),localStorage.getItem("user123")).subscribe(data123 => {
      if(data123!='')
      {
        localStorage.setItem("Data0",JSON.stringify(data123));
        hello.lost=JSON.parse(localStorage.getItem("Data0")); 
         db.collection('UsersAnswers').doc(hello.auth.getuser()).collection(localStorage.getItem("epid"))
      .where('attempt', '==',1).get()
      .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     querySnapshot.forEach((doc)=> {
        for(var e=0;e<hello.lost.length;e++)
       {
       if(doc.data().qid==hello.lost[e].qid)
       {
         hello.attempt[e]=1;
         //console.log("hurray",e);
         break;
       }
       }
           });
      } 
    else {

   }
    })
    .catch(function(error) {
      //  console.log("Error getting documents: ", error);
    });
        hello.count = data123.length;
        //console.log(hello.count,hello.numblimit);
        hello.quest = hello.lost[parseInt(hello.numblimit)];
        hello.answers(hello.lost[parseInt(hello.numblimit)].qid);
       // console.log("Working!!",hello.lost);
               if(parseInt(hello.numblimit)>0)
          hello.horror = true;
        else
          hello.horror = false;
       if((parseInt(hello.numblimit)+1) == hello.count)
       {
         //console.log("um");
          hello.horror1 = true;
       }
        else
        {
          //console.log("cum");
          hello.horror1 = false;
        }
      }
      else
      {
        //console.log("ERROR!!");
      }
    });
}
else
{
  //localStorage.removeItem('paperber0'+localStorage.getItem("epid")+localStorage.getItem("user123"));
//localStorage.removeItem('numblimit0'+localStorage.getItem("epid")+localStorage.getItem("user123"));
    hello.lost=JSON.parse(localStorage.getItem("Data0"));
             db.collection('UsersAnswers').doc(hello.auth.getuser()).collection(localStorage.getItem("epid"))
      .where('attempt', '==',1).get()
      .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     querySnapshot.forEach((doc)=> {
        for(var e=0;e<hello.lost.length;e++)
       {
       if(doc.data().qid==hello.lost[e].qid)
       {
         hello.attempt[e]=1;
         //console.log("hurray",e);
         break;
       }
       }
           });
      } 
    else {

   }
    })
    .catch(function(error) {
      //  console.log("Error getting documents: ", error);
    });
    hello.count = hello.lost.length;
    hello.quest = hello.lost[parseInt(hello.numblimit)];
    hello.answers(hello.lost[parseInt(hello.numblimit)].qid);
   //console.log(hello.count);
   // console.log("hello",hello.quest,hello.count,hello.lost[0]);
        if(parseInt(hello.numblimit)>0)
          hello.horror = true;
        else
          hello.horror = false;
       if((parseInt(hello.numblimit)+1) == hello.count)
       {
         //console.log("um");
          hello.horror1 = true;
       }
        else
        {
          //console.log("cum");
          hello.horror1 = false;
        }
}

        //console.log(hello.horror,hello.horror1);
      } 
    else {
       this.router.navigate(['']);
      }
         });}, 1000);
              setTimeout(()=>{
        hello.spinner = false;
        }, 1500);
  }

  next()
{

  localStorage.setItem('paperber0'+localStorage.getItem("epid")+localStorage.getItem("user123"),'true');
  this.paperber = true;
  this.temp = parseInt(this.numblimit) + 1;
        this.numblimit = this.temp.toString();
   localStorage.setItem('numblimit0'+localStorage.getItem("epid")+localStorage.getItem("user123"),this.numblimit);
                  if(parseInt(this.numblimit)>0)
          this.horror = true;
        else
          this.horror = false;
        if(parseInt(this.numblimit)+1 == this.count)
          this.horror1 = true;
        else
          this.horror1 = false;
        this.lost=JSON.parse(localStorage.getItem("Data0"));
      this.quest = this.lost[this.temp]; 
      this.answers(this.lost[this.temp].qid);
 //console.log(this.paperber,this.numblimit);

}
previous()
{
  this.temp = parseInt(this.numblimit) -1;
        this.numblimit = this.temp.toString();
   localStorage.setItem('numblimit0'+localStorage.getItem("epid")+localStorage.getItem("user123"),this.numblimit);

                 if(parseInt(this.numblimit)>0)
          this.horror = true;
        else
          this.horror = false;
                if(parseInt(this.numblimit)+1 == this.count)
          this.horror1 = true;
        else
          this.horror1 = false;
        this.lost=JSON.parse(localStorage.getItem("Data0"));
        this.quest = this.lost[this.temp];
        this.answers(this.lost[this.temp].qid); 
      // console.log(this.paperber,this.numblimit);

}
navigate()
{
  $('#myModal').modal('show');
}
quesnavigate(quesid:string)
{
  $('#myModal').modal('hide');
  for(var i=0;i<this.lost.length;i++)
  {
    if(quesid == this.lost[i].qid)
    {
      const db = firebase.firestore();
  localStorage.setItem('paperber0'+localStorage.getItem("epid")+localStorage.getItem("user123"),'true');
  this.paperber = true;
  this.temp = i;
        this.numblimit = this.temp.toString();
   localStorage.setItem('numblimit0'+localStorage.getItem("epid")+localStorage.getItem("user123"),this.numblimit);
                  if(parseInt(this.numblimit)>0)
          this.horror = true;
        else
          this.horror = false;
        if(parseInt(this.numblimit)+1 == this.count)
          this.horror1 = true;
        else
          this.horror1 = false;
        this.lost=JSON.parse(localStorage.getItem("Data0"));
      this.quest = this.lost[this.temp];
      this.answers(this.lost[this.temp].qid); 
      console.log(this.numblimit);
      //console.log(this.lost[i].qid,i);
      break;
    }
  }
}

answers(quesid:string)
{

const db = firebase.firestore();
var hello = this;
   db.collection('UsersAnswers').doc(this.auth.getuser())
   .collection(localStorage.getItem("epid"))
   .where('qid','==',quesid).get()
   .then((querySnapshot)=> {
     if (querySnapshot.size > 0) {
   querySnapshot.forEach(function(doc) {
         hello.corans = doc.data().corans;
         hello.ans = doc.data().ans;
         if(hello.corans == hello.ans)
         {
           hello.status1 = true;
           hello.status2 = false;
           hello.status3 = false;
         }
         else
         {
           hello.status2 = true;
           hello.status1 = false;
           hello.status3 = false;
         }
  });
        } 
    else {

      db.collection('UserQuestionPaper')
.doc(localStorage.getItem("user123")).collection(localStorage.getItem("epid"))
      .where('qid','==',quesid).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
         hello.corans = doc.data().answer;
         hello.ans = "NotAttempted!!";
         hello.status1 = false;
         hello.status2 = false;
         hello.status3 = true;
    });
      } 
    else {
      
      }
         });
      }
});

}
leader(pid:string)
{
     localStorage.setItem("leadpap",pid);
   this.router.navigate(['leaderboard']);
}

}
