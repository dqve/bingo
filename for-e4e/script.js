/*
*
**
** Section: Bingo card selection animation
**
*
*/

$(".bingo-card__item").on('click', function() {
  $(this).toggleClass('active');
  console.log("click")
})

$('.clear-button').on('click', function(){
	$('.bingo-card__item').removeClass('active');
})



/*
*
**
** Section: loader section
**
*
*/

var pager

function loader() {
    pager = setTimeout(showPage, 1000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementsByTagName("main")[0].style.display = "block";
}


/*
*
**
** Section: Downloading Bingo image
**
*
*/


let image = ""
let name = document.querySelector("#myname").value

function downloadURI(uri, name) {
    var link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    console.log("done")   
    //after creating link you should delete dynamic link
    //clearDynamicLink(link); 
}

function download(){
    html2canvas(document.querySelector("body"), backgroundColor="null").then(canvas => {
    image = canvas.toDataURL("image/png");
    downloadURI("data:" + image, "yourImage.png");
});
}

function hider(){
  var nameSection = document.querySelector(".name")
  var foot = document.querySelector("footer")
  var bottomSection = document.querySelector("aside")
  var picHeader = document.createElement("h1")
  picHeader.style.color = '#198b85'
  picHeader.innerHTML = name
  nameSection.innerHTML = ""
  nameSection.appendChild(picHeader)
  bottomSection.style.display = 'none'
  foot.style.visibility = "hidden"
  body.children[3].visibility = "hidden"
}


/*
*
**
** Section: Modal display script
**
*
*/


var body = document.body;
var modal = createModal(document.querySelector("#modal-1"));
var openButton = document.querySelector("#open-button");

function createModal(container) {
  
  var content = container.querySelector(".modal-content");
  var dialog = container.querySelector(".modal-dialog");
  var polygon = container.querySelector(".modal-polygon");
  var svg = container.querySelector(".modal-svg");
  
  var point1 = createPoint(45, 45);
  var point2 = createPoint(55, 45);
  var point3 = createPoint(55, 55);
  var point4 = createPoint(45, 55);
      
  var animation = new TimelineMax({    
      onReverseComplete: onReverseComplete,
      onStart: onStart,
      paused: true
    })     
    .to(point1, 0.3, {
      x: 15,
      y: 30,
      ease: Power4.easeIn
    }, 0)
    .to(point4, 0.3, {
      x: 5,
      y: 80,
      ease: Power2.easeIn
    }, "-=0.1")
    .to(point1, 0.3, {
      x: 0,
      y: 0,
      ease: Power3.easeIn
    })
    .to(point2, 0.3, {
      x: 100,
      y: 0,
      ease: Power2.easeIn
    }, "-=0.2")
    .to(point3, 0.3, {
      x: 100,
      y: 100,
      ease: Power2.easeIn
    })
    .to(point4, 0.3, {
      x: 0,
      y: 100,
      ease: Power2.easeIn
    }, "-=0.1")  
    .to(container, 1, {
      autoAlpha: 1
    }, 0)  
    .to(content, 1, {
      autoAlpha: 1
    })
  
  var modal = {
    animation: animation,
    container: container,
    content: content,
    dialog: dialog,    
    isOpen: false,
    open: open,
    close: close   
  };
  
  body.children[2].removeChild(container);
    
  function onClick() {
    
    if (modal.isOpen) {
      close();
    }
  }
  
  function onStart() {
    body.appendChild(container);
    container.addEventListener("click", onClick);
  }
  
  function onReverseComplete() {
    container.removeEventListener("click", onClick);
    body.removeChild(container);
  }
  
  function open() {
    modal.isOpen = true;
    animation.play().timeScale(2);
  }
  
  function close() {
    modal.isOpen = false;
    animation.reverse().timeScale(2.5);
  }
    
  function createPoint(x, y) {
    var point = polygon.points.appendItem(svg.createSVGPoint());
    point.x = x || 0;
    point.y = y || 0;
    return point;
  }
  
  return modal;
}


/*
*
**
** Section: saving Data in google sheet
**
*
*/

// Client ID and API key from the Developer Console
var CLIENT_ID = '478863341573-11mjgcu5jei7ku27e6g79st752m0au3b.apps.googleusercontent.com';
var API_KEY = 'AIzaSyChCGRrcikcvBAF0854nOa2f8ITo8Vvvhk';

// Array of API discovery doc URLs for APIs used by the Bingo
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

const mySpreadsheetId = '1lLPYo2ysqbcNaocM2DRiwFf0SD9KkmS97CeisenD64U';
const myRange = 'bingo-submissions!A1:E';
var authorizeButton = document.getElementById('authorize_button');
var authorizeModal= document.getElementById('id01');


/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}


/** 
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  console.clear()
  if (isSignedIn) {
    loader()
    console.log("GAPI client loaded for API");
    authorizeModal.style.display = 'none';
  } else {
    authorizeModal.style.display = 'block';
    console.error("Error loading GAPI client for API", err);
  }
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    authorizeButton.onclick = handleAuthClick;
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  }, function(error) {
    console.log(JSON.stringify(error, null, 2));
  });
}


/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

const cards = document.querySelectorAll(".bingo-card__item ")
const closebtn = document.querySelector(".clear-button")
const savebtn = document.querySelector(".save-button")
let selected = []

function addSubmition(mySpreadsheetId, values, myRange) {
var values = values;
  var body = {
  values: [values]
  };
  gapi.client.sheets.spreadsheets.values.append({
  spreadsheetId: mySpreadsheetId,
  range: myRange,
  valueInputOption: "USER_ENTERED",
  resource: body
  }).then((response) => {
  var result = response.result;
  console.log(`${result.updatedCells} cells updated.`,values);
  modal.open();
  selected = []
  hider()
  download()
  });
}

savebtn.onclick = () => {
  let active = document.querySelectorAll(".active")
  let r = 0
  for(e of active){
    r = r + Number(e.getAttribute("weight"))
    selected.push(e.querySelector(".question").innerHTML)
  }
  var selectedValues = selected.slice(0, selected.length - 1).join(', ') + ", and " + selected.slice(-1)

  name = document.querySelector("#myname").value
  addSubmition(mySpreadsheetId, [name, r, selectedValues], myRange)
  function successFunc(data) {
    console.log(result);
  }
}


  /*
  *
  *Adds single row to spreadsheet using sheetsu
  *
  * 
  var data = {
    name: name,
    weight: r,
    selected: selected
  };
  Sheetsu.write("https://sheetsu.com/apis/v1.0bu/ff26f7713e1e", data, {}, successFunc);

  console.log(r, name, selected)
  selected = []
}


    function saveData() {
      var first_name = document.getElementsByName("first_name")[0].value,
        score = document.getElementsByName("score")[0].value;
      var data = {
        name: first_name,
        score: score
      }
      Sheetsu.write("https://sheetsu.com/apis/v1.0bu/579f464cd062", data, {}, function (result) {
        console.log(result);
      })
    }
    document.querySelector("#myForm").addEventListener("submit", function (e) {
      e.preventDefault();
      saveData();
    })
  */