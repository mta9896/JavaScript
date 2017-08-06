var screenArray = [];
var isLost = false;
window.onload = function () {
        genrateGrid();
        initialize();
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

function initialize() {
    var outerDiv = document.createElement('div');
        outerDiv.id = 'alert-modal';
        outerDiv.className = 'modal';
        var innerDiv = document.createElement('div');
        innerDiv.className = 'modal-content'
        let okButton = document.createElement('Button');
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
            // if(screenArray[i][j] === 1)
            //     btn.style.backgroundColor="darkred";
            btn.onclick=function () {
                btn.classList.add("col-clicked");
                let bombs = findBombCount(i,j);
                console.log("bombs "+bombs);
                if(!lose(i,j) ) {
                    if(bombs !== 0) {
                        btn.innerHTML = bombs;
                    }
                    if (bombs === 0){
                        screenArray[i][j] = 2;
                        revealNeighbours(i,j);
                    }
                    else
                        showBombCount(i,j);
                }
                else{ //when player loses


                }
                console.table(screenArray);
                win();
            }
            btn.onmousedown = function(event) {
                if (event.which == 3) {
                    setFlag(i,j);
                }
            }


            rowDiv.appendChild(btn);
        }
        content.appendChild(rowDiv);
    }
}



function revealNeighbours(height,width){ // a recursive function

        console.log("revealing neighbours for : "+height + " , " +width);
        if ((width - 1 > 0) && (height - 1 > 0) && (screenArray[height-1][width-1] !== 2) && findBombCount(height - 1, width - 1) === 0) {
            screenArray[height-1][width-1] = 2;
            revealNeighbours(height - 1, width - 1);
            if(document.getElementsByClassName("row")[width-1].getElementsByClassName("col")[height-1].innerHTML !== '⛿')
                document.getElementsByClassName("row")[width-1].getElementsByClassName("col")[height-1].classList.add("col-clicked");

        }
        if ((width - 1 > 0) && (height - 1 > 0) && (screenArray[height-1][width-1] !== 2) && findBombCount(height - 1, width - 1) !== 0 && (document.getElementsByClassName("row")[width-1].getElementsByClassName("col")[height-1].innerHTML !== '⛿'))
            showBombCount(height-1 , width-1);

        if ((height - 1 > 0) && (screenArray[height-1][width] !== 2) && findBombCount(height - 1, width) === 0) {
            screenArray[height - 1][width] = 2;
            revealNeighbours(height - 1, width);
            if(document.getElementsByClassName("row")[width].getElementsByClassName("col")[height-1].innerHTML !== '⛿')
                document.getElementsByClassName("row")[width].getElementsByClassName("col")[height-1].classList.add("col-clicked");
        }
        if ((height - 1 > 0) && (screenArray[height-1][width] !== 2) && findBombCount(height - 1, width) !== 0 && (document.getElementsByClassName("row")[width].getElementsByClassName("col")[height-1].innerHTML !== '⛿'))
            showBombCount(height-1 , width);

        if ((height - 1 > 0) && (width + 1 < 10) && (screenArray[height-1][width+1] !== 2) && findBombCount(height - 1, width + 1) === 0) {
            screenArray[height - 1][width + 1] = 2;
            revealNeighbours(height - 1, width + 1);
            if(document.getElementsByClassName("row")[width+1].getElementsByClassName("col")[height-1].innerHTML !== '⛿')
                document.getElementsByClassName("row")[width+1].getElementsByClassName("col")[height-1].classList.add("col-clicked");
        }
        if ((height - 1 > 0) && (width + 1 < 10) && (screenArray[height-1][width+1] !== 2) && findBombCount(height - 1, width + 1) !== 0 && (document.getElementsByClassName("row")[width+1].getElementsByClassName("col")[height-1].innerHTML !== '⛿'))
            showBombCount(height-1 , width+1);

        if ((width - 1 > 0) && (screenArray[height][width-1] !== 2) && findBombCount(height, width - 1) === 0) {
            screenArray[height][width - 1] = 2;
            revealNeighbours(height, width - 1);
            if(document.getElementsByClassName("row")[width-1].getElementsByClassName("col")[height].innerHTML !== '⛿')
                document.getElementsByClassName("row")[width-1].getElementsByClassName("col")[height].classList.add("col-clicked");
        }
        if ((width - 1 > 0) && (screenArray[height][width-1] !== 2) && findBombCount(height, width - 1) !== 0 && (document.getElementsByClassName("row")[width-1].getElementsByClassName("col")[height].innerHTML !== '⛿'))
            showBombCount(height , width-1);

        if ((width + 1 < 10) && (screenArray[height][width+1] !== 2) && findBombCount(height, width + 1) === 0) {
            screenArray[height][width + 1] = 2;
            revealNeighbours(height, width + 1);
            if(document.getElementsByClassName("row")[width+1].getElementsByClassName("col")[height].innerHTML !== '⛿')
                document.getElementsByClassName("row")[width+1].getElementsByClassName("col")[height].classList.add("col-clicked");
        }
        if ((width + 1 < 10) && (screenArray[height][width+1] !== 2) && findBombCount(height, width + 1) !== 0 && (document.getElementsByClassName("row")[width+1].getElementsByClassName("col")[height].innerHTML !== '⛿'))
            showBombCount(height , width+1);

        if ((height + 1 < 10) && (width - 1 > 0) && (screenArray[height+1][width-1] !== 2) && findBombCount(height + 1, width - 1) === 0) {
            screenArray[height + 1][width - 1] = 2;
            revealNeighbours(height + 1, width - 1);
            if(document.getElementsByClassName("row")[width-1].getElementsByClassName("col")[height+1].innerHTML !== '⛿')
                document.getElementsByClassName("row")[width-1].getElementsByClassName("col")[height+1].classList.add("col-clicked");
        }
        if ((height + 1 < 10) && (width - 1 > 0) && (screenArray[height+1][width-1] !== 2) && findBombCount(height + 1, width - 1) !== 0 && (document.getElementsByClassName("row")[width-1].getElementsByClassName("col")[height+1].innerHTML !== '⛿'))
            showBombCount(height+1 , width-1);

        if ((height + 1 < 10) && (screenArray[height+1][width] !== 2) && findBombCount(height + 1, width) === 0) {
            screenArray[height + 1][width] = 2;
            revealNeighbours(height + 1, width);
            if(document.getElementsByClassName("row")[width].getElementsByClassName("col")[height+1].innerHTML !== '⛿')
                document.getElementsByClassName("row")[width].getElementsByClassName("col")[height+1].classList.add("col-clicked");
        }
        if ((height + 1 < 10) && (screenArray[height+1][width] !== 2) && findBombCount(height + 1, width) !== 0 && (document.getElementsByClassName("row")[width].getElementsByClassName("col")[height+1].innerHTML !== '⛿'))
            showBombCount(height+1 , width);

        if ((height + 1 < 10) && (width + 1 < 10) && (screenArray[height+1][width+1] !== 2) && findBombCount(height + 1, width + 1) === 0) {
            screenArray[height + 1][width + 1] = 2;
            revealNeighbours(height + 1, width + 1);
            if(document.getElementsByClassName("row")[width+1].getElementsByClassName("col")[height+1].innerHTML !== '⛿')
                document.getElementsByClassName("row")[width+1].getElementsByClassName("col")[height+1].classList.add("col-clicked");
        }
        if ((height + 1 < 10) && (width + 1 < 10) && (screenArray[height+1][width+1] !== 2) && findBombCount(height + 1, width + 1) !== 0 && (document.getElementsByClassName("row")[width+1].getElementsByClassName("col")[height+1].innerHTML !== '⛿'))
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

function setFlag(height,width) {
    if(document.getElementsByClassName("row")[width].getElementsByClassName("col")[height].innerHTML == '⛿') {
    }
    else{
        document.getElementsByClassName("row")[width].getElementsByClassName("col")[height].innerHTML = '⛿';
    }

}

function win() {
    let k, t;
    let won = true;
    console.log("win");
    for(t=0; t<10; t++){
        for(k=0; k<10; k++){
            if( !(document.getElementsByClassName("row")[t].getElementsByClassName("col")[k].classList.contains("col-clicked")) && !(document.getElementsByClassName("row")[t].getElementsByClassName("col")[k].innerHTML =='⛿'))
                won = false;
        }
    }
    console.log("won = " +won);
    if(won) {
        var winAlert = document.createElement('div');
        winAlert.className = 'win-lose-alert';
        let text = document.createTextNode("You Won");
        winAlert.appendChild(text);
        let okButton = document.createElement('Button');
        let okText = document.createTextNode("");
        okButton.appendChild(okText);
        okButton.className = 'ok-button';
        winAlert.appendChild(okButton);
        document.body.appendChild(winAlert);
        okButton.onclick = function(){
            document.body.removeChild(winAlert);
            document.body.removeChild(document.getElementsByClassName('window')[0]);
            genrateGrid();
            initialize();
        }
    }
}

function lose(height,width) {
    var isLost = false;
    if(screenArray[height][width] === 1){
            isLost = true;
            for(let i=0; i<10; i++){
                for(let j=0;j<10; j++){
                    if(screenArray[i][j]=== 1){
                        document.getElementsByClassName("row")[j].getElementsByClassName("col")[i].style.backgroundColor = "red";
                    }

                }
            }
        }
        if(isLost){
            var loseAlert = document.createElement('div');
            loseAlert.className = 'win-lose-alert';
            let text = document.createTextNode("You Lost");
            loseAlert.appendChild(text);
            let okButton = document.createElement('Button');
            let okText = document.createTextNode("New Game");
            okButton.appendChild(okText);
            okButton.className = 'ok-button';
            loseAlert.appendChild(okButton);
            document.body.appendChild(loseAlert);
            okButton.onclick = function(){
                document.body.removeChild(loseAlert);
                document.body.removeChild(document.getElementsByClassName('window')[0]);
                genrateGrid();
                initialize();
            }
        }
        return isLost;
    
}