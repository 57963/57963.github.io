var c;
var s;

function setup(){
    s = $("#sketch");
    c=createCanvas(s.width(),s.height());
    c.parent("sketch");
    textSize(55);
    icount = Math.round(width/2/textWidth("I"));

    obs[0] = width;
    fill(0);
    if(playSound) {
       snd.play();
       snd.setVolume(0.25);
    }
}

var obs=[];
var pwrs=[];
var prts=[];
var icount;

var players = [];

function draw(){
    fill(0);
    background(255);
    if(frameCount<200){
        textSize(width/5.5);
        title();
        o=0;
    } else{
        if(!lost){
            game();
        }else{
            fill(0);
            loseScreen();
            if(playSound) snd.rate(constrain(snd.playbackRate - 0.02, 0, 1));
        }

    }
    noStroke();
}

function loseScreen() {
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
var high;
var o;
var lost, lostFrame;
function game() {


    var ly;
    fill(0);
    if(frameCount<250){
        ly = map(frameCount,200,250,height,height/2+30);
        textSize(40);
        textAlign(LEFT,BOTTOM);
        text("You have "+icount+" i's on your boi.",10,map(frameCount,200,250,height+50,height-10));
        textAlign(RIGHT,TOP);
        textSize(30);
        text("Sound is "+(playSound?"on":"off")+", press M or top right to "+(!playSound?"un":"")+"mute.",width-10,map(frameCount,200,250,-50,10));
        textSize(map(frameCount,200,250,width/5.5,55));
    }else{
        ly = height/2+30;
        textSize(40);
        textAlign(LEFT,BOTTOM);
        text("You have "+icount+" i's on your boi.",10,height-10);
        textAlign(RIGHT,TOP);
        textSize(30);
        text("Sound is "+(playSound?"on":"off")+", press M or top right to "+(!playSound?"un":"")+"mute.",width-10,10);
        textSize(55);
    }
    stroke(0);
    line(0,ly,width,ly);
    noStroke();
    textStyle(BOLD);
    textAlign(CENTER,CENTER);
    fill(0);
    o-=4;
    var newI = false;
    if (-o >= textWidth("I")) {
        o = 0;
        newI=true;
    }
    for(var p=0;p<players.length;p++) {
        players[p].v-=grav;
        players[p].y+=players[p].v;
        if(players[p].y<=0){
            players[p].y=0;
            players[p].v=0;
            players[p].j=0;
        }
        if (newI) {
            o = 0;
            for (var i = players[p].is.length - 2; i >= 0; i--) {
                players[p].is[i + 1] = players[p].is[i];
            }
            players[p].is[0] = {y: players[p].y, rot: 0};
            icount++;
            if (players[p].f > 0) {
                players[p].is[0].rot = TWO_PI / 10 * players[p].f;
                players[p].f++;
                if (players[p].f == 10) {
                    players[p].f = 0;
                }

            }
        }
        for(var i = 0; i<players[p].is.length;i++){
            push();
            translate(width/2-i*textWidth("I")+o,(height/2)-players[p].is[i].y);
            rotate(players[p].is[i].rot);
            text("I",0,0);
            pop();
        }

        push();
        translate(width/(players.length+1)*(p+1),height*3/4);
        rect(-10,-10,20,20);
        pop();
    }


    textStyle(NORMAL);
    if(Math.random()<icount*0.0001){
        obs[obs.length]=width;
    }
    for(var i = 0; i<obs.length;i++){
        rect(obs[i],ly-60,20,60);
        if(obs[i]<width/2+10&&obs[i]>width/2-10){
            /*if (y < 90) {
                lost=true;
                $("#fbPage").css("display","inline");
                high = ((icount+Math.round(Math.random()*5))+5);
                lostFrame = frameCount;
            }*/
        }
        obs[i]-=3.8;
        if(obs[i]<0){
            obs.splice(i,1);
        }
    }
    if(Math.random()<0.01){
        pwrs[pwrs.length]={type:Math.round(Math.random()*2),x:width,y:Math.random()*height/2};
    }
    textAlign(CENTER,CENTER);
    textSize(25);
    for(var i = 0; i<pwrs.length;i++){
        pwrs[i].x-=3.8;
        //ellipse(pwrs[i].x,ly-pwrs[i].y,20,20);
        switch (pwrs[i].type){
            case 0: text("G",pwrs[i].x,height/2-pwrs[i].y);break;
            case 1: text("P",pwrs[i].x,height/2-pwrs[i].y);break;
            case 2: text("3",pwrs[i].x,height/2-pwrs[i].y);break;
        }
        /*if(pwrs[i].x<0){
            pwrs.splice(i,1);
        }else if(dist(width/2,height/2-y,pwrs[i].x,height/2-pwrs[i].y)<35){
            switch (pwrs[i].type){
                case 0: loGrav = 500;break;
                case 1: pwrJmp = 500;break;
                case 2: triJmp = 500;break;
            }
            for(var k = 0;k<6;k++){
                var ang = Math.random()*TWO_PI;
                prts[prts.length] = {s:{x:pwrs[i].x,y:height/2-pwrs[i].y},v:{x:sin(ang)*5,y:cos(ang)*5}};
            }
            pwrs.splice(i,1);
        }*/
    }
    for(var u =0;u<prts.length;u++){
        prts[u].v.y+=0.04;
        if(prts[u].s.x<=0||prts[u].s.x>=width){
            prts[u].v.x=-prts[u].v.x;
        }
        prts[u].s.x+=prts[u].v.x;
        prts[u].s.y+=prts[u].v.y;
        ellipse(prts[u].s.x,prts[u].s.y,5,5);
        if(prts[u].s.y>height){
            prts.splice(u,1);
        }
    }
    textAlign(RIGHT,TOP);
    textSize(40);
    if(loGrav>0){
        loGrav--;
        grav=0.4;
        text("Low gravity",width,40);
    }else{
        grav=0.5;
    }
    if(pwrJmp>0){
        pwrJmp--;
        pwr=17;
        text("Power jump",width,100);
    }else{
        pwr=13;
    }
    if(triJmp>0){
        triJmp--;
        jmpLim=3;
        text("Triple jump",width,160);
    }else{
        jmpLim=2;
    }

    if(playSound) {
        if(!snd.isPlaying()) {
            snd.jump(4);
        }
        //var rt = map(y, 0, 1000, 1, 1.15);
        //snd.rate(rt);
    }
}

var loGrav=0, pwrJmp=0, triJmp=0;
var grav = 0.5, pwr = 13, jmpLim = 2;

function mousePressed(){
    if(lost){
        if(frameCount>lostFrame+60) {
            if(playSound){
                window.location.href = "?";
            }else{
                window.location.href = "?sound=false";
            }
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

function addPlayer(key){
    var alreadyAdded = false;
    for(var p=0;p<players.length;p++) {
        if(players[p].jumpKey==key){
            alreadyAdded=true;
        }
    }
    if(!alreadyAdded){
        console.info("new player on "+ key);
        players[players.length] = {jumpKey:key, y:0, v:0, j:0, f:0, is:[]};
        for(var i = 0 ; i < icount;i++){
            players[players.length-1].is[i]={y:0,rot:0};
        }
    }

}

function keyPressed(){
    if(frameCount<250){
        addPlayer(key)
    }else{
        for(var p=0;p<players.length;p++) {
            if(key==players[p].jumpKey){
                if(players[p].j<jmpLim){
                    if(players[p].j>0){
                        players[p].f=1;
                    }
                    players[p].v=pwr;
                    players[p].j++;
                }
            }
        }
    }
    if(key == 'M'){
        playSound = ! playSound;
        if(playSound){
            snd.play();
        }else{
            snd.pause();
        }
    }else{
        //mousePressed();
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

setup();
