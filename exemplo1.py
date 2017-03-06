''' n1=input("digite um numero: ")
n2=input("digite um numero: ")
m=n1+n2

print(m)
if m<6:
    print("acertou!")
else:
    print("errou :(")*/

minutos = int(input("Quantos minutos você utilizou este mês:"))
if minutos < 200:
     preço = 0.20
else:
     if minutos < 400:
         preço = 0.18
     else:
         preço = 0.15
print("Você vai pagar este mês: R$%6.2f" % (minutos * preço))
'''
import calendar
import time

cal = calendar.month(2017, 3)
print ("Here is the calendar:")
print (cal)
print (time.time())
