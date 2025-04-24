import java.util.Random;
import java.util.StringTokenizer;

class ParcelDetails {
    String sender;
    String receiver;
    String address;
    int trackingCode;

    public ParcelDetails(String sender, String receiver, String address, int trackingCode) {
        this.sender = sender;
        this.receiver = receiver;
        this.address = address;
        this.trackingCode = trackingCode;
    }

    public void displayParcel() {
        System.out.println("Tracking Code: " + trackingCode);
        System.out.println("Sender: " + sender);
        System.out.println("Receiver: " + receiver);
        System.out.println("Address parts:");
        StringTokenizer tokenizer = new StringTokenizer(address, ",");
        while (tokenizer.hasMoreTokens()) {
            System.out.println(tokenizer.nextToken().trim());
        }
    }
}

public class Program3 {
    public static void main(String[] args) {
        if (args.length < 3) {
            System.out.println("Please provide Sender Name, Receiver Name, and Address.");
            return;
        }

        String sender = args[0];
        String receiver = args[1];
        String address = args[2];

        StringBuffer formattedAddress = new StringBuffer();
        formattedAddress.append(address);

        Random random = new Random();
        int trackingCode = 100000 + random.nextInt(900000);

        ParcelDetails[] parcels = new ParcelDetails[1];
        parcels[0] = new ParcelDetails(sender, receiver, formattedAddress.toString(), trackingCode);

        parcels[0].displayParcel();
    }
}