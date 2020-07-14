/*
    const SPREADSHEET_ID = '1RNgRC9dpR2EidHe9GhNnRgtH8VstlCtoYiASy_LOvwI'; //from the URL of your blank Google Sheet
    const CLIENT_ID = '478863341573-11mjgcu5jei7ku27e6g79st752m0au3b.apps.googleusercontent.com'; //from https://console.developers.google.com/apis/credentials
    const API_KEY = 'AIzaSyChCGRrcikcvBAF0854nOa2f8ITo8Vvvhk'; //https://console.developers.google.com/apis/credentials
    const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
*/


$(".bingo-card__item").on('click', function() {
  $(this).toggleClass('active');
  console.log("click")
})

$('.clear-button').on('click', function(){
	$('.bingo-card__item').removeClass('active');
})


const cards = document.querySelectorAll(".bingo-card__item ")
const closebtn = document.querySelector(".clear-button")
const savebtn = document.querySelector(".save-button")
let name = document.querySelector("#myname").value
let selected = []

savebtn.onclick = () => {
  let active = document.querySelectorAll(".active")
  let r = 0
  for(e of active){
    r = r + Number(e.getAttribute("weight"))
    selected.push(e.querySelector(".question").innerHTML)
  }
  name = document.querySelector("#myname").value

  function successFunc(data) {
    console.log(result);
  }

  // Adds single row to spreadsheet
  var data = {
    name: name,
    weight: r,
    selected: selected
  };
  Sheetsu.write("https://sheetsu.com/apis/v1.0bu/ff26f7713e1e", data, {}, successFunc);

  console.log(r, name, selected)
}

  /*
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