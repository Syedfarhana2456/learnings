//ARRAYS:COLLECTION OF ITEMS
let heroes=["ironman","hulk","thor","batman"];
let marks=[87,98,78,89,78,76];
let info=["farru",98,"Dhone"];
console.log(info);
console.log(info.length);//here length is a Property and it doesnot do Any work,it returns value
//Methods do some Work
console.log(typeof(info));//gives object
//ARRAY INDICES
//If we try to access the indice that is not present then it gives us "undefined"
//ARRAYS ARE MUTABLE
//LOOPING over an array
let names=["syed","farru","Annu"];
for(let i=0;i<names.length;i++)
{
    console.log(names[i]);
}
//LOOPING over Array using FOR OF loop
for(let name of names){
    console.log(name.toUpperCase());
}
//Write a program For a given Array with marks of students-->[88,56,78,95,76].Find the Average marks of Entire class
let studentmarks=[88,56,78,95,76];
let sum=0;
for(let mark of studentmarks){
    sum+=mark;
}
let avg=sum/studentmarks.length;
console.log(`The average marks of students is ${avg}`);
//For a given Array with prices of 5 items->[250,645,300,900,50] all items have an offer of 20% off on them.
// change the array to store the final price after applying offer
let items=[250,645,300,900,50];
for(let i=0;i<items.length;i++)
{
    let offer=items[i]/20;
    items[i]-=offer;
}
console.log(items);