export class Player {
	// 1 - numPlayers
	playerNum = 0;
	timeDrinking = 0;
	timeDrinkingFormatted = '';

	// 0 = least, numPlayers-1 = most
	red = 0;
	green = 0;

	constructor(playerNum: number, timeDrinking: number) {
		this.playerNum = playerNum;
		this.timeDrinking = timeDrinking;
		this.timeDrinkingFormatted = '';
		this.red = 0;
		this.green = 0;
	}
}