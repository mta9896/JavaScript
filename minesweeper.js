var screenArray = [];
var isLost = false;
window.onload = function () {
        genrateGrid();

        var outerDiv = document.createElement('div');
        outerDiv.id = 'alert-modal';
        outerDiv.className = 'modal';
        var innerDiv = document.createElement('div');
        innerDiv.className = 'modal-content'
        var okButton = document.createElement('Button');
        var t = document.createTextNode("OK");
        okButton.appendChild(t);
        var nameInput = document.createElement("INPUT");
        nameInput.id = 'name';
        nameInput.className = 'field';
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("placeholder", "Enter your name");
        innerDiv.appendChild(nameInput)
        innerDiv.appendChild(okButton)
        outerDiv.appendChild(innerDiv);

        var windowDiv = document.createElement('div');
        windowDiv.className = 'window';

        var titleBar = document.createElement('div');
        titleBar.className = 'title-bar';
        windowDiv.appendChild(titleBar);
        var gameTitle = document.createElement('span')
        gameTitle.appendChild(document.createTextNode("Minesweeper Online"));
        titleBar.appendChild(gameTitle);
        var buttonDiv = document.createElement('div');
        var minButton = document.createElement('span');
        var closeButton = document.createElement('span');
        minButton.appendChild(document.createTextNode("-"));
        closeButton.appendChild(document.createTextNode("*"));
        minButton.className = 'btn';
        closeButton.className = 'btn';
        minButton.id = 'btn-minimize';
        closeButton.id = 'btn-close';
        buttonDiv.appendChild(minButton);
        buttonDiv.appendChild(closeButton);
        titleBar.appendChild(buttonDiv);
        var top = document.createElement('div');
        top.className = 'top';
        var counter1 = document.createElement('span');
        counter1.className = 'counter';
        counter1.appendChild(document.createTextNode("123"));
        windowDiv.appendChild(top);
        var counter2 = document.createElement('span');
        counter2.className = 'counter';
        counter2.appendChild(document.createTextNode("321"));
        var smile = document.createElement('span');
        smile.className = 'smile';
        smile.setAttribute('data-value','normal');
        top.appendChild(counter1);
        top.appendChild(smile);
        top.appendChild(counter2);
        var content = document.createElement('div');
        content.className = 'content-placeholder';
        initScreen(content);
        windowDiv.appendChild(content);
        document.body.appendChild(windowDiv);
        document.body.appendChild(outerDiv);
}

function genrateGrid() {
    for (var i = 0 ; i < 10 ; i++) {
    screenArray[i] = [];
      for (var j = 0; j < 10; j++) {
        screenArray[i][j] = 0;
      }
  }

    for(var i = 0; i<10; i++){
      var width = (Math.random()* 10 | 0);
      var height = (Math.random()* 10 | 0);
      screenArray[width][height] = 1;
    }
    console.table(screenArray);
    return screenArray
}

function initScreen(content) {
    for(let j=0; j<10; j++){
        var rowDiv = document.createElement('div');
        rowDiv.className = "row";
        rowDiv.id = j;
        console.log(rowDiv.id);
        for(let i=0; i<10; i++){
            let btn= document.createElement('Button');
                btn.classList.add("col");
            btn.id = i;
            if(screenArray[i][j] === 1)
                btn.style.backgroundColor="red";
            btn.onclick=function () {
                btn.classList.add("col-clicked");
                let bombs = clicked(i,j);
                console.log("bombs "+bombs);
                // let bombs = 0;
                if(!isLost ) {
                    if(bombs !== 0)
                        btn.innerHTML = bombs;
                    if (bombs === 0){
                        screenArray[i][j] = 2;
                        revealNeighbours(i,j);
                        // console.table(screenArray);
                    }
                    else
                        showBombCount(i,j);
                }
            }
            rowDiv.appendChild(btn);
        }
        content.appendChild(rowDiv);
    }
}


function clicked(width, height) {
        if(screenArray[width][height] === 1){
            isLost = true;
            for(let i=0; i<10; i++){
                for(let j=0;j<10; j++){
                    if(screenArray[i][j]=== 1){
                        document.getElementsByClassName("row")[j].getElementsByClassName("col")[i].style.backgroundColor = "red";
                        // let ddd = document.getElementById(i);
                        // console.log(ddd.id);
                        // console.log(i + " , " +j);
                    }

                }
            }
             // alert("you lost");
        }
        return findBombCount(width,height);
}

function revealNeighbours(height,width){ // a recursive function

        console.log("revealing neighbours for : "+height + " , " +width);
        if ((width - 1 > 0) && (height - 1 > 0) && (screenArray[height-1][width-1] !== 2) && findBombCount(height - 1, width - 1) === 0) {
            screenArray[height-1][width-1] = 2;
            revealNeighbours(height - 1, width - 1);
            document.getElementsByClassName("row")[width-1].getElementsByClassName("col")[height-1].classList.add("col-clicked");

        }
        if ((width - 1 > 0) && (height - 1 > 0) && (screenArray[height-1][width-1] !== 2) && findBombCount(height - 1, width - 1) !== 0)
            showBombCount(height-1 , width-1);

        if ((height - 1 > 0) && (screenArray[height-1][width] !== 2) && findBombCount(height - 1, width) === 0) {
            screenArray[height - 1][width] = 2;
            revealNeighbours(height - 1, width);
            document.getElementsByClassName("row")[width].getElementsByClassName("col")[height-1].classList.add("col-clicked");
        }
        if ((height - 1 > 0) && (screenArray[height-1][width] !== 2) && findBombCount(height - 1, width) !== 0)
            showBombCount(height-1 , width);

        if ((height - 1 > 0) && (width + 1 < 10) && (screenArray[height-1][width+1] !== 2) && findBombCount(height - 1, width + 1) === 0) {
            screenArray[height - 1][width + 1] = 2;
            revealNeighbours(height - 1, width + 1);
            document.getElementsByClassName("row")[width+1].getElementsByClassName("col")[height-1].classList.add("col-clicked");
        }
        if ((height - 1 > 0) && (width + 1 < 10) && (screenArray[height-1][width+1] !== 2) && findBombCount(height - 1, width + 1) !== 0)
            showBombCount(height-1 , width+1);

        if ((width - 1 > 0) && (screenArray[height][width-1] !== 2) && findBombCount(height, width - 1) === 0) {
            screenArray[height][width - 1] = 2;
            revealNeighbours(height, width - 1);
            document.getElementsByClassName("row")[width-1].getElementsByClassName("col")[height].classList.add("col-clicked");
        }
        if ((width - 1 > 0) && (screenArray[height][width-1] !== 2) && findBombCount(height, width - 1) !== 0)
            showBombCount(height , width-1);

        if ((width + 1 < 10) && (screenArray[height][width+1] !== 2) && findBombCount(height, width + 1) === 0) {
            screenArray[height][width + 1] = 2;
            revealNeighbours(height, width + 1);
            document.getElementsByClassName("row")[width+1].getElementsByClassName("col")[height].classList.add("col-clicked");
        }
        if ((width + 1 < 10) && (screenArray[height][width+1] !== 2) && findBombCount(height, width + 1) !== 0)
            showBombCount(height , width+1);

        if ((height + 1 < 10) && (width - 1 > 0) && (screenArray[height+1][width-1] !== 2) && findBombCount(height + 1, width - 1) === 0) {
            screenArray[height + 1][width - 1] = 2;
            revealNeighbours(height + 1, width - 1);
            document.getElementsByClassName("row")[width-1].getElementsByClassName("col")[height+1].classList.add("col-clicked");
        }
        if ((height + 1 < 10) && (width - 1 > 0) && (screenArray[height+1][width-1] !== 2) && findBombCount(height + 1, width - 1) !== 0)
            showBombCount(height+1 , width-1);

        if ((height + 1 < 10) && (screenArray[height+1][width] !== 2) && findBombCount(height + 1, width) === 0) {
            screenArray[height + 1][width] = 2;
            revealNeighbours(height + 1, width);
            document.getElementsByClassName("row")[width].getElementsByClassName("col")[height+1].classList.add("col-clicked");
        }
        if ((height + 1 < 10) && (screenArray[height+1][width] !== 2) && findBombCount(height + 1, width) !== 0)
            showBombCount(height+1 , width);

        if ((height + 1 < 10) && (width + 1 < 10) && (screenArray[height+1][width+1] !== 2) && findBombCount(height + 1, width + 1) === 0) {
            screenArray[height + 1][width + 1] = 2;
            revealNeighbours(height + 1, width + 1);
            document.getElementsByClassName("row")[width+1].getElementsByClassName("col")[height+1].classList.add("col-clicked");
        }
        if ((height + 1 < 10) && (width + 1 < 10) && (screenArray[height+1][width+1] !== 2) && findBombCount(height + 1, width + 1) !== 0)
            showBombCount(height+1 , width+1);

}

function findBombCount(width, height){
    let bombCount = 0;
    if((width-1>-1) && (height-1>-1) && screenArray[width-1][height-1] === 1)
        bombCount++;
    if((width-1>-1) && screenArray[width-1][height] === 1)
        bombCount++;
    if((width-1>-1) && (height+1<10) && screenArray[width-1][height+1] === 1)
        bombCount++;
    if((height+1<10) && screenArray[width][height+1] === 1)
        bombCount++;
    if((width+1<10) && (height+1<10) && screenArray[width+1][height+1] === 1)
        bombCount++;
    if((width+1<10) && screenArray[width+1][height] === 1)
        bombCount++;
    if((width+1<10) && (height-1>-1) && screenArray[width+1][height-1] === 1)
        bombCount++;
    if((height-1>-1) && screenArray[width][height-1] === 1)
        bombCount++;
    // console.log("number of bombs around " + width+ " , "+ height+ " : " + bombCount);
    return bombCount;
}

function showBombCount(i, j) {
    document.getElementsByClassName("row")[j].getElementsByClassName("col")[i].innerHTML = findBombCount(i, j);
    document.getElementsByClassName("row")[j].getElementsByClassName("col")[i].classList.add("col-clicked");
    let color;

    switch(findBombCount(i, j)) {
        case 1: {
            color = "blue";
        }
            break;
        case 2: {
            color = "green";
        }
            break;
        case 3 :{
            color = "red";
        }
            break;
        case 4 :{
            color = "darkblue";
        }
            break;
        case 5 :{
            color = "darkred";
        }
            break;
        case 6 :{
            color = "yellow";
        }
            break;
        case 7 :{
            color = "orange";
        }
            break;
        case 8 :{
            color = "pink";
        }
            break;
        default:
            color = "black";
    }

    document.getElementsByClassName("row")[j].getElementsByClassName("col")[i].style.color = color;

}