/*ARRAY METHODS:
MAP:creates a new Array with the results of some operation.The value its call back returns are used to form new Array
arr.map(callbackfnx(value,index,array))
*/
let arr=[25,50,75,100];
let newarr=arr.map((val)=>{
    return val*val;
});
console.log(newarr);
//FILTER:creates a new array of elements that give true for a condition/filter
let num=[1,2,3,4,5,6,7,8];
let evennum=num.filter((val)=>{
    return val%2==0;
});
console.log(evennum);
//REDUCE:performs some operations and reduces the Array to a single value.It returns that single value
//Below program returns largest number
let array=[57,56,34,97,99,56];
const output=array.reduce((prev,curr)=>{
    return prev>curr?prev:curr;
});
console.log(output);
//below is the program of marks of students scored greater than 90
let marks=[56,67,98,96,94,34,45];
let toppers=marks.filter((val)=>{
    return val>90;
});
console.log(toppers);
//Take a Number n as input from user.create an array of numbers from 1 to n.
let n=prompt("Enter a number");
let ARR=[];
for(let i=1;i<=n;i++)
{
    ARR[i-1]=i;
}
console.log(ARR);
//use the reduce method to calculate sum of all numbers in the array
let sum=ARR.reduce((res,cur)=>{
    return res+cur;
});
console.log("Addition of Two numbers=",sum);
//use the reduce method to calculate product of all numbers int the Array
let fact=ARR.reduce((res,cur)=>{
     return res*cur;
})
console.log("multiplication of array values=",fact)