# Now deadline 9

# TASKS:
# 0. Blur Image. DONE
# 1. Need to create OCR function. DELAYED TILL FrontEND
# 2. Photo shop / Edit detector. WORKING
# 3. Aadhar basic API
# 4. File encrypt and decrypt function  
# 5. Need to design a database

#Importing Libraries
import pytesseract
from PIL import Image
from PIL.ExifTags import TAGS


#Supporting Functions
def text_from_image(image, engine_mode=3, whitelist=None, blacklist=None):
    """
    Extracts text from an image using Tesseract OCR with specified parameters.
    """
    try:
        path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe" 

        # After installing tesseract if error occurs uncomment below line ok?
        # path_to_tesseract = r"C:\Program Files\Tesseract-OCR (X86)\tesseract.exe" 

        pytesseract.pytesseract.tesseract_cmd = path_to_tesseract

        custom_config = f'--oem {engine_mode}'
        if whitelist:
            custom_config += f' -c tessedit_char_whitelist={whitelist}'
        if blacklist:
            custom_config += f' -c tessedit_char_blacklist={blacklist}'

        text = pytesseract.image_to_string(image, config=custom_config)

        return text
    except Exception as e:
        return f"Error: {str(e)}"
    
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
    plt.title('High Sharpness Regions Highlighted')
    
    plt.show()


# Main Functions
def is_clear_image(image_path):
    """
    Checking if text is readable or not.
    """
    text = text_from_image(image_path)

    # For testing purpose only remove on prod
    # print(text)

    if len(text) > 20:
        return True
    return False


def after_edit_detector(image_path):
    """
    To Check if any Image is edited using Photoshop/Other tools.
    """



if __name__ == '__main__':
    # For testing Blurred Image or Not:
    print('Testing For "test.jpg"')
    print('Yes Clear Image' if is_clear_image('test.jpg') else 'Not Clear Image')
    
    print('-------------------------------------------------------------------------')

    print('Testing For "test2.jpg"')
    print('Yes Clear Image' if is_clear_image('test2.jpg') else 'Not Clear Image')


    # For testing Photoshop images or edited images