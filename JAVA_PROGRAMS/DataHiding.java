class Employeee{
    private int salary;
    public void setSalary(int salary){
        if(salary>0){
            this.salary=salary;
        }
        else
        {
            System.out.println("INVALID Salary");
        }
    }
    public int getSalary(){
        return salary;
    }
}
public class DataHiding {
 public static void main(String[] args) {
    Employeee emp=new Employeee();
    emp.setSalary(50000);
    System.out.println(emp.getSalary());
    emp.setSalary(-1000);
 }   
}
