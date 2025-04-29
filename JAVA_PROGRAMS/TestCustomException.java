class InvalidAgeException extends Exception
{
    public InvalidAgeException(String str)
    {
      super(str);
    }
}
public class TestCustomException{
    static void validate(int age)throws InvalidAgeException{
        if(age<18)
        {
            throw new InvalidAgeException("Age is not Valid");
        }
        else{
            System.out.println("Welcome to Vote");
        }
    }
public static void main(String args[])
{
    try{
        validate(13);
    }
    catch(InvalidAgeException ex)
    {
        System.out.println("Caught Exception");
        System.out.println("Exception occured:"+ex);
    }
}
}