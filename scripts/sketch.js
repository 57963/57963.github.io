var c;
var s;

function setup(){
    s = $("#sketch");
    c=createCanvas(s.width(),s.height());
    c.parent("sketch");
    textSize(width/7);
    icount = Math.round(width/2/textWidth("I"));
    for(var i = 0 ; i < icount;i++){
        is[i]={y:0,rot:0};
    }
}

var is=[];
var icount;

function draw(){

    background(255);
    if(frameCount<200){
        textSize(width/5.5);
        title();
        o=0;
    } else{
        if(frameCount<250){
            textSize(width/map(frameCount,200,250,5.5,7));
        } else{
            textSize(width/7);
        }
        game();
    }

}
var o;
var y=0,v=0;
var j=0,f=0;
function game() {
    o-=13;
    v-=0.5;
    y+=v;
    if(y<=0){
        y=0;
        v=0;
        j=0;
    }
    textAlign(CENTER,CENTER);
    for(var i = 0; i<is.length;i++){
        push();
        translate(width/2-i*textWidth("I")+o,height/2-is[i].y);
        rotate(is[i].rot);
        text("I",0,0);
        pop();
    }
    if(-o>=textWidth("I")){
        o=0;
        for(var i = is.length-2;i>=0;i--){
            is[i+1]=is[i];
        }
        is[0]={y:y,rot:0};
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
    if(j<2){
        if(j==1){
            f=1;
        }
        v+=10;
        j++;
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