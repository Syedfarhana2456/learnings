class Animal{
    public void sound(){
        System.out.println("Some Generic Animal sound");
    }
}
class Cat extends Animal{
    public void sound(){
        System.out.println("The cat Meows");
    }
}
public class Polymorphism {
 public static void main(String[] args) {
    Animal myanimal=new Cat();
    myanimal.sound();
 }   
}
