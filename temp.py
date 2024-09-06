from PIL import Image
from PIL import ImageFilter

img = Image.open('test2.jpg')

img = img.filter(ImageFilter.BoxBlur(8))

img.save('test.jpg')