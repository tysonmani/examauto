import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable,Subject,combineLatest} from 'rxjs';
@Component({
  selector: 'app-updatepaper',
  templateUrl: './updatepaper.component.html',
  styleUrls: ['./updatepaper.component.css']
})
export class UpdatepaperComponent implements OnInit {
startAt = new Subject();
  endAt = new Subject();

startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

QuesForm: FormGroup;
NumForm: FormGroup;
UpdForm: FormGroup;
quest;
quesid123:number;
exists:string;
exists1:string;
pubex:boolean = false;
zip:boolean = false;
zip1:boolean = false;
temp:number = 1;
middle:string = 'Null';
stat:string;
bool1:boolean = false;
bool2:boolean = false;
bool3:boolean = false;
bool4:boolean = false;
spinner:boolean = true;
ran = Math.floor(10000 + Math.random() * 90000);
strnum1 = this.ran.toString();
strnum = this.strnum1 + 'QP';
overlimit = JSON.parse(localStorage.getItem('over1'+localStorage.getItem('ques')+this.auth.getuser()) || '0');
nostatus = JSON.parse(localStorage.getItem('noques1'+localStorage.getItem('ques')+this.auth.getuser()) || '60');
questatus = JSON.parse(localStorage.getItem('quesno1'+localStorage.getItem('ques')+this.auth.getuser()) || '1');
paperstatus = localStorage.getItem('ques');
  constructor(private router: Router,private formBuilder: FormBuilder,private afs: AngularFirestore,private auth:AuthService) { }

  ngOnInit() {
  	this.createform();
  		//console.log(localStorage.getItem('ques'));
  	//console.log(this.auth.getuser());
  	//console.log(this.questatus,this.nostatus,localStorage.getItem('over1'+this.auth.getuser()));
  	this.auth.getques1(this.paperstatus).subscribe(data123 => {
  	  if(data123!='')
      {
  	this.zip = false;
  	this.zip1 = false;
    this.quest = data123;
    this.spinner = false;
    this.pubex = true;
	}
	else
	{
		this.zip1 = true;
  		this.zip = true;
  		this.spinner = false;
  		this.exists = "At Present No Questions Are Available";
		this.pubex = false;
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
    		this.exists = "There is no such question avalaible!!";
    	}
      })
    })
//console.log(this.nostatus,this.questatus,this.overlimit,this.paperstatus);
  }

createform()
{
this.QuesForm = this.formBuilder.group({
     ques: ['', [Validators.required] ],
     op1: ['', [Validators.required] ],
     op2: ['', [Validators.required] ],
     op3: ['', [Validators.required] ],
     op4: ['', [Validators.required] ],
     opc: ['', [Validators.required] ]
    });
this.UpdForm = this.formBuilder.group({
     quesa: ['', [Validators.required] ],
     opa1: ['', [Validators.required] ],
     opa2: ['', [Validators.required] ],
     opa3: ['', [Validators.required] ],
     opa4: ['', [Validators.required] ],
     opac: ['', [Validators.required] ]
    });
this.NumForm = this.formBuilder.group({
     num: ['', [Validators.required,Validators.pattern] ]
    });
}

onSubmit()
{
	const db = firebase.firestore();
	var hello = this;
	db.collection('UserQuestionPaper').doc(this.auth.getuser())
	.collection(this.paperstatus)
 	 .where("ques", "==", this.QuesForm.value.ques)
	.get()
	.then(function(querySnapshot) {
 	if (querySnapshot.size > 0) {
 		$('#myModal4').modal('show');
  		} 
  	else {
	var val = Math.floor(10000 + Math.random() * 90000);
	if(hello.QuesForm.value.op1  == hello.QuesForm.value.opc || 
		hello.QuesForm.value.op2 == hello.QuesForm.value.opc || 
		hello.QuesForm.value.op3 == hello.QuesForm.value.opc ||
		hello.QuesForm.value.op4 == hello.QuesForm.value.opc
		)
		{
			if(parseInt(hello.questatus)<=parseInt(hello.nostatus))
			{
			const db = firebase.firestore();
			db.collection('UserQuestionPaper').doc(hello.auth.getuser())
			.collection(hello.paperstatus)
			.add({
			qid:val,
			ques: hello.QuesForm.value.ques,
			op1:hello.QuesForm.value.op1,
			op2:hello.QuesForm.value.op2,
			op3:hello.QuesForm.value.op3,
			op4:hello.QuesForm.value.op4,
			answer:hello.QuesForm.value.opc
		}).then(function(docRef) {
    		//console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
    		//console.error("Error adding document: ", error);
			});
		    hello.QuesForm.reset({
      			ques: '',
      			op1: '',
      			op2: '',
      			op3: '',
      			op4: '',
      			opc: '',
    		});
    		hello.temp = parseInt(hello.questatus) + 1;
    		hello.questatus = hello.temp.toString();
		localStorage.setItem('quesno1'+localStorage.getItem('ques')+hello.auth.getuser(),hello.questatus);
		localStorage.setItem('paperno1'+localStorage.getItem('ques')+hello.auth.getuser(),hello.paperstatus);
		hello.temp = parseInt(hello.overlimit) + 1;
		hello.overlimit = hello.temp.toString();
		localStorage.setItem('over1'+localStorage.getItem('ques')+hello.auth.getuser(),hello.overlimit);
		//console.log(hello.nostatus,localStorage.getItem('over1'+localStorage.getItem('ques')+hello.auth.getuser()));
	}
	else  
	{
		$('#myModal1').modal('show');
	}
}
	else
	{
		$('#myModal').modal('show');
	}
}

})
    .catch(function(error) {
       // console.log("Error getting documents: ", error);
    });
}

onSubmit123()
{
	if(this.NumForm.value.num!="")
	{
	var kill = this.NumForm.value.num;
	//console.log(this.noques);
	localStorage.setItem('noques1'+localStorage.getItem('ques')+this.auth.getuser(),kill.toString());
		this.nostatus = JSON.parse(localStorage.getItem('noques1'+localStorage.getItem('ques')+this.auth.getuser()) || '3');
	//console.log(this.nostatus,localStorage.getItem('over'));
	if(this.nostatus<JSON.parse(localStorage.getItem('over1'+localStorage.getItem('ques')+this.auth.getuser())))
	{
		this.middle = "Failure because no of Questions can't be less than the present no of Questions";
		this.bool1 = true;
		this.bool2 = false;
		localStorage.setItem('noques1'+localStorage.getItem('ques')+this.auth.getuser(),localStorage.getItem('over1'+localStorage.getItem('ques')+this.auth.getuser()));
		this.nostatus = JSON.parse(localStorage.getItem('noques1'+localStorage.getItem('ques')+this.auth.getuser()) || '3');
		setTimeout(()=>{
		$('#myModal2').modal('hide');
			this.middle = "Null";
			this.bool1 = false;
    	}, 3000)
	}
	else
	{
			this.middle = "Success";
			this.bool2 = true;
			this.bool1 = false;
		setTimeout(()=>{
		$('#myModal2').modal('hide');
			this.middle = "Null";
			this.bool2 = false;
    	}, 3000)
	}
	this.NumForm.reset({
      			num: ''
    		});

	}
	else
	{
		//console.log("super");
	}
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
     this.auth.getques1(this.paperstatus).subscribe(data123 => {
    this.zip = false;
    this.quest = data123
    });
    }
}

firequery(start, end): Observable<any>
{
    return this.afs.collection('UserQuestionPaper').doc(this.auth.getuser()).collection(this.paperstatus, ref => ref.limit(4).orderBy('ques').startAt(start).endAt(end)).valueChanges();
}

deleteques(id:number)
{
	var hello = this;
	const db = firebase.firestore();
      db.collection('UserQuestionPaper').doc(this.auth.getuser()).collection(this.paperstatus)
      .where('qid','==',id).get()
      .then(function(querySnapshot) {
  	querySnapshot.forEach(function(doc) {
    doc.ref.delete();
    hello.temp = parseInt(hello.overlimit) - 1;
	hello.overlimit = hello.temp.toString();
	localStorage.setItem('over1'+localStorage.getItem('ques')+hello.auth.getuser(),hello.overlimit);
	hello.temp = parseInt(hello.questatus) - 1;
    hello.questatus = hello.temp.toString();
	localStorage.setItem('quesno1'+localStorage.getItem('ques')+hello.auth.getuser(),hello.questatus);
	//console.log("Document successfully deleted!");
  });
});

}

updateques(qid:number,quest:string,op1t:string,op2t:string,op3t:string,op4t:string,opct:string)
{
	this.UpdForm.setValue({
		quesa:quest,
  		opa1: op1t, 
  		opa2: op2t,
  		opa3: op3t,
  		opa4: op4t,
  		opac: opct
	});
	this.quesid123 = qid;
	this.bool3 = false;
	this.bool4 = false;
}
onUpdate()
{
	if(this.UpdForm.value.opa1  == this.UpdForm.value.opac || 
		this.UpdForm.value.opa2 == this.UpdForm.value.opac || 
		this.UpdForm.value.opa3 == this.UpdForm.value.opac ||
		this.UpdForm.value.opa4 == this.UpdForm.value.opac
		)
	{
	const db = firebase.firestore();
      db.collection('UserQuestionPaper').doc(this.auth.getuser())
      .collection(this.paperstatus)
      .where('qid','==',this.quesid123).get()
      .then(function(querySnapshot) {
  	querySnapshot.forEach(function(doc) {
    doc.ref.delete();
	//console.log("Document successfully deleted!");
  });
});
var val = Math.floor(10000 + Math.random() * 90000);
			db.collection('UserQuestionPaper').doc(this.auth.getuser())
			.collection(this.paperstatus)
			.add({
			qid:val,
			ques: this.UpdForm.value.quesa,
			op1:this.UpdForm.value.opa1,
			op2:this.UpdForm.value.opa2,
			op3:this.UpdForm.value.opa3,
			op4:this.UpdForm.value.opa4,
			answer:this.UpdForm.value.opac
		}).then(function(docRef) {
    		//console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
    		//console.error("Error adding document: ", error);
			});
		    this.UpdForm.reset({
      			quesa: '',
      			opa1: '',
      			opa2: '',
      			opa3: '',
      			opa4: '',
      			opac: '',
    		});
this.bool4 = false;  		
this.bool3 = true;
this.stat = "Updated Successfully!!";
setTimeout(()=>{
		this.bool3 = false;
		$('#myModal3').modal('hide');
    	}, 1000)	
	}
	else
	{
		this.bool4 = true;
		this.stat = "Can't be Updated Since Correct Answer Does'nt Match With The Your Options!!";
	}
}

pubques()
{
	this.router.navigate(['automata']);
}

}
