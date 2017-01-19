var snow = [];

function draw(){
    if (!stopped) {
        if (Math.random() < 0.04) {
            snow[snow.length] = {x: Math.random() * width, a: Math.random() * 50, y: 0, mult: Math.random() * 0.06};
        }
        fill(0);
        background(100, 150, 100);
        if (frameCount < 200) {
            textSize(width / 5.5);
            title();
            o = 0;
        } else {
            if (!lost) {
                game();
            } else {
                fill(0);
                loseScreen();
                if (playSound) snd.rate(constrain(snd.playbackRate - 0.02, 0, 1));
            }
        }
        noStroke();
        fill(255);
        for (var i = 0; i < snow.length; i++) {
            var s = snow[i];
            ellipse(s.x + cos(s.y * s.mult) * s.a, s.y, 10, 10);
            s.y++;
            if (y > height) {
                snow.splice(i, 1);
            }
        }
    }
}

function game() {
    o-=4;
    v-=grav;
    y+=v;
    if(y<=0){
        y=0;
        v=0;
        j=0;
    }
    textAlign(LEFT,BOTTOM);
    var ly;
    fill(0);
    if(frameCount<250){
        ly = map(frameCount,200,250,height,height/2+30);
        textSize(40);
        text("You have "+icount+" i's on your boi.",10,map(frameCount,200,250,height+50,height-10));
        textAlign(RIGHT,TOP);
        textSize(30);
        text("Sound is "+(playSound?"on":"off")+", press M or top right to "+(!playSound?"un":"")+"mute.",width-10,map(frameCount,200,250,-50,10));
        textSize(map(frameCount,200,250,width/5.5,55));
    }else{
        ly = height/2+30;
        textSize(40);
        text("You have "+icount+" i's on your boi.",10,height-10);
        textAlign(RIGHT,TOP);
        textSize(30);
        text("Sound is "+(playSound?"on":"off")+", press M or top right to "+(!playSound?"un":"")+"mute.",width-10,10);
        textSize(55);
    }
    stroke(255,50,50);
    line(0,ly,width,ly);
    noStroke();
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
    textStyle(BOLD);
    textAlign(CENTER,CENTER);
    fill(0);
    for(var i = 0; i<is.length;i++){
        push();
        translate(width/2-i*textWidth("I")+o,(height/2)-is[i].y);
        rotate(is[i].rot);
        text("I",0,0);
        fill(255,50,50);
        triangle(-13,-10,-10,-30,7,-20);
        fill(255);
        ellipse(-10,-30,10,10);
        pop();
    }
    textStyle(NORMAL);
    if(Math.random()<icount*0.0001){
        obs[obs.length]=width;
    }
    for(var i = 0; i<obs.length;i++){
        fill(255,50,50);
        rect(obs[i],ly-60,20,60);
        if(obs[i]<width/2+10&&obs[i]>width/2-10){
            if (y < 90) {
                lost=true;
                $("#fbPage").css("display","inline");
                high = ((icount+Math.round(Math.random()*5))+5);
                lostFrame = frameCount;
            }
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
    fill(0);
    for(var i = 0; i<pwrs.length;i++){
        pwrs[i].x-=3.8;
        switch (pwrs[i].type){
            case 0: text("G",pwrs[i].x,height/2-pwrs[i].y);break;
            case 1: text("P",pwrs[i].x,height/2-pwrs[i].y);break;
            case 2: text("3",pwrs[i].x,height/2-pwrs[i].y);break;
        }
        if(pwrs[i].x<0){
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
        }

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
        var rt = map(y, 0, 1000, 1, 1.15);
        snd.rate(rt);
    }
}