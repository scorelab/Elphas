import sys
import numpy as np
from PIL import Image
from keras.preprocessing import image
import tensorflow as tf
from keras.applications.resnet50 import ResNet50, preprocess_input, decode_predictions
target_size = (224, 224)

def load_model():
	global model
	model = ResNet50(weights="imagenet")
	global graph
	graph = tf.get_default_graph()

def predict(model, img, target_size, top_n=3):

    """Run model prediction on image
    Args:
        model: keras model
        img: PIL format image
        target_size: (w,h) tuple
        top_n: # of top predictions to return
        Returns:
            list of predicted labels and their probabilities
            """


    if img.size != target_size:
        img = img.resize(target_size)

    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)

    with graph.as_default():
        preds = model.predict(x)

    return decode_predictions(preds, top=top_n)[0]

def resNetClassify(image_path):
    if image_path is None:
        sys.exit(1)
    if image_path is not None:
        img = Image.open(image_path)

    load_model()

    for i in predict(model, img, target_size):
        if i[1] == "elephant":
            return True
    return False

# if __name__=="__main__":
#     resNetClassify("top_view_ele.jpg")





