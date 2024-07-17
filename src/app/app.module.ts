// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip'; 

import { BrowserModule } from '@angular/platform-browser';
import { CountUpModule } from 'ngx-countup'; 
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OverlayMenuComponent } from './overlay-menu/overlay-menu.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { SignComponent } from './sign/sign.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PresqueFiniComponent } from './presque-fini/presque-fini.component';
import { AboutComponent } from './about/about.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { LesAnnoncesComponent } from './les-annonces/les-annonces.component';
import { OrgDashboardComponent } from './ORGDASHB/org-dashboard/org-dashboard.component';
import { OrgGraphDoughnutComponent } from './ORGDASHB/org-graph-doughnut/org-graph-doughnut.component'; 
import { NgApexchartsModule } from 'ng-apexcharts';
import { OrgProjectManagingComponent } from './ORGDASHB/org-project-managing/org-project-managing.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { NewsComponent } from './news/news.component';
import { MesdonsComponent } from './mesdons/mesdons.component';
import { MngDonataireComponent } from './ADMDASHB/mng-donataire/mng-donataire.component';
import { AdmGraphComponent } from './ADMDASHB/adm-graph/adm-graph.component';
import { MngDonneurComponent } from './ADMDASHB/mng-donneur/mng-donneur.component';
import { MngDonComponent } from './ADMDASHB/mng-don/mng-don.component';
import { MngCampagneComponent } from './ADMDASHB/mng-campagne/mng-campagne.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { UpdateComponent } from './update/update.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/interceptors/http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OverlayMenuComponent,
    LoginComponent,
    SignComponent,
    FooterComponent,
    HomeComponent,
    PresqueFiniComponent,
    AboutComponent,
    ReviewsComponent,
    ProjectDetailsComponent,
    LesAnnoncesComponent,
    OrgDashboardComponent,
    OrgGraphDoughnutComponent,
    OrgProjectManagingComponent,
    ChangePasswordComponent,
    ProfileComponent,
    NewsComponent,
    MesdonsComponent,
    MngDonataireComponent,
    AdmGraphComponent,
    MngDonneurComponent,
    MngDonComponent,
    MngCampagneComponent,
    CreateCampaignComponent,
    UpdateComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CountUpModule,
    NgApexchartsModule,
    CommonModule,
    MatTooltipModule,
    HttpClientModule,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
