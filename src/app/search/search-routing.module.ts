import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { SearchContainerComponent } from './search-container/search-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'find',
    pathMatch: 'full'
  },
  {
    path: 'find',
    component: SearchContainerComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SearchRoutingModule {}
