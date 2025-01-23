//Create a function using the "function" keyword that takes a string as an argument and returns the number of vowels in the string
function countvowels(str){
    let count=0;
    for(const char of str){
        if(char ==='a' || char==='e'|| char==='i'|| char==='o'|| char==='u' ||
            char ==='A' || char==='E'|| char==='I'|| char==='O'|| char==='U' 
        )
        count++;
    }
    console.log(count);
}
countvowels("farhana");
//Create An Arrow function to perform the same Task.
const countvow=(str)=>{
    let count=0;
    for(const char of str){
        if(char ==='a' || char==='e'|| char==='i'|| char==='o'|| char==='u' ||
            char ==='A' || char==='E'|| char==='I'|| char==='O'|| char==='U' 
        )
        count++;
    }
    console.log(count);
};
countvow("AEIOU");