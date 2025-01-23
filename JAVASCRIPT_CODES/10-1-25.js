//Write a program to print All EVEN numbers from 0 to 100
for(let i=1;i<=100;i++)
{
    if(i%2==0)
    {
        console.log(i);
    }
}
//write a program to create A game where you start with any randow game number.Ask the user to keep guessing the game number until the user enters the correct 
let gamenum=25;
let usernum=prompt("guess no");
while(usernum!=gamenum)
{
    usernum=prompt("you Answered wrong number.guess Again you can do it!");
}
console.log("congratulations");