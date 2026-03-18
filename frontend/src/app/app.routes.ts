import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuideComponent } from './guide/guide.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';
import { RewardsComponent } from './rewards/rewards.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'guide', component: GuideComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'rewards', component: RewardsComponent },
  { path: 'leaderboard', component: LeaderboardComponent }
];
