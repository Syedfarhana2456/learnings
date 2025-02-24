class Studen{
    private String name;
    private int age;
   public Studen(String name,int age){
    this.name=name;
    setAge(age);
   }
   public void setAge(int age){
     if(age>0)
     {
        this.age=age;
     }
     else{
        System.out.println("Invalid age");
     }
   }
   public String getName(){
    return name;
   }
   public int getAge(){
    return age;
   }
   public void display(){
    System.out.println(name+" "+age);
   }
    }
public class Encapsulation {
    public static void main(String[] args ){
        Studen student=new Studen("jenny",20);
        student.display();
        student.setAge(-5);
        student.setAge(25);
        student.display();

    }
}
