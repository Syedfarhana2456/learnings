import java.util.*;
public class switch_stmt{
    public static void main(String[] args){
    Scanner sc = new Scanner(System.in);
    System.out.println("Enter 1 for greetings in English,Enter 2 for greetings in Telugu Enter 3 for Greetings in French language");
    int button=sc.nextInt();
    switch(button)
    {
        case 1:
            System.out.println("Hello");
            break;
        case 2:
            System.out.println("namaste");
            break;
        case 3:
            System.out.println("bonjour");
            break;
        default:
            System.out.println("Invalid number");

    }
    }
}