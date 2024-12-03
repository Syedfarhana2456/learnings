//swapping using third variable
#include<stdio.h>
int main()
{
    int a,b,temp;
    printf("Enter the values of a and b\n");
    scanf("%d\t%d",&a,&b);
    temp=a;
    a=b;
    b=temp;
    printf("%d\n%d",a,b);
    return 0;
}
/*
//Swapping without using Third variable
#include<stdio.h>
int main()
{
    int a,b;
    printf("enter the values of a and b");
    scanf("%d%d",&a,&b);
    a=a+b;
    b=a-b;
    a=a-b;
    printf("%d\n%d",a,b);
    return 0;
}
*/
/*
//swapping without using operators
#include<stdio.h>
int main()
{
    int a,b;
    printf("enter the number");
    scanf("%d\n%d",&a,&b);
    a=a^b;
    b=a^b;
    a=a^b;
    printf("%d\n%d",a,b);
    return 0;
}
*/
/*
//swapping using pointers
#include<stdio.h>
int swap(int *,int *);
void main()
{
   int a=10,b=20;
   printf("a=%d,b=%d",a,b);
   swap(&a,&b);
   printf("The swapped a=%d,b=%d",a,b);
}
int swap(int *a,int *b)
{
 int c=*a;
    *a=*b;
    *b=c;
 }
 */

