import { Routes } from '@angular/router';
import { HomeComponent } from './views/pages/home/home.component';
import { AppComponent } from './app.component';
import { TaskDashboardComponent } from './views/pages/task-dashboard/task-dashboard.component';
import { AuthGuard } from './helpers/auth.guard';
import { TaskContainerComponent } from './views/public-components/task-container/task-container.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'task-dashboard', component:TaskDashboardComponent, canActivate: [AuthGuard]},

    { path: '**', redirectTo: '' }
];
