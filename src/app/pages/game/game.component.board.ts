export class Board{

  board: number [][];

  constructor(pWidth:any, pHeight:any){
    this.board =[];
    for(let i=0; i<pWidth;i++){
      this.board[i]=[];
      for (let j=0; j < pHeight; j++){
        this.board[i][j]=0;
      }
    }
  }

  status(coordX: number,coordY: number): number{
    return this.board[coordX][coordY];
  }

  changeStatus(coordX:number, coordY: number){
    this.board[coordX][coordY] = this.board[coordX][coordY] === 0 ? 1:0;
  }

  checkBoard(){
    let tmpBoard:any[] = [];
    console.log("checkBoard")
    for(let i=0; i< this.board.length;i++){
      tmpBoard[i]=[];
      for(let j= 0; j< this.board[i].length; j++){
        tmpBoard[i].push(this.checkRules(i,j));
      }
    }
    this.board= [...tmpBoard];
  }

  checkRules(coordX:number, coordY: number): number{
    const width =this.board.length;
    const heigth =this.board[0].length;

    const xMenos = coordX -1 <0 ? width -1 : coordX -1;
    const xMais = coordX + 1 >= width ? 0: coordX +1;
    const yMenos = coordY -1 <0 ? heigth -1 : coordY -1;
    const yMais = coordY + 1 >= heigth ? 0: coordY +1;

    const currentStatus = this.board[coordX][coordY];
    const vizinhos=

      this.board[coordX][yMais] +
      this.board[coordX][yMenos] +
      this.board[xMais][coordY] +
      this.board[xMenos][coordY] +
      this.board[xMais][yMais] +
      this.board[xMais][yMenos]+
      this.board[xMenos][yMais] +
      this.board[xMenos][yMenos];

    if ( currentStatus === 1 && (vizinhos ===2 || vizinhos === 3)){
      return 1;
    }
    else if ( currentStatus === 0 && vizinhos ===3) {
      return 1;
    }
    return 0;
  }
}
