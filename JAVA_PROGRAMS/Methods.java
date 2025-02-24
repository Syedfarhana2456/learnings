class Calculator{
    int Add(int a,int b)
    {
        return a+b;
    }
    int Subtract(int a,int b)
    {
        return a-b;
    }
}
public class Methods {
 public static void main(String[] args) {
    Calculator calc=new Calculator();
    System.out.println(calc.Add(10,20));
    System.out.println(calc.Subtract(10,20));
 }   
}
