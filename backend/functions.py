# Now deadline 9

# Tasks in hand :
# 1. Need to create OCR function
# 2. Photo shop / Edit detector
# 3. Aadhar basic API
# 4. File encrypt and decrypt function  
# 5. Need to design a database

#Importing Libraries
import pytesseract


#Supporting Functions
def text_from_image(image, engine_mode=3, whitelist=None, blacklist=None, lang='tam'):
    """
    Extracts text from an image using Tesseract OCR with specified limits.
    """
    try:
        path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe" 
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


# Main Functions
def ocr_docs():
    pass