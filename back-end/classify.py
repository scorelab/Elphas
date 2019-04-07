from retraining import try_retrain, retrain
import resnet
import object_detect


def count(image_path):
    return object_detect.get_single_count(image_path)


def inception(image_path):
    preds = try_retrain.scan(image_path)

    if preds[0] == 'elephant':
        return 1
    else:
        return 0


def mobileNet(image_path):
    preds = try_retrain.scan(image_path)

    if preds[0] == 'elephant':
        return 1
    else:
        return 0


def resNet50(image_path):

    return resnet.resNetClassify(image_path)

    # if resnet.resNetClassify(image_path):
    #     return 1
    # else:
    #     return 0


def retrain_network():
    retrain.start_retrain()
