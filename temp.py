from PIL import Image
from PIL.ExifTags import TAGS

def extract_exif(image_path):
    image = Image.open(image_path)
    exif_data = image._getexif()
    if exif_data:
        for tag, value in exif_data.items():
            tag_name = TAGS.get(tag, tag)
            if tag_name == 'Software':
                return value
    else:
        print("No EXIF data found.")
    
    return "NO_SOFTWARE"

# Example usage
print('For Original Image test2.jpg')
print(extract_exif('test2.jpg'))

print('-------------------------------------------------------------')

print('For Edited Image test1.jpg')
print(extract_exif('test1.jpg'))
