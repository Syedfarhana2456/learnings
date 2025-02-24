//custom Exception:user Defined Exception
class InvalidAgeException extends Exception{
    public InvalidAgeException(String message){
        super(message);
    }
}
public class CustomExceptions {
 public static void validateAge(int age) throws InvalidAgeException{
    if(age<0 || age>150){
        throw new InvalidAgeException("Age must be between 0 and 150");
    }
    System.out.println("valid age"+age);

 }
public static void main(String[] args){
    try{
        validateAge(200);
    }
    catch(InvalidAgeException e){
        System.out.println("Exception caught:"+e.getMessage());
    }
}
}
