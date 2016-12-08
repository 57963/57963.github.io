var c;
var s;

function setup(){
    s = $("#sketch");
    c=createCanvas(s.width(),s.height());
    c.parent("sketch");

}

function draw(){
    background(255);

    title();

}

var boi=" BOI";
function title(){
    var o=width/2;
    textSize(width/5.5);
    if(frameCount>60){
        o-=(frameCount-60)*20;
        textAlign(LEFT);
        textStyle(BOLD);
        text(boi,o,height/2);
    } else{
        textAlign(LEFT);
        textStyle(BOLD);
        text(boi,o,map(frameCount,30,60,height+100,height/2));
    }
    if(frameCount<=30){
        textAlign(RIGHT,CENTER);
        textStyle(NORMAL);
        text("YEAH",o,map(frameCount,0,30,-100,height/2));
    }else{
        textAlign(RIGHT);
        textStyle(NORMAL);
        text("YEAH",o,height/2);

    }
    while(o+textWidth(boi)+(textWidth("I")/2)<width/2){
        boi+="I";
    }
}


$(window).resize(function(){
    c.resize(s.width(),s.height());
});