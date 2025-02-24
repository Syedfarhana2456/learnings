import java.util.*;
public class Queues {
    public static void main(String[] args) {
        Queue<String> tasks=new LinkedList<>();
        tasks.add("Task 1");
        tasks.add("Task 2");
        tasks.add("Task 3");
       System.out.println("QUEUE Before removing:"+tasks);
       tasks.poll();
       System.out.println("QUEUE After removing:"+tasks);
    }
}
