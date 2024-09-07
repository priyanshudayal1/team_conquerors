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
    
    laplacian_abs = np.absolute(laplacian)
    
    laplacian_normalized = np.uint8(255 * laplacian_abs / np.max(laplacian_abs))
    
    threshold_value = 20
    _, high_sharpness_mask = cv2.threshold(laplacian_normalized, threshold_value, 255, cv2.THRESH_BINARY)
    
    img_color = cv2.imread(image_path)
    
    highlighted_img = img_color.copy()
    highlighted_img[high_sharpness_mask > 0] = [0, 0, 255]
    
    plt.figure(figsize=(12, 6))
    
    plt.subplot(1, 2, 1)
    plt.imshow(cv2.cvtColor(img_color, cv2.COLOR_BGR2RGB))
    plt.title('Original Image')
    
    plt.subplot(1, 2, 2)
    plt.imshow(cv2.cvtColor(highlighted_img, cv2.COLOR_BGR2RGB))
    plt.title('Possible Edited Region Highlighted')
    
    plt.show()

analyze_noise('test1.jpg')

