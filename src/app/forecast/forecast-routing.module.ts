import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastContainerComponent } from './components/forecast-container/forecast-container.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'forecast',
    component: ForecastContainerComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ForecastRoutingModule {}
