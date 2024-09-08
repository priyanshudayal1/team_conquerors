# Now deadline 9

# TASKS:
# 1. Blur Image. DONE
# 2. Photo shop / Edit detector. DONE
# 3. Aadhar basic API DONE
# 4. File encrypt and decrypt function  DONE
# 5. Need to design a database DONE Will require changes

#Importing Libraries
import pytesseract
from PIL import Image
from PIL.ExifTags import TAGS
import io
import cv2
import numpy as np
from cryptography.fernet import Fernet


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


def analyze_noise(image_path,output_image_path='detected_edit.jpg'):
    img = cv2.imread(image_path, 0)
    
    laplacian = cv2.Laplacian(img, cv2.CV_64F)
    
    laplacian_abs = np.absolute(laplacian)
    
    laplacian_normalized = np.uint8(255 * laplacian_abs / np.max(laplacian_abs))
    
    threshold_value = 20
    _, high_sharpness_mask = cv2.threshold(laplacian_normalized, threshold_value, 255, cv2.THRESH_BINARY)
    
    img_color = cv2.imread(image_path)
    
    highlighted_img = img_color.copy()
    highlighted_img[high_sharpness_mask > 0] = [0, 0, 255]
    
    cv2.imwrite(output_image_path, highlighted_img)


# Main Functions
def is_clear_image(image_path):
    """
    Checking if text is readable or not.
    """
    text = text_from_image(image_path)

    if len(text) > 20:
        return True
    return False


def edit_detector(image_path):
    """
    To Check if any Image is edited using Photoshop/Other tools.
    """


def aadhar_verifier(aadhar_number : str):
    aadhar_numbers = {
        '121212121212' : {
            'name' : 'Anubhav Choubey',
            'p_number': '9131853043',
            'aadhar_number': '121212121212',
            'address': 'Jabalpur 482005, Madhya Pradesh',
            'dob':'25-03-2005'
        },
        '212121212121' : {
            'name' : 'Rishita Parashar',
            'p_number': '9090909090',
            'aadhar_number': '212121212121',
            'address': 'Jabalpur 482001, Madhya Pradesh',
            'dob':'21-11-2004'
        }
    }

    if aadhar_number not in aadhar_numbers.keys():
        return "404" # 404 Response will be returned

    return aadhar_numbers[aadhar_number]


def encrypt_file(image_path : str):
    """
    Takes Image path and saves inplace image encrypted.
    """
    key = ""
    with open('encryption_key.key','rb') as key_file:
        key = key_file.read()

    cipher = Fernet(key)

    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()

    encrypted_image_data = cipher.encrypt(image_data)

    with open(image_path, 'wb') as encrypted_file:
        encrypted_file.write(encrypted_image_data)


def decrypt_file(image_path : str):
    with open('encryption_key.key', 'rb') as key_file:
        key = key_file.read()

    cipher = Fernet(key)

    with open(image_path, 'rb') as encrypted_file:
        encrypted_image_data = encrypted_file.read()

    decrypted_image_data = cipher.decrypt(encrypted_image_data)

    image_stream = io.BytesIO(decrypted_image_data)

    image = Image.open(image_stream)

    return image

if __name__ == '__main__':
    # For testing Blurred Image or Not:
    # print('Testing For "test.jpg"')
    # print('Yes Clear Image' if is_clear_image('test.jpg') else 'Not Clear Image')
    
    # print('-------------------------------------------------------------------------')

    # print('Testing For "test2.jpg"')
    # print('Yes Clear Image' if is_clear_image('test2.jpg') else 'Not Clear Image')

    # For testing Photoshop images or edited images
    analyze_noise('temper.jpg')
    print(extract_exif('test1.jpg'))

    # For Testing Aadhar API
    # aadhar_num = input('Enter Your Aadhar Number: ')
    # print('----------------------------------------------------')
    # otp = input('Enter OTP: ')
    # print('----------------------------------------------------')
    # details = aadhar_verifier(aadhar_num)
    # print(f"Name: {details['name']}")
    # print(f"Aadhar Number: {details['aadhar_number']}")
    # print(f"Phone Number: {details['p_number']}")
    # print(f"DOB : {details['dob']}")
    # print(f"Address: {details['address']}")
    
    # Test for Encrypt
    
    # encrypt_file('test_enc.jpg')

    # decrypt_file('test_enc.jpg')