from rembg import remove
from PIL import Image

input_path = '/Users/kentaroaso/Downloads/rembg_in.jpeg'
output_path = '/Users/kentaroaso/Downloads/rembg_output.png'
input = Image.open(input_path)
output = remove(input)
output.save(output_path)
