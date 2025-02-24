import java.util.HashMap;
public class Maps {
    public static void main(String[] args) {
        HashMap<Integer,String> Uniquenames=new HashMap<>();
        Uniquenames.put(1,"alice");
        Uniquenames.put(2,"bob");
        Uniquenames.put(3,"alice");
        Uniquenames.put(4,"alexa");
        Uniquenames.put(5,"kernel");
        System.out.println("set:"+Uniquenames);

    }
}

