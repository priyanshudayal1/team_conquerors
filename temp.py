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
        return "NO_METADATA"
    
    return "NO_SOFTWARE"

# Example usage
# print('For Original Image test2.jpg')
# print(extract_exif('test2.jpg'))

# print('-------------------------------------------------------------')

# print('For Edited Image test1.jpg')
# print(extract_exif('test1.jpg'))


from PIL import Image, ImageChops, ImageEnhance

def ela_image(path, output_path):
    img = Image.open(path)
    img.save(output_path, 'JPEG', quality=90)
    
    img_compressed = Image.open(output_path)
    ela_image = ImageChops.difference(img, img_compressed)
    
    extrema = ela_image.getextrema()
    max_diff = max([ex[1] for ex in extrema])
    scale = 255.0 / max_diff
    ela_image = ImageEnhance.Brightness(ela_image).enhance(scale)
    
    ela_image.save('ela_output.png')
    ela_image.show()

ela_image('test1.jpg', 'compressed_image.jpg')
