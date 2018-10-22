# Elphas
An Elephant Identification and Counting System.

## About
Elphas is currently used to count the number of elephants in an image or to classify an image based on the appearence of an elephant. Project was designed to facilitate the census of elephants in Sri Lanka. 

## Main Functionalities Available
1. An interface to upload a single image or a compressed file of several images (a task) to the server to process(count or classify).
2. An option to save a task(processing of an uploaded files) for later processing.
3. Callification of images
+ Two neural networks are available (Google's InceptionV3 and Microsoft's ResNet50)
* Retraining is available for Inception with a custom dataset and ResNet is used as an api from Keras.
4. Counting of elephants
* By Tensorflow's object detection api where the NN model can be again trained with a custom dataset.
5. Getting the count based on locations. (Images should be geo tagged)
6. Interface to see the results.
7. Reporting for misclassified or miscounted images.
8. User authentication based on google account or email account and updation of passwords if using an email account. 

## High Level Architecture

### Installation
To activate front-end, inside front-end
```
npm install
```
afterwards,
```
npm start
```

In the back-end you would find requirements.txt which includes all the required modules. To install those, in the back-end run
```
pip install -r requirements.txt
```
An Anaconda environment is preferred.

For Windows, as the server is written in app.py, run
```
set FLASK_APP=app.py
flask run
```
to start the server.

For linux or mac run
```
export FLASK_APP=app.py
flask run
```
to up and run the server. 


