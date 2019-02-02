import { Component, OnInit, Input } from '@angular/core';
import{ActivatedRoute} from '@angular/router';

import{Player} from '../classes';

declare const $: any;
declare const rgb: any;

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

	@Input() numPlayers: number;
	@Input() startingPlayer: number;

	playArr: number[];
	playerData: Player[];

	// timings[0] will be the amount of time player 0 drinks, etc
	thundArr: number[];

	centerX: number;
	centerY: number;
	radius: number

	leastTimeDrinking: number;
	mostTimeDrinking: number;

	constructor(
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.numPlayers = +this.route.snapshot.paramMap.get('numPlayers');
		this.playArr = [];
		this.playerData = [];
		this.mostTimeDrinking = 0;
		this.leastTimeDrinking = 0;
		let i = 0;
		while(i < this.numPlayers) {
			this.playArr.push(i);
			this.playerData.push(new Player(0,0));
			i++;
		}

		this.ResizeDiv();
		this.thundArr = [0,3626,7204,10788,13960,17554,21162,24852,28426,32004,
			41095,48244,55406,62650,71562,81903,132331,136062,139542,143243,193560,
			196906,200366,203978,221108,225122,228770,229444,232344,236216,239968,
			243342,246602,250314];
		// this.CreatePlayers();
	}

	ResizeDiv() {

		if(window.innerWidth > 700) {
			this.centerX = window.innerWidth/2;
			this.centerY = 150 + 250;
			this.radius = 250;
		}
		else {
			this.centerX = 350;
			this.centerY = 150 + 250;
			this.radius = 250;
		}
	}

	GetStyle(num: number): string {
		let styleObj: any = {};

		let xCoord = this.centerX - 45 + (this.radius + 75)*Math.cos(2*Math.PI*num/this.numPlayers);
		let yCoord = this.centerY + 70 + (this.radius + 75)*Math.sin(2*Math.PI*num/this.numPlayers);

		styleObj.left = xCoord + 'px';
		styleObj.top = yCoord + 'px';

		if(this.mostTimeDrinking > 0) {
			styleObj['background-color'] = 'rgb(' + this.playerData[num].red + ',' + this.playerData[num].green + ', 0)';
		}
		
		return(styleObj);
	}

	ComputeTimings(num: number) {
		if(!this.startingPlayer) {
			this.startingPlayer = num;

			// First, set the orderings according to the starting player
			let i = 0;
			while(i < this.numPlayers) {
				this.playerData[(i + this.startingPlayer)%this.numPlayers].playerNum = i + 1;
				i++;
			}

			// Now, we compute each player's time drinking
			this.startingPlayer = num;
			i = 1;
			while(i < this.thundArr.length) {
				this.playerData[(i - 1 + this.startingPlayer)%this.numPlayers].timeDrinking += 
					this.thundArr[i] - this.thundArr[i - 1];
				i++;
			}

			// Now we find the shortest and longest drinking times
			// And set the formatted times for the players
			i = 0;
			this.leastTimeDrinking = 250314;
			this.mostTimeDrinking = 0;
			while(i < this.playerData.length) {
				this.playerData[i].timeDrinkingFormatted = this.FormatTime(this.playerData[i].timeDrinking);
				if(this.playerData[i].timeDrinking < this.leastTimeDrinking) {
					this.leastTimeDrinking = this.playerData[i].timeDrinking;
				}
				if(this.playerData[i].timeDrinking > this.mostTimeDrinking) {
					this.mostTimeDrinking = this.playerData[i].timeDrinking;
				}
				i++;
			}

			// Now we set up the colors
			i = 0;
			while(i < this.playerData.length) {
				this.playerData[i].red = 255*((this.playerData[i].timeDrinking - this.leastTimeDrinking)/
					(this.mostTimeDrinking - this.leastTimeDrinking));
				this.playerData[i].green = 255 - this.playerData[i].red;
				i++;
			}

			this.ResizeDiv();
		}
	}

	FormatTime(milliseconds: number): string {
		return (Math.floor(milliseconds/1000) + ' secs');
	}
}
