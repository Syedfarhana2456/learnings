//ARRAY METHODS
/* 1.push():add to end
2.pop():delete from end and return
tostring():converts array to string(here original array is not Affected)*/
let items=["mango","apple","banana"];
items.push("orange","guava");
console.log(items);
deleted=items.pop();
console.log("deleted",deleted);
console.log(items.toString());
console.log(items);
/* concat():joins multiple arrays and returns result
unshift():add to start
shift:delete from start and return */
let girls=["farhana","sameera"];
let boys=["sammad","sammer"];
let students=girls.concat(boys);
console.log(students);
students.unshift("muzkeer");
console.log(students);
let val=students.shift();
console.log("deleted starting name=",val)
//slice(startidx,endidx):returns the piece of the Array(Does not make change in original Array)
//slice method is also used to make copy of our real Array
//splice(startidx,delcount,newt):change original array(add,remove,replace)
let Alp=["A","B","C","D"];
console.log(Alp.slice(1,3));
let num=[1,2,3,4,5,6];
num.splice(2,2,101,102);
console.log(num);
//TO add element at specific position
num.splice(2,0,101);
//Delete Element
num.splice(3,1);
//Replace Element
num.splice(3,1,101);
let arr=[1,2,3,4,5,6];
arr.splice(4);//If we dont give any index in splice then no element is going to Delete
console.log(arr);
/* Create an array to store companies-->Bloomberg,Microsoft,uber,IBM,Netflix.
1.Remove the first company from the Array
2.Remove uber and Add ola in its place
3.Add Amazon at the End
*/
let companies=["Bloomberg","Microsoft","Uber","IBM","Netflix"];
companies.shift();
console.log(companies);
companies.splice(2,1,"ola");
console.log(companies);
companies.push("Amazon");
console.log(companies);