import java.util.*;
public class CountPNO {
    public static void main(String[] args){
        System.out.println("enter 1 to continue and 0 to stop");
        Scanner sc=new Scanner(System.in);
        int count=sc.nextInt();
        int positive=0,negative=0,zero=0;
        while(count==1)
        {
            System.out.println("enter the number");
            int num=sc.nextInt();
            if(num>0){
                positive++;
            }
            else if(num<0)
            {
              negative++;
            }
            else
            {
                zero++;
            }
            System.out.println("enter 1 to continue and 0 to stop");
             count= sc.nextInt();
        }
        System.out.println("positive numbers"+positive); 
        System.out.println("negative numbers"+negative);
        System.out.println("number of Zeros"+zero);
    }
    
}
