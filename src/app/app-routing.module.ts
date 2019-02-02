import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{NumberInputComponent} from './number-input/number-input.component';
import {TableComponent} from './table/table.component';

const routes: Routes = [
	{path: 'numPlayers', component: NumberInputComponent},
	{path: 'numPlayers/:numPlayers', component: TableComponent},
	{path: 'numPlayers/:numPlayers/startingPlayer/:startPlayer', component: TableComponent},
	{path: '', redirectTo: '/numPlayers', pathMatch: 'full'},
	{path: '**', redirectTo: '/numPlayers', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
