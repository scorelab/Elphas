import object_detect
import os

def get_count(img_path):
    return object_detect.get_single_count(image_path)


PATH_TO_TEST_IMAGES_DIR = 'test_images'
image_path = os.path.join(PATH_TO_TEST_IMAGES_DIR, 'image1.jpg')
print(object_detect.get_single_count(image_path))
