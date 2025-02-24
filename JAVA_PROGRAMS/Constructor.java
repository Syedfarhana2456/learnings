class Carr{
    String model;
    int year;
Carr(String model,int year){
    this.model=model;
    this.year=year;
}
void displayinfo(){
    System.out.println(model+year);
}
}


public class Constructor {
    public static void main(String[] args) {
        Carr mycar =new Carr("peeku",2020);
        mycar.displayinfo();
    }
}
