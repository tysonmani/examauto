import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { VerifyComponent } from './verify/verify.component';
import { AutomataComponent } from './automata/automata.component';
import { AuthGuard } from './auth.guard';
import { Auth1Guard } from './auth1.guard';
import { Auth2Guard } from './auth2.guard';
import { Auth3Guard } from './auth3.guard';
import { Auth4Guard } from './auth4.guard';
import { Auth5Guard } from './auth5.guard';
import { HeaderComponent } from './header/header.component';
import { PublishComponent } from './publish/publish.component';
import { DemoComponent } from './demo/demo.component';
import { UpdatepaperComponent } from './updatepaper/updatepaper.component';
import { ContestsComponent } from './contests/contests.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ExamComponent } from './exam/exam.component';
import { OldcontestsComponent } from './oldcontests/oldcontests.component';
import { OldexamComponent } from './oldexam/oldexam.component';
import { ResultsComponent } from './results/results.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { FooterComponent } from './footer/footer.component';
import { OldresultsComponent } from './oldresults/oldresults.component';
import { DemoresultsComponent } from './demoresults/demoresults.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    VerifyComponent,
    AutomataComponent,
    HeaderComponent,
    PublishComponent,
    DemoComponent,
    UpdatepaperComponent,
    ContestsComponent,
    PagenotfoundComponent,
    ExamComponent,
    OldcontestsComponent,
    OldexamComponent,
    ResultsComponent,
    DashboardComponent,
    LeaderboardComponent,
    FooterComponent,
    OldresultsComponent,
    DemoresultsComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
         RouterModule.forRoot([
        {
        path: 'verify',
        component: VerifyComponent
      },
       {
        path: 'signup',
        component: SignupComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'automata',
        component: AutomataComponent,
        canActivate:[Auth1Guard]
      },
      {
        path: 'contests',
        component: ContestsComponent
      },
      {
        path: 'oldcontests',
        component: OldcontestsComponent
      },
      {
        path: 'publish',
        component: PublishComponent,
        canActivate:[Auth1Guard]
      },
      {
        path: 'updatepaper',
        component: UpdatepaperComponent,
        canActivate:[Auth1Guard]
      },
      {
        path: 'exam',
        component: ExamComponent,
        canActivate:[Auth2Guard]
      },
      {
        path: 'oldexam',
        component: OldexamComponent,
        canActivate:[Auth3Guard]
      },
      {
        path: 'results',
        component: ResultsComponent,
        canActivate:[Auth1Guard]
      },
      {
        path: 'oldresults',
        component: OldresultsComponent,
        canActivate:[Auth1Guard]
      },
      {
        path: 'demoresults',
        component: DemoresultsComponent,
        canActivate:[Auth5Guard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate:[Auth1Guard]
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent,
        canActivate:[Auth1Guard]
      },
      {
        path: 'demo',
        component: DemoComponent,
        canActivate:[Auth4Guard]
      },
      {
        path: 'password',
        component: PasswordComponent
      },
      {
        path: '',
        component: HomeComponent
      },
      {
        path: '**',
        component: PagenotfoundComponent
      }
    ])
  ],
  providers: [AuthService,AuthGuard,Auth1Guard,Auth2Guard,Auth3Guard,Auth4Guard,Auth5Guard],
  bootstrap: [AppComponent]
})
export class AppModule { }
