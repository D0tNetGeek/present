import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { AuthGuard } from '../core';
import { UserDashboardComponent } from './dashboard/dashboard.component';
import { HealthCheckComponent } from './health-check/health-check.component';
import { UserSurveyComponent } from './survey/survey.component';
import { CanDeactivateGuardService } from '../core/services/can-deactivate-guard.service';
import { SurveyWelcomeComponent } from './survey-welcome/survey-welcome.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children: [
                    {
                        path: '',
                        redirectTo: '/user/dashboard',
                        pathMatch: 'full'
                    },
                    {
                        path: 'dashboard',
                        component: UserDashboardComponent
                    },
                    {
                        path: 'user-health-check',
                        component: HealthCheckComponent
                    },
                    {
                        path: 'survey-welcome', // /:userId/:surveyId/:surveyIterationId', 
                        component: SurveyWelcomeComponent
                    },
                    {
                        path: 'survey',
                        component: UserSurveyComponent,
                        canDeactivate: [CanDeactivateGuardService]
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule {}