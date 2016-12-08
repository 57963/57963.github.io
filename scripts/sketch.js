var c;
var s;

function setup(){
    s = $("#sketch");
    c=createCanvas(s.width(),s.height());
    c.parent("sketch");
    textSize(55);
    icount = Math.round(width/2/textWidth("I"));
    for(var i = 0 ; i < icount;i++){
        is[i]={y:0,rot:0};
    }
    obs[0] = width;
    fill(0);
}

var is=[];
var obs=[];
var icount;

function draw(){

    background(255);
    if(frameCount<200){
        textSize(width/5.5);
        title();
        o=0;
    } else{
        if(frameCount<250){
            textSize(map(frameCount,200,250,width/5.5,55));
        } else{
            textSize(55);
        }
        if(!lost){
            game();
        }else{
            looseScreen();
        }

    }

}

function looseScreen() {
    textAlign(CENTER,CENTER);
    textSize(width/6);
    text("YOU LOSE",width/2,height/2);
    textSize(width/12);
    text("With "+icount+" Is on your boi.",width/2,height/2+width/10);
    textSize(50);
    text("Click to restart.",width/2,height-50);
}

var o;
var y=0,v=0;
var j=0,f=0;
var lost, lostFrame;
function game() {
    o-=4;
    v-=0.5;
    y+=v;
    if(y<=0){
        y=0;
        v=0;
        j=0;
    }
    if(frameCount<250){
        var ly = map(frameCount,200,250,height,height/2+30);
        line(0,ly,width,ly);
    }else{
        line(0,height/2+30,width,height/2+30);
    }
    textAlign(CENTER,CENTER);
    for(var i = 0; i<is.length;i++){
        push();
        translate(width/2-i*textWidth("I")+o,(height/2)-is[i].y);
        rotate(is[i].rot);
        text("I",0,0);
        pop();
    }
    if(Math.random()<icount*0.0001){
        obs[obs.length]=width;
    }
    for(var i = 0; i<obs.length;i++){
        rect(obs[i],height/2-30,20,60);
        if(obs[i]<width/2+10&&obs[i]>width/2-10){
            if (y < 90) {
                lost=true;
                lostFrame = frameCount;
            }
        }
        obs[i]-=3.8;
    }
    if(-o>=textWidth("I")){
        o=0;
        for(var i = is.length-2;i>=0;i--){
            is[i+1]=is[i];
        }
        is[0]={y:y,rot:0};
        icount++;
        if(f>0){
            is[0].rot=TWO_PI/10*f;
            f++;
            if(f==10){
                f=0;
            }

        }
    }
}

function mousePressed(){
    if(lost){
        if(frameCount>lostFrame+60) {
            location.reload();
        }
    }else{
        if(j<2){
            if(j==1){
                f=1;
            }
            v=13;
            j++;
        }
    }
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


$(window).resize(function(){
    c.resize(s.width(),s.height());
});