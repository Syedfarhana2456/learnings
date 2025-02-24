class Animal{
    public void sound(){
        System.out.println("This is Generic Animal sound");
    }
}
class Dog extends Animal{
    public void sound(){
        System.out.println("The Dog Barks");
    }
}
public class Inheritance {
    public static void main(String[] args) {
        Dog mydog=new Dog();
        mydog.sound();
    }
}
