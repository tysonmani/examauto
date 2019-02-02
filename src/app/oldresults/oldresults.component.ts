import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $: any;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable,Subject,combineLatest} from 'rxjs';

@Component({
  selector: 'app-oldresults',
  templateUrl: './oldresults.component.html',
  styleUrls: ['./oldresults.component.css']
})
export class OldresultsComponent implements OnInit {

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
temp:number;
quest:object={};
lost;
paperber;
numblimit;
paperID:string;
vary:boolean = false;
spinner:boolean = true;
  constructor(private router: Router,private formBuilder: FormBuilder,private afs: AngularFirestore,private auth:AuthService) { }

  ngOnInit() {

this.paperID = localStorage.getItem("epid2");
const db = firebase.firestore();
var hello = this;

setTimeout(()=>{
db.collection('OldUsersResults').doc(localStorage.getItem("epid2"))
.collection("Results")
.where('user', '==', this.auth.getuser()).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     //console.log("work");
         querySnapshot.forEach((doc)=> {
        hello.sco=doc.data().score;
        hello.totsco=doc.data().totscore;
    });
hello.paperber = JSON.parse(localStorage.getItem('paperber2'+localStorage.getItem("epid2")+localStorage.getItem("user213")) || 'false');
hello.numblimit = JSON.parse(localStorage.getItem('numblimit2'+localStorage.getItem("epid2")+localStorage.getItem("user213")) || '0');
if(hello.paperber == false)
{
  //console.log(hello.paperber);
        hello.auth.getpap(localStorage.getItem("epid2"),localStorage.getItem("user213")).subscribe(data123 => {
      if(data123!='')
      {
        localStorage.setItem("Data2",JSON.stringify(data123));
        hello.lost=JSON.parse(localStorage.getItem("Data2")); 
        hello.count = data123.length;
        hello.quest = hello.lost[parseInt(hello.numblimit)];
        hello.answers(hello.lost[parseInt(hello.numblimit)].qid);
               if(parseInt(hello.numblimit)>0)
          hello.horror = true;
        else
          hello.horror = false;
       if(parseInt(hello.numblimit)+1 == hello.count)
          hello.horror1 = true;
        else
          hello.horror1 = false;
       // console.log("Working!!",hello.lost);
      }
      else
      {
       // console.log("ERROR!!");
      }
    });
}
else
{
  //localStorage.removeItem('paperber1'+localStorage.getItem("epid2")+localStorage.getItem("user213"));
//localStorage.removeItem('numblimit1'+localStorage.getItem("epid2")+localStorage.getItem("user213"));
  // console.log("job");
    hello.lost=JSON.parse(localStorage.getItem("Data2"));
    hello.count = hello.lost.length;
    hello.quest = hello.lost[parseInt(hello.numblimit)];
    hello.answers(hello.lost[parseInt(hello.numblimit)].qid);
            if(parseInt(hello.numblimit)>0)
          hello.horror = true;
        else
          hello.horror = false;
       if(parseInt(hello.numblimit)+1 == hello.count)
          hello.horror1 = true;
        else
          hello.horror1 = false;
    //console.log("hello",hello.quest,hello.count,hello.lost[0]);
}

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

  localStorage.setItem('paperber2'+localStorage.getItem("epid2")+localStorage.getItem("user213"),'true');
  this.paperber = true;
  this.temp = parseInt(this.numblimit) + 1;
        this.numblimit = this.temp.toString();
   localStorage.setItem('numblimit2'+localStorage.getItem("epid2")+localStorage.getItem("user213"),this.numblimit);
                  if(parseInt(this.numblimit)>0)
          this.horror = true;
        else
          this.horror = false;
        if(parseInt(this.numblimit)+1 == this.count)
          this.horror1 = true;
        else
          this.horror1 = false;
        this.lost=JSON.parse(localStorage.getItem("Data2"));
      this.quest = this.lost[this.temp]; 
      this.answers(this.lost[this.temp].qid);
  //console.log(this.paperber,this.numblimit);

}
previous()
{
  this.temp = parseInt(this.numblimit) -1;
        this.numblimit = this.temp.toString();
   localStorage.setItem('numblimit2'+localStorage.getItem("epid2")+localStorage.getItem("user213"),this.numblimit);

                 if(parseInt(this.numblimit)>0)
          this.horror = true;
        else
          this.horror = false;
                if(parseInt(this.numblimit)+1 == this.count)
          this.horror1 = true;
        else
          this.horror1 = false;
        this.lost=JSON.parse(localStorage.getItem("Data2"));
        this.quest = this.lost[this.temp];
        this.answers(this.lost[this.temp].qid); 
       // console.log(this.paperber,this.numblimit);

}
answers(quesid:string)
{

const db = firebase.firestore();
var hello = this;
   db.collection('OldUsersAnswers').doc(this.auth.getuser())
   .collection(localStorage.getItem("epid2"))
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
.doc(localStorage.getItem("user213")).collection(localStorage.getItem("epid2"))
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


}
