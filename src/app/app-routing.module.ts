import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{NumberInputComponent} from './number-input/number-input.component';

const routes: Routes = [
	{path: 'numPlayers', component: NumberInputComponent},
	{path: '', redirectTo: '/numPlayers', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
