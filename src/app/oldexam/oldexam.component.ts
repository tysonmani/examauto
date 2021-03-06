import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oldexam',
  templateUrl: './oldexam.component.html',
  styleUrls: ['./oldexam.component.css']
})
export class OldexamComponent implements OnInit {

papid123:string;
OptionForm: FormGroup;
count:number;
ptime:number;
ptime2:number;
passw:string;
userc:string;
days:string;
hours:string;
minutes:string;
seconds:string;
papid:boolean;
mess:string;
bool:boolean= false;
horror:boolean = false;
horror1:boolean = false;
horror2:boolean = false;
yoyo1:boolean = false;
yoyo2:boolean = false;
yoyo3:boolean = false;
yoyo4:boolean = false;
cuber:boolean= false;
temp:number=0;
num:number;
quest:object={};
questq;
lost;
paperber;
numblimit;
paperID:string;
vary:boolean = false;
zip:boolean = false;
zip1:boolean = false;
attempt=[0];
exists:string;
spinner:boolean = true;
queso:string;
counto:number=0;
time;
  constructor(private router: Router,private formBuilder: FormBuilder,private afs: AngularFirestore,private auth:AuthService) { }

  ngOnInit() {
//this.attempt[1]=1;
    this.paperID = localStorage.getItem("epid2");
/*var hello = this;*/

//console.log(localStorage.getItem("epid2"));
 

  const db = firebase.firestore();
  var hello = this;
 db.collection('OldCommonQuestionPapers')
 .where('pid','==',localStorage.getItem("epid2")).get()
 .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
           hello.passw = doc.data().pass;
           hello.ptime2 = doc.data().time;
           hello.userc  =doc.data().user;
          localStorage.setItem("user213",doc.data().user);
hello.paperber = JSON.parse(localStorage.getItem('paperber'+localStorage.getItem("epid2")+localStorage.getItem("user213")) || 'false');
hello.numblimit = JSON.parse(localStorage.getItem('numblimit'+localStorage.getItem("epid2")+localStorage.getItem("user213")) || '0');
hello.temp=parseInt(hello.numblimit);
if(hello.paperber == false)
{
  setTimeout(()=>{
       hello.auth.getpap(localStorage.getItem("epid2"),localStorage.getItem("user213")).subscribe(data123 => {
      if(data123!='')
      {
        localStorage.setItem("Data",JSON.stringify(data123));
       hello.lost=JSON.parse(localStorage.getItem("Data"));
       hello.optchecker1(hello.lost[parseInt(hello.numblimit)].qid);
 db.collection('OldUsersAnswers').doc(hello.auth.getuser()).collection(localStorage.getItem("epid2"))
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
       hello.quest =hello.lost[parseInt(hello.numblimit)];
               hello.spinner = false;
                if(parseInt(hello.numblimit)>0)
         hello.horror = true;
        else
         hello.horror = false;
       if(parseInt(hello.numblimit)+1 ==hello.count)
         hello.horror1 = true;
        else
         hello.horror1 = false;
        //console.log("Working!!",hello.lost,hello.count);
      }
      else
      {
       // console.log("ERROR!!");
      }
    });
      }, 1000);
}
else
{
  //hello.attempt[12]=9;
  //console.log(hello.attempt[12]);
  //localStorage.removeItem('paperber'+localStorage.getItem("epid2")+localStorage.getItem("user213"));
//localStorage.removeItem('numblimit'+localStorage.getItem("epid2")+localStorage.getItem("user213"));
    //console.log("hello",hello.paperber);
   hello.lost=JSON.parse(localStorage.getItem("Data"));
   hello.count =hello.lost.length;
   //console.log(hello.count,hello.lost);
   hello.optchecker1(hello.lost[parseInt(hello.numblimit)].qid);
      db.collection('OldUsersAnswers').doc(hello.auth.getuser()).collection(localStorage.getItem("epid2"))
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
   hello.quest =hello.lost[parseInt(hello.numblimit)];
         hello.spinner = false;
           if(parseInt(hello.numblimit)>0)
         hello.horror = true;
        else
         hello.horror = false;
       if(parseInt(hello.numblimit)+1 ==hello.count)
         hello.horror1 = true;
        else
         hello.horror1 = false;
   // console.log(hello.quest,hello.count,hello.lost[0]);
}

         const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var day, month,monthno,year,min,hr,sec;

this.auth.getDate().subscribe((data) => {

day = data.day;
month = data.month;
monthno = data.monthno;
year = data.year;
hr = data.hr;
min = data.min;
sec = data.sec;

 // console.log(localStorage.getItem("user213"));
hello.papid = JSON.parse(localStorage.getItem('case'
  +hello.auth.getuser()
  +localStorage.getItem("epid2")) || 'false');
//console.log(hello.papid);
if(hello.papid == false)
{
  //console.log("kick2");
    hello.ptime = doc.data().time;
    hello.ptime+=min;
        if(hello.ptime>=60)
        {
          if((hr+1)>23)
          {
            hr=0;
            if(((day+1)>30) && (month=="April"||
              month=="June"||
              month=="September"||month=="November"))
            {
              if(monthno+1>11)
              {
                year+=1;day=1;
                month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else if(((day+1)>28) && (month=="February"))
            {
              if(monthno+1>11)
              {
                year+=1;day=1;
                month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else if(((day+1)>31) && (month=="January"||
              month=="March"||month=="May"||
              month=="July"||month=="August"||
              month=="October"||month=="December"))
            {
              if(monthno+1>11)
              {
                year+=1;
                day=1;month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else
            {
              day+=1;
            }
          }
          else
          {
            hr+=1;
          }
          hello.ptime%=60;
        }
          
            //console.log(hello.ptime);
         localStorage.setItem("dayZ"+hello.auth.getuser()
  +localStorage.getItem("epid2"),day);
         localStorage.setItem("monthZ"+hello.auth.getuser()
  +localStorage.getItem("epid2"),month);
         localStorage.setItem("yearZ"+hello.auth.getuser()
  +localStorage.getItem("epid2"),year);
      localStorage.setItem("hrs"+hello.auth.getuser()
  +localStorage.getItem("epid2"),hr);
      localStorage.setItem("mins"+hello.auth.getuser()
  +localStorage.getItem("epid2"),hello.ptime.toString());
      localStorage.setItem("secs"+hello.auth.getuser()
  +localStorage.getItem("epid2"),sec);
    localStorage.setItem("case"+hello.auth.getuser()
  +localStorage.getItem("epid2"),'true');

}
else{
//console.log("Nokick2");
}

});

// Set the date we're counting down to
// var countDownDate = new Date(localStorage.getItem("monthZ"+hello.auth.getuser()
//   +localStorage.getItem("epid2"))+parseInt(localStorage.getItem("dayZ"+hello.auth.getuser()
//   +localStorage.getItem("epid2")))+","+parseInt(localStorage.getItem("yearZ"+hello.auth.getuser()
//   +localStorage.getItem("epid2")))+" "+parseInt(localStorage.getItem("hrs"+hello.auth.getuser()
//   +localStorage.getItem("epid2")))+":"+parseInt(localStorage.getItem("mins"+hello.auth.getuser()
//   +localStorage.getItem("epid2")))+":"+parseInt(localStorage.getItem("secs"+hello.auth.getuser()
//   +localStorage.getItem("epid2")))).getTime();

      hello.papid123 = JSON.parse(localStorage.getItem('king123') || 'false');
    if(hello.papid123 == 'false')
    {
    localStorage.setItem("king123",localStorage.getItem("epid2"));
      //console.log("ginger"); 
    }
  else
  {
     //console.log("Noginger"); 
    clearInterval(hello.num);
  }

// Update the count down every 1 second
hello.num = window.setInterval(()=> {
  hello.auth.getDate1(
localStorage.getItem("monthZ"+hello.auth.getuser()
  +localStorage.getItem("epid2")),parseInt(localStorage.getItem("dayZ"+hello.auth.getuser()
  +localStorage.getItem("epid2"))),parseInt(localStorage.getItem("yearZ"+hello.auth.getuser()
  +localStorage.getItem("epid2"))),parseInt(localStorage.getItem("hrs"+hello.auth.getuser()
  +localStorage.getItem("epid2"))),parseInt(localStorage.getItem("mins"+hello.auth.getuser()
  +localStorage.getItem("epid2"))),parseInt(localStorage.getItem("secs"+hello.auth.getuser()
  +localStorage.getItem("epid2")))).subscribe((data) => {

   hello.time = data.time;

    //Find the distance between now and the count down date
var countDownDate = data.countDown;

// Find the distance between now and the count down date
  var distance = countDownDate - hello.time;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
    hello.days = days.toString();
    hello.hours = hours.toString();
    hello.minutes = minutes.toString();
    hello.seconds = seconds.toString();
   // console.log(hello.days,hello.hours,hello.minutes,hello.seconds);
    
  // If the count down is over, write some text 
  if (distance < 0) {
    //console.log(distance);
    clearInterval(hello.num);
    hello.mess = "ExamOver!!";
    hello.bool = true;
    hello.spinner = true;
    setTimeout(()=>{
    hello.resultcal();
    }, 1000);
  }

  });
},1000);    

  });
         
     }
     else
     {

     }
         });
          this.createform();
        //this.optchecker1(this.lost[parseInt(this.numblimit)].qid);
  }

createform()
{
this.OptionForm = this.formBuilder.group({
     opt: ['']
      //opt: new FormControl({value:''})
    });
}

optchecker1(quesid:string)
{
const db = firebase.firestore();
var hello = this;
      db.collection('OldUsersAnswers').doc(this.auth.getuser()).collection(localStorage.getItem("epid2"))
      .where('qid', '==',quesid).get()
      .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     querySnapshot.forEach((doc)=> {
       hello.OptionForm.setValue({
          opt:doc.data().ans
        });
       //hello.vary = true;
           });
      } 
    else {
          hello.OptionForm.setValue({
          opt:''
        });
        //hello.vary = false;
       // console.log("no",quesid,localStorage.getItem('epid2'));
      }
    })
    .catch(function(error) {
      //  console.log("Error getting documents: ", error);
    });

}

optchecker(quesid:string,answer:string,attemptid:number)
{
const db = firebase.firestore();
var hello = this;
var oc,oa;
db.collection('UserQuestionPaper')
.doc(localStorage.getItem("user213")).collection(localStorage.getItem("epid2"))
      .where('qid','==',quesid).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
           oa = doc.data().answer;
           if(answer == doc.data().answer)
             oc =1;
           else
             oc = 0;
    });
      } 
    else {
      
      }
         });


      db.collection('OldUsersAnswers').doc(this.auth.getuser()).collection(localStorage.getItem("epid2"))
      .where('qid', '==',quesid).get()
      .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     querySnapshot.forEach((doc)=> {
       hello.OptionForm.setValue({
          opt:doc.data().ans
        });
       hello.vary = true;
           });
     //console.log("yes");
      } 
    else {
        hello.vary = false;
      //console.log("no");
      }
        if(hello.vary == false)
  {
      db.collection('OldUsersAnswers').doc(hello.auth.getuser()).collection(localStorage.getItem("epid2"))
      .add({
      qid:quesid,
      ans:answer,
      corans:oa,
      corr:oc,
      attempt:1
    }).then((docRef)=> {
      hello.attempt[attemptid]=1;
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      });
  }
  else
  {
     db.collection('OldUsersAnswers').doc(hello.auth.getuser()).collection(localStorage.getItem("epid2"))
      .where('qid','==',quesid).get()
      .then((querySnapshot)=> {
    querySnapshot.forEach((doc)=> {
    doc.ref.update({ans:answer,corr:oc});
    hello.attempt[attemptid]=1;
  //console.log("Document successfully updated!");
  });
});
  }
      
    })
    .catch(function(error) {
        //console.log("Error getting documents: ", error);
    });

}

savenext1()
{
  $('#myModal4').modal('hide');
this.spinner = true;
        if(this.OptionForm.value.opt != '')
        this.optchecker(this.queso,this.OptionForm.value.opt,parseInt(this.numblimit));
        clearInterval(this.num);
        setTimeout(()=>{
        this.resultcal();
        }, 1000) 
}

savenext(quesid:string)
{

  const db = firebase.firestore();
      if(parseInt(this.numblimit)+1 == this.count)
          {
            this.cuber=true;
          this.queso=quesid;
          $('#myModal4').modal('show');
          setTimeout(()=>{
            this.cuber=false;
             }, 1500);
          var count1=0;
          for(var i=0;i<this.lost.length;i++)
          {
            if(this.attempt[i]==1)
            {
              count1++;
            }
          }
          this.counto = count1;
        }
      else
         {
          this.spinner = true;
        setTimeout(()=>{
         this.spinner = false;
      const db = firebase.firestore();
  if(this.OptionForm.value.opt != '')
  this.optchecker(quesid,this.OptionForm.value.opt,parseInt(this.numblimit));
  localStorage.setItem('paperber'+localStorage.getItem("epid2")+localStorage.getItem("user213"),'true');
  this.paperber = true;
  this.temp = parseInt(this.numblimit) + 1;
        this.numblimit = this.temp.toString();
   localStorage.setItem('numblimit'+localStorage.getItem("epid2")+localStorage.getItem("user213"),this.numblimit);
                  if(parseInt(this.numblimit)>0)
          this.horror = true;
        else
          this.horror = false;
        if(parseInt(this.numblimit)+1 == this.count)
          this.horror1 = true;
        else
          this.horror1 = false;
        this.lost=JSON.parse(localStorage.getItem("Data"));
    this.optchecker1(this.lost[this.temp].qid);
      this.quest = this.lost[this.temp]; 
  //console.log(this.numblimit);
  //console.log("jimik",this.OptionForm.value.opt);
}, 1500)
}

}
previous(quesid:string)
{
            this.spinner = true;
        setTimeout(()=>{
         this.spinner = false;
  if(this.OptionForm.value.opt != '')       
  this.optchecker(quesid,this.OptionForm.value.opt,parseInt(this.numblimit));
  this.temp = parseInt(this.numblimit) -1;
        this.numblimit = this.temp.toString();
   localStorage.setItem('numblimit'+localStorage.getItem("epid2")+localStorage.getItem("user213"),this.numblimit);

                 if(parseInt(this.numblimit)>0)
          this.horror = true;
        else
          this.horror = false;
                if(parseInt(this.numblimit)+1 == this.count)
          this.horror1 = true;
        else
          this.horror1 = false;
        this.lost=JSON.parse(localStorage.getItem("Data"));
        this.optchecker1(this.lost[this.temp].qid);
        this.quest = this.lost[this.temp]; 
        //console.log(this.numblimit);
        //console.log(this.paperber,this.numblimit);
}, 1500)
}

navigate()
{
  $('#myModal').modal('show');
}

quesnavigate(quesid:string)
{
  $('#myModal').modal('hide');
  //console.log(this.lost[0].qid);
  this.spinner = true;
  for(var i=0;i<this.lost.length;i++)
  {
    if(quesid == this.lost[i].qid)
    {
setTimeout(()=>{
         this.spinner = false;
      const db = firebase.firestore();
  localStorage.setItem('paperber'+localStorage.getItem("epid2")+localStorage.getItem("user213"),'true');
  this.paperber = true;
  this.temp = i;
        this.numblimit = this.temp.toString();
   localStorage.setItem('numblimit'+localStorage.getItem("epid2")+localStorage.getItem("user213"),this.numblimit);
                  if(parseInt(this.numblimit)>0)
          this.horror = true;
        else
          this.horror = false;
        if(parseInt(this.numblimit)+1 == this.count)
          this.horror1 = true;
        else
          this.horror1 = false;
        this.lost=JSON.parse(localStorage.getItem("Data"));
    this.optchecker1(this.lost[this.temp].qid);
      this.quest = this.lost[this.temp]; 
  //console.log(this.numblimit);
}, 1500);
      //console.log(this.lost[i].qid,i);
      break;
    }
  }
}

deselect(quesid:string)
{
  var hello = this;
  const db = firebase.firestore();
        db.collection('OldUsersAnswers').doc(this.auth.getuser()).collection(localStorage.getItem("epid2"))
      .where('qid','==',quesid).get()
      .then((querySnapshot)=> {
    querySnapshot.forEach(function(doc) {
    doc.ref.delete();
    hello.attempt[parseInt(hello.numblimit)]=0;
  });
});
    this.OptionForm.setValue({
      opt:''
  });
      //console.log("hello");
}
resultcal()
{
this.auth.setoldresult(true);
  const db = firebase.firestore();
  var hello = this;

var sco=0,totsco=0;
//console.log("JaiHind");
clearInterval(hello.num);
  localStorage.removeItem('paperber2'+localStorage.getItem("epid2")+localStorage.getItem("user213"));
  localStorage.removeItem('numblimit2'+localStorage.getItem("epid2")+localStorage.getItem("user213"));
 localStorage.removeItem('oldexamin'+localStorage.getItem("epid2"));
 localStorage.removeItem('case'+hello.auth.getuser()
  +localStorage.getItem("epid2"));
 localStorage.removeItem('dayZ'+hello.auth.getuser()
  +localStorage.getItem("epid2"));
 localStorage.removeItem('monthZ'+hello.auth.getuser()
  +localStorage.getItem("epid2"));
 localStorage.removeItem('yearZ'+hello.auth.getuser()
  +localStorage.getItem("epid2"));
localStorage.removeItem('hrs'+hello.auth.getuser()
  +localStorage.getItem("epid2"));
localStorage.removeItem('mins'+hello.auth.getuser()
  +localStorage.getItem("epid2"));
localStorage.removeItem('secs'+hello.auth.getuser()
  +localStorage.getItem("epid2"));
localStorage.removeItem('examin'+localStorage.getItem("epid2"));
localStorage.removeItem('paperber'+localStorage.getItem("epid2")+localStorage.getItem("user213"));
localStorage.removeItem('numblimit'+localStorage.getItem("epid2")+localStorage.getItem("user213"));


 db.collection('OldUsersAnswers').doc(this.auth.getuser())
  .collection(localStorage.getItem("epid2"))
  .where('corr', '==',1).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     querySnapshot.forEach((doc)=> {
       ++sco;
       //console.log("sup",sco);
        });
            hello.yoyo1 = true;
    db.collection('UserQuestionPaper')
.doc(localStorage.getItem("user213"))
.collection(localStorage.getItem("epid2")).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
           ++totsco;
          // console.log("tup",totsco);
    });
                    hello.yoyo2 = true;
     if(hello.yoyo1 == true && hello.yoyo2 == true)
     {
       //console.log("puck1");
      db.collection('OldUsersResults').doc(localStorage.getItem("epid2"))
      .collection("Results").where('user', '==',hello.auth.getuser()).get()
      .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
          // console.log("bufoon1");
           doc.ref.update({score:sco,totscore:totsco});
    this.spinner = false;
    this.router.navigate(['oldresults']);
         });
       }
       else
       {
         //console.log("bufoon2");
        db.collection('OldUsersResults').doc(localStorage.getItem("epid2"))
      .collection("Results")
      .add({
      user:hello.auth.getuser(),
      score:sco,
      totscore:totsco,
      rank:0
    }).then((docRef)=> {
           this.spinner = false;
    this.router.navigate(['oldresults']);
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      }); 

       }
     });       
         }
      } 
    else {
      
      }
         });

      } 
    else {
      
      db.collection('UserQuestionPaper')
.doc(localStorage.getItem("user213"))
.collection(localStorage.getItem("epid2")).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
           totsco++;
    });
           hello.yoyo1 = true;
           hello.yoyo2 = true;
     if(hello.yoyo1 == true && hello.yoyo2 == true)
     {
       //console.log("puck2");
      db.collection('OldUsersResults').doc(localStorage.getItem("epid2"))
      .collection("Results").where('user', '==',hello.auth.getuser()).get()
      .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
          // console.log("bufoon1");
           doc.ref.update({score:sco,totscore:totsco});
                    this.spinner = false;
    this.router.navigate(['oldresults']);
         });
       }
       else
       {
         //console.log("bufoon2");
        db.collection('OldUsersResults').doc(localStorage.getItem("epid2"))
      .collection("Results")
      .add({
      user:hello.auth.getuser(),
      score:sco,
      totscore:totsco,
      rank:0
    }).then((docRef)=> {
           this.spinner = false;
    this.router.navigate(['oldresults']);
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      }); 

       }
     });
  }
      } 
    else {
      
      }
         });

      }
         });
         /*setTimeout(()=>{
           this.spinner = false;
    this.router.navigate(['oldresults']);
      }, 3500) */

}

}
