const primer = [
  ['#','#','#','#','#','#','#','#','+'],//0
  ['#','+','+','+','#','+','+','+','#'],//1
  ['#','+','+','+','#','+','#','+','#'],//2
  ['+','+','#','+','0','+','#','+','#'],//3
  ['#','#','#','+','#','#','#','#','#'],//4
  ['#','#','+','+','#','#','#','#','#'],//5
  ['#','#','+','0','#','#','#','#','#'],//6
  ['#','#','#','#','#','#','#','#','#'],//7
//  0   1   2   3   4   5   6   7   8 X | Y
]


function BreakException(value) {
    this.value = value;
}
const maxY=primer.length;
const maxX=primer[0].length-1;

let isWay = val => (val == '+'||val == '0');
let isStart = val => (val == '0');


// поиск всех выходов по периметру лабиринта 
// и выдача их в виде двумерного массива 
let wayouts = [];
let finalPath = [];
primer.forEach(( arrVal, y, array) => {
    let result = wayouts;
    if (y == '0' || y == array.length-1) 
        arrVal.map(function (val,x){if (isWay(val)) result.push([[y,x]])})
    else {
        if (isWay(arrVal[0])) result.push([[y,0]]);
        if (isWay(arrVal[arrVal.length-1])) result.push([[y,arrVal.length-1]]);
    }

})

console.table(wayouts)
let wayout = [];
// wayouts.forEach((wayout,ind)=>{  
for (let ind = 0; (ind < wayouts.length && finalPath.length==0 && (wayout=wayouts[ind])); ind++) {     
    
    let posibleWays = []
    let OldWayCount = 0;
    let [mY,mX] = wayout[0];
    // console.log('x '+mX+' y '+mY+'='+primer[mY][mX]);

    posibleWays.push([[mY,mX]])
    while(posibleWays.length>0){console.table(primer)

        if (isStart(primer[mY][mX])){
            finalPath = posibleWays;
            // throw new BreakException
            break;
        }
        else
            primer[mY][mX] = 'X'
        
        OldWayCount=posibleWays.length;
        //left
        if (mX>0&&isWay(primer[mY][mX-1]))posibleWays.push([[mY,mX-1]])
        else//top
        if (mY>0&&isWay(primer[mY-1][mX]))posibleWays.push([[mY-1,mX]])
        else//right
        if (mX<maxX&&isWay(primer[mY][mX+1]))posibleWays.push([[mY,mX+1]])
        else//bottom
        if (mY<maxY&&isWay(primer[mY+1][mX]))posibleWays.push([[mY+1,mX]])

        console.log('posibleWaysCount '+posibleWays.length);


        if (OldWayCount==posibleWays.length)
            posibleWays.pop()    
            
            
        if (posibleWays.length>0){
            // console.log('posibleWays');
            // console.table(posibleWays[0][0]);
            // console.table( wayout[0]);
            [mY,mX] = posibleWays[posibleWays.length-1][0];
        }
    }

    // if (ind === 0) throw BreakException;;
    //посмотреть по сторонам

}//)



// console.table(wayouts)
// console.table(wayouts.shift())
// console.table(primer)

// if (finalPath.length!==0) console.table(finalPath)

//transcribe path
let prevPos=finalPath.pop()
let nextPos=undefined;
let path = [];
let [dY,dX] = [0,0];
while(nextPos=finalPath.pop()){
    [dY,dX] = [prevPos[0][0]-nextPos[0][0],prevPos[0][1]-nextPos[0][1]];
    if (dX==-1 && dY==0) path.push('right')
    else if (dX===0&& dY==-1) path.push('bottom')
    else if (dX==1&&dY==0) path.push('left')
    else if (dX==0&&dY==1) path.push('top')
    prevPos=nextPos;
}
console.log('>>>'+path.join(','))