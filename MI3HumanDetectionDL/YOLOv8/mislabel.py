# https://docs.ultralytics.com/python/
from ultralytics import YOLO
import cv2
import os
import time
from mispost import *

# Set up model and parameter
model = YOLO("yolov8s.pt")
class_dict = model.model.names
swapped_dict = {v: k for k, v in class_dict.items()}
class_list = list(swapped_dict.keys())[::-1]
scale_show = 100
# Read Video
video = cv2.VideoCapture('/users/pranavreddyg/desktop/7.mp4')

# Set up video writer
fourcc = cv2.VideoWriter_fourcc(*'mp4v')

filename = 'output_' + time.strftime("%Y%m%d_%H%M%S")+ '.mp4'
output_dir = 'results/'
if not os.path.exists(output_dir):
    os.makedirs(output_dir)
output_path = os.path.join(output_dir, filename)
fps = int(video.get(cv2.CAP_PROP_FPS))
width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

# Run Loop
while True:
    ret, frame = video.read()
    if ret:
        results = model.predict(frame)
        labeled_img = draw_box(frame, results[0], class_list)
        display_img = resize_image(labeled_img, scale_show)
        # Show Image
        cv2.imshow('Frame', display_img)

        # Save frame to video writer
        out.write(display_img)

        # Press Q on keyboard to exit
        if cv2.waitKey(25) & 0xFF == ord('q'): 
            break
    else:
        break

# When everything done, release
video.release()
out.release()
# Closes all the frames
cv2.destroyAllWindows()