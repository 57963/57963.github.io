

function Network(sizes) {
    this.sizes = sizes;
    this.biases = [];
    this.weights = [];
    for(var i=1;i<this.sizes.length;i++){
        this.biases[i-1] = randArray(this.sizes[i]);
        this.weights[i-1] = randArray(this.sizes[i],this.sizes[i-1]);
    }


    this.feedforward= function(a){
        for(var l = 0; l<this.sizes.length-1;l++){
            var prevA = a.clone();
            var a;
            for(var i =0; i< prevA.length;i++){
                a[i]=sigmoid(dot(this.weights[l][i],prevA)+this.biases[l][i])
            }
        }
        return a;
    }
}

function randArray(len){
    r = [];
    for(var i=0;i<len;i++){
        r[i] = Math.random();
    }
    return r;
}

function randArray(y,x){
    r = [];
    for(var i=0;i<y;i++){
        r[i] = randArray(x);
    }
    return r;
}

function sigmoid(z){
    return (1.0/(1.0+Math.exp(-z)));
}

function dot(a,b){
    var dot;
    for(var i = 0; i<a.length;i++){
        dot+=a[i]*b[i];
    }
}