//ForEach loop in Arrays(only for Arrays)
//arr.forEach(callbackFunction)
//callbackfunction:Here it is a function to execute for each element in the array
// A callback is a funtion passed as an argument to another funtion
//arr.foreach is a Method
//Method:Function Associated with object then it is called as method
function abc(){
    console.log("welcome");
}
function newfunct(abc){
    return abc;
}
abc();
let stored=newfunct(abc);
console.log(stored);
//Examples of foreach loop
let arr=[1,2,3,4,5,6];
arr.forEach(function printval(val){
console.log(val);
});
arr.forEach((val)=>{
    console.log(val);
});
//Another Example
let states=["kurnool","Nandyal","guntur","vizag","vijayawada"];
states.forEach((val)=>{
    console.log(val.toUpperCase());
});
/*HIGHER ORDER FUNCTION/METHODS:These takes function as parameter or they return function as output like "foreach function" */
//For a given array of numbers,print the square of each value using the foreach loop
let numbers=[1,2,3,4];
numbers.forEach((val)=>{
    console.log(val**2);
});
//Another way(using Arrow function)
let numb=[23,34,45,56];
let calcsquare=(numb)=>{
    console.log(numb*numb);
};
numb.forEach(calcsquare);
