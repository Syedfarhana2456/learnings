class Helllo implements Runnable{
    public void run()
    {
        for(int i=0;i<3;i++)
        {
            System.out.println("child Thread");
        }
    }
}
public class RunnableInterface {
    public static void main(String[] args) {
        Helllo h=new Helllo();
        Thread t=new Thread(h);
        t.start();
        for(int i=0;i<3;i++)
        {
            System.out.println("Main Thread");
        }
    } 
}
