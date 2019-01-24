import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

	@Input() numPlayers: number;
	@Input() startingPlayer: number;

	constructor() { }

	ngOnInit() {
		this.ResizeDiv();
	}

	ResizeDiv() {
		console.log('resize');

		if(window.innerWidth > 1000) {
			$("#table").width(window.innerWidth/2);
		}
		else {

		}

		if(window.innerHeight > 1000) {
			$("#table").height(window.innerWidth/2);
		}
	}

}
