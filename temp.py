from PIL import Image
from PIL.ExifTags import TAGS


def extract_exif(image_path):
    image = Image.open(image_path)
    exif_data = image._getexif()

    if exif_data:
        for tag, value in exif_data.items():
            tag_name = TAGS.get(tag, tag)
            if tag_name == "Software":
                return value

    else:
        return "NO_METADATA"

    return "NO_SOFTWARE"


# Example usage
# print('For Original Image test2.jpg')
# print(extract_exif('test2.jpg'))

# print('-------------------------------------------------------------')

# print('For Edited Image test1.jpg')
# print(extract_exif('test1.jpg'))


import cv2
import numpy as np
import matplotlib.pyplot as plt

def analyze_noise(image_path):
    img = cv2.imread(image_path, 0)
    
    laplacian = cv2.Laplacian(img, cv2.CV_64F)
    
    plt.figure(figsize=(6,6))
    plt.imshow(laplacian, cmap='gray')
    plt.title('Noise and Sharpness Analysis')
    plt.show()

analyze_noise('test1.jpg')