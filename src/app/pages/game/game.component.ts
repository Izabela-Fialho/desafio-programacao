import { Component } from '@angular/core';
import { Board } from './game.component.board';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  numCols: number;
  numRows: number;
  generation: number;
  gameStatus: number;

  board: Board;

  constructor() {
    this.numCols= 10;
    this.numRows= 10;
    this.generation=0;
    this.gameStatus= -1;
    this.board = new Board( this.numCols, this.numRows);
  }

  ngOnInit(){
    setInterval(()=>{
      if (this.gameStatus === 0){
        this.board.checkBoard();
        this.generation ++;
      }
    }, 400);
  }
  onClick(pRow:number,pCol:number){
    this.board.changeStatus(pRow,pCol);
  }


  onClickPause(){
    this.gameStatus = 1;
    console.log('Iniciou onClickPause')
    console.log(this.gameStatus)
  }

  onClickStart(){
    this.gameStatus = 0;
    console.log('Iniciou onClickStatus')
    console.log(this.gameStatus)

  }


}
