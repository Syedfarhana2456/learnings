import java.util.Random;
import java.util.StringTokenizer;
public class program1{
    public static void main(String[] args) {
        if (args.length < 3) {
            System.out.println("Enter Customer Name, Account Number, and Branch as arguments.");
            return;
        }
        String customerName = args[0];
        String accountNumber = args[1];
        String branch = args[2];

        String welcomeMessage = "Welcome, " + customerName + "!";
        System.out.println(welcomeMessage);

        StringBuffer buffer = new StringBuffer();
        buffer.append("Account Number: ").append(accountNumber)
              .append(", Branch: ").append(branch);
        System.out.println(buffer.toString());

        System.out.println("Splitting Customer Name:");
        StringTokenizer tokenizer = new StringTokenizer(customerName);
        while (tokenizer.hasMoreTokens()) {
            System.out.println(tokenizer.nextToken());
        }

        Random random = new Random();
        int tokenId = random.nextInt(100000);
        System.out.println("Generated Token ID: " + tokenId);
    }
}
