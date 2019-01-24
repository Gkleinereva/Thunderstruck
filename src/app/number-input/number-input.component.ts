import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';

@Component({
	selector: 'app-number-input',
	templateUrl: './number-input.component.html',
	styleUrls: ['./number-input.component.css']
})
export class NumberInputComponent implements OnInit {

	numOptions: number;
	optionsArr: number[];

	constructor(
		private router: Router
	) { }

	ngOnInit() {
		this.numOptions = 21;
		this.optionsArr = [];
		let i = 2;
		while(i < this.numOptions) {
			this.optionsArr.push(i);
			i++;
		}
	}

	InitStartingPos(numPlayers: number) {
		this.router.navigateByUrl('/numPlayers/' + numPlayers);
		return;
	}

}
