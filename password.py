import random

passlen = int(input("パスワードの文字数を入力してください。 : "))
word_select = "1234567890-^¥qwertyuiop@[asdfghjkl;:]zxcvbnm,./_!#$%&'()=~|`{+*}<>?"
enter_password = "".join(random.sample(word_select, passlen))
print(enter_password)