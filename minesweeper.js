var screenArray = [];
var isLost = false;
window.onload = function () {
    // Register a helper
  Handlebars.registerHelper('capitalize', function(str){
    // str is the argument passed to the helper when called
    str = str || '';
    return str.slice(0,1).toUpperCase() + str.slice(1);
  });

  // Grab the template script
  // var theTemplateScript = document.getElementById("built-in-helpers-template").innerHTML;

  // Compile the template
  // var theTemplate = Handlebars.compile(theTemplateScript);

  // We will call this template on an array of objects

  var context = {
    animals:[
      {
        name: "cow",
        noise: "moooo"
      },
      {
        name: "cat",
        noise: "meow"
      },
      {
        name: "fish",
        noise: ""
      },
      {
        name: "farmer",
        noise: "Get off my property!"
      }
    ],
      grid: genrateGrid()
  };


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
        // var contentParent =  document.createElement('div');
        // contentParent.className = 'content-parent';
        initScreen(content);
        windowDiv.appendChild(content);
        document.body.appendChild(windowDiv);
        document.body.appendChild(outerDiv);



  // Pass our data to the template
  // var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  // document.getElementsByClassName('content-placeholder')[0].innerHTML = theCompiledHtml;
}

function genrateGrid() {
    for (var i = 0 ; i < 10 ; i++) {
    screenArray[i] = []; // Initialize inner array
      for (var j = 0; j < 10; j++) { // i++ needs to be j++
        screenArray[i][j] = false;
      }
  }

    for(var i = 0; i<10; i++){
      var width = (Math.random()* 10 | 0);
      var height = (Math.random()* 10 | 0);
      screenArray[width][height] = true;
      // console.log(width + " , " + height);
    }
    console.table(screenArray);

  // console.log(width);

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
            // if(screenArray[i][j] === true)
            //     btn.style.backgroundColor = "red";
            btn.onclick=function () {
                btn.classList.add("col-clicked");
                let bombs = clicked(i,j);
                // console.log("bombs "+bombs);
                // let bombs = 0;
                if(!isLost ) {
                    if(bombs !== 0)
                        btn.innerHTML = bombs;
                    // if (bombs === 0){
                    //     btn.style.color = "#88BFE8";
                    // }
                    if (bombs === 1)
                        btn.style.color = "blue";
                    if (bombs === 2)
                        btn.style.color = "green";
                    if (bombs === 3)
                        btn.style.color = "red";
                    if (bombs === 4)
                        btn.style.color = "darkblue";
                    if (bombs === 5)
                        btn.style.color = "darkred";
                    if (bombs === 6)
                        btn.style.color = "yellow";
                    if (bombs === 7)
                        btn.style.color = "orange";
                    if (bombs === 8)
                        btn.style.color = "pink";
                }
            }
            rowDiv.appendChild(btn);
        }
        content.appendChild(rowDiv);
    }
}


function clicked(width, height) {
        if(screenArray[width][height] === true){
            isLost = true;
            for(let i=0; i<10; i++){
                for(let j=0;j<10; j++){
                    if(screenArray[i][j]=== true){
                        document.getElementsByClassName("row")[j].getElementsByClassName("col")[i].style.backgroundColor = "red";
                        // let ddd = document.getElementById(i);
                        // console.log(ddd.id);
                        // console.log(i + " , " +j);
                    }

                }
            }
             // alert("you lost");
        }

    let bombCount = 0;
    if((width-1>-1) && (height-1>-1) && screenArray[width-1][height-1] === true)
        bombCount++;
    if((width-1>-1) && screenArray[width-1][height] === true)
        bombCount++;
    if((width-1>-1) && (height+1<10) && screenArray[width-1][height+1] === true)
        bombCount++;
    if((height+1<10) && screenArray[width][height+1] === true)
        bombCount++;
    if((width+1<10) && (height+1<10) && screenArray[width+1][height+1] === true)
        bombCount++;
    if((width+1<10) && screenArray[width+1][height] === true)
        bombCount++;
    if((width+1<10) && (height-1>-1) && screenArray[width+1][height-1] === true)
        bombCount++;
    if((height-1>-1) && screenArray[width][height-1] === true)
        bombCount++;
    return bombCount;
}