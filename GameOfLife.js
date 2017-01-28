"use strict"
/*
	Amber Krause
	April 28, 2016
	CISC 131

	Conway's Game of Life. Arrays, setInterval, isInArray, create2dArray,
	copy2dArray, create html from array.
*/
window.onload=function()
{
 var gameBoardArray;
 var i;
 var j;
 var tempArray;
 gameBoardArray=create2dArray(100, 100, getDeadValue());
 tempArray=copy2dArray(gameBoardArray);
 createGameBoard(document.getElementById("gameBoard"), gameBoardArray);
 createFirstGeneration(gameBoardArray);
 for(i=0; i<gameBoardArray.length; i++)
  for(j=0; j<gameBoardArray[i].length; j++)
  {
   if(gameBoardArray[i][j]===getLiveValue())
   {
	document.getElementById("r"+i+"c"+j).style.backgroundColor=getLiveColor();
   }
   else
   {
	document.getElementById("r"+i+"c"+j).style.backgroundColor=getDeadColor();
   }
  }
 window.setInterval(function() {applyRules(gameBoardArray, tempArray);}, 1000);
};

function getDeadValue()
{
 //return value of the dead state
 return 0;
}

function getLiveValue()
{
 //return value of the live state
 return 1;
}

function isAlive(cell)
{
 //return true if the cell is alive
 //return false if the cell is dead
 return cell===getLiveValue();
}

function getLiveColor()
{
 //return the background color that indicates a cell is alive
 return "rgb(178, 102, 255)";
}

function getDeadColor()
{
 //return the background color that indicates a cell is dead
 return "white";
}

function isInArray(array2d, row, col)
{
 //return true if the row and column numbers are valid for the array
 return row>=0&&row<array2d.length&&col>=0&&col<array2d[row].length;
}

function create2dArray(rows, columns, initialValue)
{
 //return new rectangular two dimension array
 var i;
 var j;
 var result;
 result=new Array(rows);
 for(i=0; i<rows; i++) { result[i]=new Array(columns); }
 for(i=0; i<rows; i++)
   for(j=0; j<columns; j++) { result[i][j]=initialValue; }
 return result;
}

function copy2dArray(array)
{
 //return a copy of the two dimension array
 var i;
 var j;
 var result;
 result=new Array(array.length);
 for(i=0; i<result.length; i++)
 {
  result[i]=new Array(array[i].length);
  for(j=0; j<result[i].length; j++)
   result[i][j]=array[i][j];
 }
 return result;
}

function trim(data)
{
 //remove leading and trailing whitespace characters
 var result;
 if(typeof data==="string")
 {
  var end;
  var start;
  var whitespace;
  whitespace=" \n\r\t\f";
  start=0;
  while(start<data.length&&whitespace.indexOf(data.charAt(start))>=0)
  {
   start=start+1;
  }
  end=data.length-1;
  while(end>=0&&whitespace.indexOf(data.charAt(end))>=0)
  {
   end=end-1;
  }
  if(end<start) { result=""; }
  else
  {
   result=data.substring(start, end+1);
  }
 }
 else { result=data; }
 return result;
}

function createHTMLElement(elementType, id, classInfo, content)
{
 //return string of html for an element with the passed parameters
 if(elementType===null) { elementType=""; }
 elementType=""+elementType;
 elementType=trim(elementType);
 if(id===null) { id=""; }
 id=""+id;
 id=trim(id);
 if(classInfo===null) { classInfo=""; }
 classInfo=""+classInfo;
 classInfo=trim(classInfo);
 if(content===null) { content=""; }
 content=""+content;
 if(id.length>0)
 {
  id=' id="'+id+'"'
 }
 if(classInfo.length>0)
 {
  classInfo=' class="'+classInfo+'"';
 }
 return '<'+elementType+id+classInfo+'>'+content+'</'+elementType+'>';
}

function createGameBoard(containerElement, array2d)
{
 //set the innerHTML of the passed element to a rectangular grid of divs
 //with the same size as the rectangular two dimension array
 var htmlArray;//array where each element contains html for an cell in the game board
 var htmlString;//concatenated html from the html array
 var i;//row
 var j;//column
 htmlString="";
 htmlArray=new Array(array2d.length);
 for(i=0; i<htmlArray.length; i++)
 {
  htmlArray[i]=new Array(array2d[i].length);
 }
 i=0;
 for(j=0; j<array2d[i].length-1; j++)
 {
  htmlArray[i][j]=createHTMLElement("div", "r"+i+"c"+j, "cell firstRow", "");
 }
 htmlArray[i][j]=createHTMLElement("div", "r"+i+"c"+j, "cell firstRow lastCol", "");
 for(i=1; i<array2d.length; i++)
 {
  j=0;
  htmlArray[i][j]=createHTMLElement("div", "r"+i+"c"+j, "cell newRow", "");
  for(j=1; j<array2d[i].length-1; j++)
  {
   htmlArray[i][j]=createHTMLElement("div", "r"+i+"c"+j, "cell", "");
  }
  htmlArray[i][j]=createHTMLElement("div", "r"+i+"c"+j, "cell lastCol", "");
 }
 for(i=0; i<htmlArray.length; i++)
 {
  for(j=0; j<htmlArray[i].length; j++)
  {
   htmlString=htmlString+htmlArray[i][j];
  }
 }
 containerElement.innerHTML=htmlString;
}

function createFirstGeneration(array2d)
{
 //set states for first generation
 var i;
 var j;
 for(i=0; i<array2d.length; i++)
  for(j=0; j<array2d[i].length; j++)
  {
   if(i===j||i==j||(i+j)%2===0) { array2d[i][j]=getLiveValue(); }
   //if(i===j||i+7===j||i-7===j||-j+99===i) { array2d[i][j]=getLiveValue(); }
   //if((i+j)%4===0||(j*i)%15===1) { array2d[i][j]=getLiveValue(); }
  }
}

function countLivingNeighborsOf(array2d, row, col)
{
 var i;
 var j;
 var liveNeighbors;
 liveNeighbors=0;
 for(i=row-1; i<row+2; i++)
  for(j=col-1; j<col+2; j++)
   if((i!==row||j!==col)&&isInArray(array2d, i, j)===true)
    if(array2d[i][j]===getLiveValue())
     liveNeighbors=liveNeighbors+1;
 return liveNeighbors;
}

function applyRules(array2d, tmpArray)
{
 //store in tmpArray the number of living neighbors for each element
 //change array2d to reflect the new state of each element
 //update background colors based on the new state
 var i;
 var j;
 for(i=0; i<array2d.length; i++)
  for(j=0; j<array2d[i].length; j++)
   tmpArray[i][j]=countLivingNeighborsOf(array2d, i, j);
 for(i=0; i<array2d.length; i++)
  for(j=0; j<array2d[i].length; j++)
  {
   if(array2d[i][j]===getLiveValue())
   {
	if(tmpArray[i][j]<2||tmpArray[i][j]>3) { array2d[i][j]=getDeadValue(); }
   }
   else { if(tmpArray[i][j]===3) { array2d[i][j]=getLiveValue(); } }
  }
 for(i=0; i<array2d.length; i++)
   for(j=0; j<array2d[i].length; j++)
   {
    if(array2d[i][j]===getLiveValue())
    {
 	document.getElementById("r"+i+"c"+j).style.backgroundColor=getLiveColor();
    }
    else
    {
 	document.getElementById("r"+i+"c"+j).style.backgroundColor=getDeadColor();
    }
   }
}