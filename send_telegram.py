# send_telegram.py
import sys
import telebot

# Telegram token
TOKEN = '6610697279:AAHEbBkXus6_GnHnPp1uzzG4RnfZIKL9aEM'
bot = telebot.TeleBot(TOKEN)

def send_message(message, token):
    tb = telebot.TeleBot(token)
    # tb.send_message(-4018855191, message) # 私发给群聊的
    tb.send_message(5602114690, message) # 私发给自己的

if __name__ == "__main__":
    message = sys.argv[1]
    send_message(message, TOKEN)
