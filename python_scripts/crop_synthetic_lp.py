import cv2
import numpy as np
import argparse
import os

def save_img(img_path, img):
    filepath, filename = os.path.split(img_path)
    output_folder = filepath + "/cropped_img"

    # create output folder if not exist
    if not os.path.isdir(output_folder):
        os.mkdir(output_folder)

    cv2.imwrite(output_folder + "/cropped_" + filename, img)

def read_and_crop(img_path: str) -> None:
    """
    Function to read, crop and save synthetic license plate image.

    Args:
        img_path(str): filepath to the image to crop
    """
    img = cv2.imread(img_path)
    edged = cv2.Canny(img, 30, 200) 

    # get index of edge to crop
    index = np.where(edged == 255)
    y = np.min(index[0])
    x = np.min(index[1])
    y_max = np.max(index[0])
    x_max = np.max(index[1])

    crop = img[y:y_max, x:x_max]

    # cv2.imshow("test", crop) # for Debug
    # cv2.waitKey(0)

    save_img(img_path, crop)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--file", "-f", required=True, help="Enter the filename or folder of the image")

    args = parser.parse_args()
    allowed_file_type = ["jpg", "jpeg", "png"]

    if os.path.isfile(args.file):
        read_and_crop(args.file)

    if os.path.isdir(args.file):
        # handle "/" at the end of path
        if args.file[-1] != "/":
            args.file = args.file + "/"

        for filename in os.listdir(args.file):
            if filename.split(".")[-1] in allowed_file_type:
                read_and_crop(args.file + filename)

    print("Done")