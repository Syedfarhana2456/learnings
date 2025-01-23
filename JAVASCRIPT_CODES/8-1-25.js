/*operators in javascript
//Arithmetic operators:+,-,*,/
//unary operators:increment,decrement
//Assignment operators:=,+=,-=,*=,%=,**=
//comparisonal operators:==,!=,>,>=,<,<=
//logical operators:&&,||,!
*/
let a=10;
let b=5;
console.log("a+b=",a+b);
console.log("a-b=",a-b);
console.log("a*b=",a*b);
console.log("a/b=",a/b);
console.log("a++=",a++);
console.log("a!=b:",a!=b);
let c=5;
let d="5";
console.log("c===d:",c===d);
console.log("a&&b=",(a>5) && (b>2));
console.log("a||b=",(a<5) || (b>2));
//conditional statements
//IF-STATEMENT
let age=18;
if(age>=18){
    console.log("you can vote");
}
if(age<18){
    console.log("you cannot vote");
}
//IF-ELSE STATEMENT
let mode="dark";
let color;
if(mode==="dark"){
    color="black";
}
else{
    color="white";
}
console.log(color);
//ELSE-IF STATEMENT
let AGE=42;
if(AGE<18){
    console.log("junior");
}
else if(AGE>60){
console.log("senior");
}
//TERNARY OPERATOR
let num=19
console.log(num>18?"adult":"not Adult");
//Get user to input a number using prompt.check if number is multiple of 5 or not
let numb=prompt("Enter a number");
if(numb%5===0){
    console.log(numb,"is a multiple of 5");
}
else{
    console.log(numb,"is not a multiple of 5");
}
//Write a code which can give grades to students according to their scores
let score=prompt("Enter score");
if(score>90 && score<=100)
{
    console.log("A");
}
else if(score>=70 && score<=89){
    console.log("B");
}
else if(score>=60 && score<=69){
    console.log("C");
}

