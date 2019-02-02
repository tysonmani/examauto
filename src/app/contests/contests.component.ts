import { Component, OnInit } from '@angular/core';
declare var $: any;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable,Subject,combineLatest} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.css']
})
export class ContestsComponent implements OnInit {

    startAt = new Subject();
  endAt = new Subject();

startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

days1:string;
hours1:string;
minutes1:string;
seconds1:string;
days:string;
hours:string;
minutes:string;
seconds:string;
exists:string;
quest;
alive:number;
bool1:boolean = false;
bool2:boolean = false;
zip:boolean = false;
zip1:boolean = false;
bomb:boolean = false;
bomb1:boolean = false;
bomb2:boolean = false;
boom:boolean = false;
jog:boolean = false;
papid:string;
papid1:boolean;
papid123:string;
num:number;
num1:number;
exp:string;
ptime:number;
passw:string;
userc:string;
middle:string = 'Nothing!!';
spinner:boolean = true;
spinner1:boolean = true;
PassForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router,private afs: AngularFirestore,private auth:AuthService) { }

  ngOnInit() {

this.createform();
const db = firebase.firestore();
  var hello = this;

    if(!this.auth.isloggedin())
    {
      this.jog = true;
      this.boom = false;
    }
    else
    {
      this.jog = false;
      db.collection('CommonQuestionPapers')
    .where("user", "==", this.auth.getuser())
  .get()
  .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     hello.boom = true;
      } 
    else {
        hello.boom = false;
      }
         });

    }

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
        this.exists = "There is no such Contest avalaible!!";
      }
      })
    })

    //console.log(this.num[0],this.num[1]);
      this.auth.getquescon().subscribe(data123 => {
      if(data123!='')
      {
        this.zip = false;
        this.zip1 = false;
        this.spinner = false;
        this.quest = data123;
         const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

 var d = new Date();
 var day, month, year,min,hr,sec;
  day = d.getDate();
  month = monthNames[d.getMonth()];
  year = d.getFullYear();
  min = d.getMinutes();
  hr = d.getHours();
  sec = d.getSeconds();

db.collection('CommonQuestionPapers')
  .where("pid", "==", localStorage.getItem("keypap"))
  .get()
  .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
    querySnapshot.forEach((doc)=> {
    //localStorage.setItem("alive",doc.data().alive);
    hello.ptime = doc.data().time;
    hello.passw = doc.data().pass;
    hello.userc = doc.data().user;
    hello.papid1 = JSON.parse(localStorage.getItem('case1'
  +localStorage.getItem("keypap")) || 'false');
//console.log("jon",hello.papid1,localStorage.getItem("keypap"));
if(hello.papid1 == false)
{
    hello.alive = doc.data().alive;

        hello.alive+=min;
        if(hello.alive>=60)
        {
          if((hr+1)>23)
          hr=0;
          else
          hr+=1;
          hello.alive%=60;
        }
          
            //console.log(hello.ptime);
      localStorage.setItem("hrs1"
  +localStorage.getItem("keypap"),hr);
      localStorage.setItem("mins1"
  +localStorage.getItem("keypap"),hello.alive.toString());
      localStorage.setItem("secs1"
  +localStorage.getItem("keypap"),sec);
    localStorage.setItem("case1"
  +localStorage.getItem("keypap"),'true');
}
else{

}
});
  }
});
      }
  else
  {
//console.log("hello")
      this.zip1 = true;
      this.zip = true;
      this.spinner = false;
      this.exists = "At Present No Competitions Are Available";
  }
    });

  }

leader()
{
  $('#myModal3').modal('hide');
  this.router.navigate(['leaderboard']);
}

alive123(pid:string)
{
  $('#myModal2').modal('show');
          const db = firebase.firestore();
  var hello = this;
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

 var d = new Date();
 var day, month, year,min,hr,sec;
  day = d.getDate();
  month = monthNames[d.getMonth()];
  year = d.getFullYear();
  min = d.getMinutes();
  hr = d.getHours();
  sec = d.getSeconds();


// Set the date we're counting down to
var countDownDate = new Date(month+day+","+year+" "+parseInt(localStorage.getItem("hrs1"
  +pid))+":"+parseInt(localStorage.getItem("mins1"
  +pid))+":"+parseInt(localStorage.getItem("secs1"
  +pid))).getTime();

      hello.papid123 = JSON.parse(localStorage.getItem('king11') || 'false');
    //console.log("con",hello.papid123);
    if(hello.papid123 == 'false')
    localStorage.setItem("king11",pid);
  if(localStorage.getItem("king11") != pid)
  {
    clearInterval(hello.num1);
  }

// Update the count down every 1 second
hello.num1 = window.setInterval(()=> {

  // Get todays date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days1 = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours1 = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes1 = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds1 = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
    hello.days1 = days1.toString();
    hello.hours1 = hours1.toString();
    hello.minutes1 = minutes1.toString();
    hello.seconds1 = seconds1.toString();
   // console.log(hello.days,hello.hours,hello.minutes,hello.seconds);
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(hello.num1);

       localStorage.removeItem('case1'
  +pid);
localStorage.removeItem('hrs1'
  +pid);
localStorage.removeItem('mins1'
  +pid);
localStorage.removeItem('secs1'
  +pid);
localStorage.removeItem('king11');
          //hello.yoyo3 = true;
      db.collection('OldCommonQuestionPapers')
      .where('pid', '==', pid)
      .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
       doc.ref.update({time:hello.ptime});
       //hello.yoyo4 = true;
       db.collection('CommonQuestionPapers')
      .where('pid', '==', pid)
      .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
    doc.ref.delete();
   // hello.yoyo4 = true;
  //console.log("as","Document successfully deleted!");
    });
      } 
    else {
       
      }
         });
    });
      } 
    else {
       
 db.collection('OldCommonQuestionPapers')
      .add({
      pid:pid,
      pass:hello.passw,
      time:hello.ptime,
      user:hello.userc
    }).then(function(docRef) {
      db.collection('CommonQuestionPapers')
      .where('pid', '==', pid)
      .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
    doc.ref.delete();
    });
      } 
    else {
       
      }
         });
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      });

      }
         });
    $('#myModal2').modal('hide');
  }
}, 1000);
 
}

  createform()
{
this.PassForm = this.formBuilder.group({
     password: ['', [Validators.required, Validators.pattern,Validators.min(10000),, Validators.max(99999)] ]
    });
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
     this.auth.getquescon().subscribe(data123 => {
    this.zip = false;
    this.quest = data123
    });
    }
}

  firequery(start, end): Observable<any>
{
    return this.afs.collection('CommonQuestionPapers', ref => ref.limit(4).orderBy('pid').startAt(start).endAt(end)).valueChanges();
}


  contest(pid:string)
  {
  const db = firebase.firestore();
  var hello = this;
    db.collection('ExamComp').doc(this.auth.getuser())
    .collection(pid).where('exam','==',1)
    .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     $('#myModal3').modal('show');
      } 
    else {

 hello.bool1 = false;
hello.bool2  =false;
hello.middle = "Nothing";
    localStorage.setItem("epid",pid);
    hello.bomb = false;
    hello.bomb1 =false;
    hello.bomb2 =false;
    $('#myModal').modal('show');
        // Set the date we're counting down to
var countDownDate = new Date(localStorage.getItem("%month"+pid)
  +localStorage.getItem("%day"+pid)+","
  +localStorage.getItem("%year"+pid)+" "
  +localStorage.getItem("%hour"+pid)+":"
  +localStorage.getItem("%min"+pid)+":"+"0").getTime();

// Update the count down every 1 second
      hello.papid = JSON.parse(localStorage.getItem('king') || 'false');
    if(hello.papid == 'false')
    localStorage.setItem("king",pid);
  if(localStorage.getItem("king") != pid)
  {
    clearInterval(hello.num);
  }

hello.num = window.setInterval(() => {

  // Get todays date and time

  var now = new Date().getTime();
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    hello.days = days.toString();
    hello.hours = hours.toString();
    hello.minutes = minutes.toString();
    hello.seconds = seconds.toString();
  // Output the result in an element with id="demo"

   //console.log(hello.days,hello.hours,hello.minutes,hello.seconds);
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(hello.num);
     hello.bomb1 = true;
     hello.bomb2 = true;
     hello.exp = "ExamStarted HurryUp!!"
    if(hello.auth.isloggedin())
    {
      hello.bomb = true;
      hello.jog = false;
    }
    
  else
  {
    hello.jog = true;
  }
  }
}, 1000);

      }
         });
  }

start()
{
this.spinner1 = false;
const db = firebase.firestore();
  var hello = this;
db.collection('CommonQuestionPapers')
      .where('pass', '==', this.PassForm.value.password)
     .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
                   hello.bool2 = true;
                   hello.bool1 = false;
                   hello.middle="Succesfully Authenticated!!";
                   hello.auth.setexamin(true);
db.collection('UsersParticipatedExams').doc(hello.auth.getuser()).collection('QuestionPapersID')
      .add({
      pid:localStorage.getItem("epid")
    }).then((docRef)=> {
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      });
           db.collection('ExamComp').doc(this.auth.getuser())
    .collection(localStorage.getItem("epid")).add({
      exam:1
    }).then(function(docRef) {
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      });
                 setTimeout(()=>{
                   hello.spinner1 = true;
                 $('#myModal').modal('hide');
           hello.router.navigate(['exam']);
      }, 1500)

    });
      } 
    else {
       hello.bool2 = false;
       hello.bool1 = true;
       hello.spinner1 = true;
       hello.middle="Incorrect Password!!";
      }
         });

}
login()
{
  $('#myModal').modal('hide');
this.router.navigate(['login']);
}

deletecont(pid1:string)
{
  const db = firebase.firestore();
  var hello = this;
db.collection('CommonQuestionPapers')
      .where('pid', '==', pid1)
      .where('user','==',this.auth.getuser()).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach(function(doc) {
    doc.ref.delete();
    localStorage.removeItem('examin'+pid1);
        localStorage.removeItem('case'+hello.auth.getuser()
  +localStorage.getItem("epid"));
localStorage.removeItem('hrs'+hello.auth.getuser()
  +localStorage.getItem("epid"));
localStorage.removeItem('mins'+hello.auth.getuser()
  +localStorage.getItem("epid"));
localStorage.removeItem('secs'+hello.auth.getuser()
  +localStorage.getItem("epid"));
localStorage.removeItem('examin'+localStorage.getItem("epid"));
localStorage.removeItem('paperber'+localStorage.getItem("epid")+localStorage.getItem("user123"));
localStorage.removeItem('numblimit'+localStorage.getItem("epid")+localStorage.getItem("user123"));
localStorage.removeItem('case1'+pid1);
localStorage.removeItem('hrs1'+pid1);
localStorage.removeItem('mins1'+pid1);
localStorage.removeItem('secs1'+pid1);
localStorage.removeItem('king11');
  //console.log("Document successfully deleted!");
    });
      } 
    else {
       $('#myModal1').modal('show');
      }
         });

}

}
