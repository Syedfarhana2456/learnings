//FUNCTIONS IN JS
//Block of code that performs a specific task,can be invoked(called) whenever Needed 
function greeting(msg){//parameter
console.log(msg);//Function parameters are local variables which have scope only upto block
}
greeting("hello guys");//Argument
//Funtion to calculate sum of two numbers
function sum(a,b){
    let s=a+b;
    return s;
}
let value=sum(6,4);
console.log(value);
//ARROW FUNCTIONS:It is a compact way of writing function(These used for small funtions)
const arrowsum=(a,b)=>{
    console.log(a+b);
};
arrowsum(7,4);
const arrowmulti=(a,b)=>{
    return a*b;
}
let sol=arrowmulti(5,2);
console.log(sol);
