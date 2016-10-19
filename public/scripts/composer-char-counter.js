document.getElementsByName("text")[0].addEventListener("keyup", countChar);

function countChar(){
    var counter = 140;
    counter =  counter - this.value.length;
    document.getElementsByClassName("counter")[0].innerHTML = counter;
    document.getElementsByClassName("counter")[0].style.color = "";
    if(counter < 0){
      document.getElementsByClassName("counter")[0].style.color = "red";
    }
}
