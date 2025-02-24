abstract class Vehicle{
    abstract void start();
}
class Car extends Vehicle{
    public void start(){
        System.out.println("car Starts with ignition");
    }
}
public class Abstraction {
 public static void main(String[] args) {
    Vehicle mycar=new Car();
    mycar.start();
 }   
}
