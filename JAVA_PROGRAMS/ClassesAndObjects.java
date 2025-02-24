class Person{
    String name;
    int age;
    void display(){
        System.out.println("Name:"+name);
        System.out.println("Age:"+age);
    }
}
public class ClassesAndObjects {

    public static void main(String[] args) {
        Person obj=new Person();
        obj.name="Farhana";
        obj.age=18;
        obj.display();

    }
}