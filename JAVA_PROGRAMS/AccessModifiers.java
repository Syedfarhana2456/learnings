class Personn{
    private String Name;
    private int Age;
public Personn(String Name,int Age){
    this.Name=Name;
    this.Age=Age;
}
public void Display(){
    System.out.println(Name+Age);
}
}
public class AccessModifiers {
   public static void main(String[] args) {
    Personn p1=new Personn("farru",18);
    p1.Display();
   } 
}
