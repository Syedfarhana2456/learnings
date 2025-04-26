import java.util.Scanner;

public class Amstrong {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        
        int num = scanner.nextInt();
        int originalNum = num;
        int numOfDigits = String.valueOf(num).length();
        int sum = 0;
        while (num != 0) {
            int digit = num % 10; 
            sum += Math.pow(digit, numOfDigits); 
            num /= 10; 
        }
        if (sum == originalNum) {
            System.out.println(originalNum + " is an Armstrong number.");
        } else {
            System.out.println(originalNum + " is not an Armstrong number.");
        }
        scanner.close();
    }
}

