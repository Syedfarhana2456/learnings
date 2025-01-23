//js Variables are containers for Data
//var:variable can be redeclared and updated.A global scope Variable
//let:variable cannot be redeclared but can be uodated.A block scope variable
//const:variable cannot be redeclared or updated.A block scope variable
var name="syed farhana";
var name="farhana";
console.log(name);
let age=18;
age=19;
console.log(age);
const PI=3.14159265358979;
console.log(PI);
//Primitive Data Types:Number,string,Boolean,undefined,Null,Bigint,Symbol
console.log(typeof(age));
console.log(typeof(name));
console.log(typeof(true));
let x=BigInt("333333333333");
console.log(typeof(x));
let y=Symbol("hello");
console.log(typeof(y));
//Non-primitive Data Types:Objects(Arrays,functions)(collection of values)
//In objects key value pairs are Stored
const student={// const is written so that we can able to update the values in the key
    name:"Farhana",
    age:18,
    cgpa:9.38,
    ispass:true,
};
console.log(student);//gives Total data
console.log(student["name"]);//gives the value(farhana) in the key(name)
student["age"]=student["age"]+1;//like this we can update the key values
console.log(student["age"]);



