//STRING:it is a sequence of characters used to represent text
//we can directly check the length of string in console like str.length
//**STRINGS ARE IMMUTABLE IN JAVASCRIPT
let str="farru";
console.log(str[0]);
/*TEMPLATE LITERALS IN JAVASCRIPT:
A way to have embedded Expressions in strings
*/
console.log(`This is a Template literal`);
/*STRING INTERPOLATION:
To create strings by doing substitution of placeholders
`stringtext ${expression} stringtext`
*/
let obj={
    item:"pen",
    price:10,
};
let output=`the cost of ${obj.item} is ${obj.price} rupees`;
console.log(output);
//another way of printing
console.log("The cost of", obj.item,"is",obj.price,"rupees");
//ESCAPE CHARACTERS
console.log("syed \n farhana");
//STRING METHODS:These are built-in functions to manipulate a string
let string="  syed Farhana  ";
console.log(string.trim());//Removes the spaces in the beginning and Ending
let newstring=string.toUpperCase();
let newstring2=string.toLowerCase();
console.log("uppercase=",newstring);
console.log("lowercase=",newstring2);
let num="012345678";
console.log(m=num.slice(1,5));//second argument is non inclusive
let str1="syed";
let str2=" farhana";
let res=str1.concat(str2);
console.log(res);
let city="kornool"
console.log(city.replace("o","u"));
//Using replace we can able to replace the character only at the starting position and using replace all we can replace that character at all places
let all="hellololo";
console.log(all.replaceAll("lo","p"));
console.log(all.charAt(1));
//The below we reclared the value
let newone="I love js";
newone=newone.replace("I","S");
console.log(newone);
//Program in which user to enter their full name.generate username for them based on the input.
// start username with @,follwedby their full name and ending with the fullname length
let fullname=prompt("Enter your name");
let username="@"+fullname+fullname.length;
console.log(username);