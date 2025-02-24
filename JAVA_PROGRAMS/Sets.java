import java.util.HashSet;
public class Sets {
    public static void main(String[] args) {
        HashSet<String> Uniquenames=new HashSet<>();
        Uniquenames.add("alice");
        Uniquenames.add("bob");
        Uniquenames.add("alice");
        Uniquenames.add("alexa");
        Uniquenames.add("kernel");
        System.out.println("set:"+Uniquenames);

    }
}
