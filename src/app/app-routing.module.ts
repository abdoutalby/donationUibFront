import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { HomeComponent } from './home/home.component'; 
import { AboutComponent } from './about/about.component'; 
import { ProjectDetailsComponent } from './project-details/project-details.component'; 
import { LesAnnoncesComponent } from './les-annonces/les-annonces.component'; 
import { OrgDashboardComponent } from './ORGDASHB/org-dashboard/org-dashboard.component';
import { OrgProjectManagingComponent } from './ORGDASHB/org-project-managing/org-project-managing.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { NewsComponent } from './news/news.component';
import { MesdonsComponent } from './mesdons/mesdons.component';
import { MngDonataireComponent } from './ADMDASHB/mng-donataire/mng-donataire.component';
import { MngDonneurComponent } from './ADMDASHB/mng-donneur/mng-donneur.component';
import { MngDonComponent } from './ADMDASHB/mng-don/mng-don.component';
import { MngCampagneComponent } from './ADMDASHB/mng-campagne/mng-campagne.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { UpdateComponent } from './update/update.component';
import { AuthGuard } from './auth.guard'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'update/:id', component: UpdateComponent, canActivate: [AuthGuard], data: { roles: ['TAKER'] } },
  { path: 'create', component: CreateCampaignComponent, canActivate: [AuthGuard], data: { roles: ['TAKER'] } },
  { path: 'mng-campagne', component: MngCampagneComponent , canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'mng-don', component: MngDonComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'mng-donneur', component: MngDonneurComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'mng-donataire', component: MngDonataireComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'mesdons', component: MesdonsComponent, canActivate: [AuthGuard], data: { roles: ['GIVER'] } },
  { path: 'news', component: NewsComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { roles: ['GIVER','TAKER' , 'ADMIN'] } },
  { path: 'changepass', component: ChangePasswordComponent, canActivate: [AuthGuard], data: { roles: ['GIVER','TAKER','ADMIN'] } },
  { path: 'orgmanage', component: OrgProjectManagingComponent, canActivate: [AuthGuard], data: { roles: ['TAKER'] } },
  { path: 'overview', component: OrgDashboardComponent, canActivate: [AuthGuard], data: { roles: ['TAKER'] } },
  { path: 'annonces', component: LesAnnoncesComponent },
  { path: 'details/:id', component: ProjectDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
