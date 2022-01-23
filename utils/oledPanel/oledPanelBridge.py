import sys
import time
import json

import board
import busio
from digitalio import DigitalInOut, Direction, Pull
from PIL import Image, ImageDraw
import adafruit_ssd1306

# Create the I2C interface.
i2c = busio.I2C(board.SCL, board.SDA)
# Create the SSD1306 OLED class.
disp = adafruit_ssd1306.SSD1306_I2C(128, 64, i2c)

# Create blank image for drawing.
# Make sure to create image with mode '1' for 1-bit color.
width = disp.width
height = disp.height
image = Image.new("1", (width, height))

# Get drawing object to draw on image.
draw = ImageDraw.Draw(image)


appRunning = True
showDebug = True

def start():
    if showDebug:
      print("[BonnetController] Start Python<->LED Matrix Bridge")
    sys.stdout.flush()
    
    if showDebug:
      print("[BonnetController] Bridge Ready...")

#start process
if __name__ == '__main__':
  start()

  while appRunning:
    message = input()
    payload = ""
    try:
      payload = json.loads(message)
      key = payload["key"]
      

    except:

      print('[BonnetController] json parse error', message)
    else:

      sys.stdout.flush() 

      if key == "start":
        appRunning = True
        disp.fill(0)
        disp.show()

      if key == "clear":
        # Draw a black filled box to clear the image.
        draw.rectangle((0, 0, width, height), outline=0, fill=0) 
        disp.fill(0)   

      if key == "drawText":
        x = int(payload["x"])
        y = int(payload["y"])
        text = payload["text"]
        # color = int(payload["color"])
        disp.text(text, x, y, 1)


      if key == "drawLine":
          x1 = int(payload["x0"])
          y1 = int(payload["y0"])
          x2 = int(payload["x1"])
          y2 = int(payload["y1"])
          color = int(payload["color"])
          disp.line(x1,y1,x2,y2,color)

      if key == "setPixel":
          x = int(payload["x"])
          y = int(payload["y"])
          color = int(payload["color"])
          disp.pixel(x,y,color)


      if key == "render":
        appRunning = True
        disp.show()




        
