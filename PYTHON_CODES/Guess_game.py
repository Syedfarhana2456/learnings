#creation of a random number guessing game with python.
import random
num=random.randint(1,10)
tries=0
while True:
     guess=int(input("Guess a Number Between 1-10:"))
     if(num==guess):
          tries+=1
          print(f"your guess is Right.you guessed the number in {tries} Tries")
          break
     elif(num<guess):
          print("go a little lower")
          tries+=1
     elif(num>guess):
          print("go a little higher")
          tries+=1
     else:
          tries+=1
          print("Sorry you are wrong")
     
     



