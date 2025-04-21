class Hello extends Thread
{
    public void run()
    {
        for(int i=0;i<3;i++)
        {
            System.out.println("child Thread");
        }
    }
}
public class ThreadClass {
    public static void main(String[] args) {
        Hello h=new Hello();
        h.start();
        for(int i=0;i<3;i++)
        {
            System.out.println("Main Thread");
        }
    }
}
