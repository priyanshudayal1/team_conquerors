import requests
import cv2
from PIL import Image
from PIL.ExifTags import TAGS
import numpy as np
from io import BytesIO

import cloudinary
import cloudinary.uploader
import cloudinary.api

# Configure Cloudinary
cloudinary.config(
  cloud_name='dm23rhuct',  # Replace with your Cloudinary cloud name
  api_key='972235453857764',        # Replace with your Cloudinary API key
  api_secret='ZssdWvtjhYTH3ULILEf_ZYVK5zc'   # Replace with your Cloudinary API secret
)


def extract_exif(image_path):
    image = Image.open(image_path)
    exif_data = image._getexif()

    if exif_data:
        for tag, value in exif_data.items():
            tag_name = TAGS.get(tag, tag)
            if tag_name == "Software":
                return f'Software Used: {value}'
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


def download_and_return_url(image_url: str):
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))

    img.save('temper.jpg')
    analyze_noise('temper.jpg')

    meta_res = extract_exif('temper.jpg')

    img = Image.open('detected_edit.jpg')

    img_bytes = BytesIO()
    img.save(img_bytes, format='JPEG')
    img_bytes.seek(0)

    response = cloudinary.uploader.upload(img_bytes, public_id=f'bosad_10th')
    file_url = response['secure_url']

    return meta_res,file_url


print(download_and_return_url('https://res.cloudinary.com/dm23rhuct/image/upload/v1725807345/piyushdayal108_10th.jpg'))