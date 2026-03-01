import os
import shutil

src_dir = r"C:\Users\shwet\OneDrive\Desktop\aditi protfolio"
base_dest = r"C:\Users\shwet\OneDrive\Desktop\portfolio\assets"

img_dest = os.path.join(base_dest, "images")
vid_dest = os.path.join(base_dest, "videos")

os.makedirs(img_dest, exist_ok=True)
os.makedirs(vid_dest, exist_ok=True)

for file in os.listdir(src_dir):
    src_file = os.path.join(src_dir, file)
    if os.path.isfile(src_file):
        if file.lower().endswith('.mp4'):
            dest_file = os.path.join(vid_dest, file)
            print(f"Copying video: {file}")
            shutil.copy2(src_file, dest_file)
        elif file.lower().endswith(('.jpg', '.jpeg', '.png')):
            dest_file = os.path.join(img_dest, file)
            print(f"Copying image: {file}")
            shutil.copy2(src_file, dest_file)

print("Copy completed.")
