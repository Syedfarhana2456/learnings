//loops are used to Execute piece of code AGAIN and AGAIN
// FOR LOOP 
for(let i=1;i<=5;i++)
{
console.log("hello");
}
//calculate sum of 1 to 5
let sum=0;
for(let i=1;i<=5;i++)
{
  sum=sum+i;
}
console.log(sum);
//WHILE LOOP
let i=1;
while(i<=5)
{
  console.log("i=",i);
  i++;
}
//do-while loop
let j=1
do{
  console.log(j);
}while(j>=5);
//FOR-OF LOOP(used for Strings and Arrays)
let str="farhana";
for(let i of str){
  console.log("i=",i);
}
//calculation of length of string
let size=0;
let string="farhana";
for(let i of string){
  size++;
}
console.log("length=",size);
//FOR-IN LOOP(used for objects and Arrays)
let student={
  name:"syed farhana",
  age:18,
  cgpa:9.38,
  ispass:true,
};
for(let key in student){
  console.log("key=",key,"value=",student[key]);
}                   
