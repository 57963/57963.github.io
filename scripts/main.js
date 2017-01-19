/**
 * Created by callu on 19/01/2017.
 */
function preload() {
    if(getURLParams().depth==undefined){
        depth=0;
    }else{
        depth=parseInt(getURLParams().depth)+1;
    }
        switch (getURLParams().skin) {
            default:
                if(depth==0) {
                    snd = loadSound('assets/snd.mp3');
                }
        }
    if(depth>0){
        console.info("I am so sorry for all the errors, this is as stable as i can get it lol");
    }
}

var depth;
var snd;
var c;
var s;
var is=[];
var obs=[];
var pwrs=[];
var prts=[];
var icount;
var stopped;

var high;
var o;
var y=0,v=0;
var j=0,f=0;
var lost, lostFrame;

var loGrav=0, pwrJmp=0, triJmp=0;
var grav = 0.5, pwr = 13, jmpLim = 2;


function setup() {
    playSound = (getURLParams().sound != "false");


    switch (getURLParams().skin){
        case "christmas":$.getScript("scripts/christmasSkin.js");break;
        case "miranda":$.getScript("scripts/mirandaSkin.js");break;
        default: $.getScript("scripts/defaultSkin.js")
    }

    s = $("#sketch");
    c=createCanvas(s.width(),s.height());
    c.parent("sketch");
    textSize(55);
    icount = Math.round(width/2/textWidth("I"));
    for(var i = 0 ; i < icount;i++){
        is[i]={y:0,rot:0,img:Math.min(5,Math.round(Math.random()*6))};
    }
    obs[0] = width;
    fill(0);
    if(playSound) {
        snd.play();
        snd.setVolume(0.25);
    }
}

function loseScreen() {
    if(icount>300){
        stopped = true;
        if(Object.keys(getURLParams()).length>0){
            s.html("<iframe height='50%' width='100%' src='"+window.location.href+"&depth="+depth+"&sound=false'></iframe><br><iframe height='50%' width='100%' src='"+window.location.href+"&depth="+depth+"&sound=false'></iframe>");
        }else{
            s.html("<iframe height='50%' width='100%' src='"+window.location.href+"?depth="+depth+"&sound=false'></iframe><br><iframe height='50%' width='100%' src='"+window.location.href+"?depth="+depth+"&sound=false'></iframe>");
        }
    }
    textAlign(CENTER,BOTTOM);
    textSize(width/6);
    text("YOU LOSE",width/2,height/2);
    textAlign(CENTER,TOP);
    textSize(width/12);
    text("With "+icount+" i's on your boi.",width/2,height/2);
    boi = "YEA BO";
    textAlign(CENTER,CENTER);
    textSize(10);
    for(var i = 0; i< icount;i++){
        boi +="I";
    }
    text("("+boi+")",width/2,height/2+width/12+50);
    textSize(40);
    text("Global highscore: "+high,width/2,height-100);
    textSize(50);
    text("Click to restart.",width/2,height-50);
}

var boi=" BOI";
function title(){
    o=width/2;
    if(frameCount>60){
        o-=(frameCount-60)*15;
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


function mousePressed(){
    if(lost){
        if(frameCount>lostFrame+60) {
            var params = "?";
            if(!playSound){
                params+="sound=false&";
            }

            if(getURLParams().skin!=undefined){
                params+="skin="+getURLParams().skin;
            }

            window.location.href = params;
        }
    }else{
        if(mouseX>width-150&&mouseY<150){
            playSound=!playSound;
            if(playSound){
                snd.play();
            }else{
                snd.pause();
            }
        }else if(j<jmpLim){
            if(j>0){
                f=1;
            }
            v=pwr;
            j++;
        }
    }
}

function keyPressed(){
    switch (key){
        case 'M':
            playSound = ! playSound;
            if(playSound){
                snd.play();
            }else{
                snd.pause();
            }
            break;
        default:
            mousePressed();
    }
}