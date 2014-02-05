# Copy the images to the right locations fo the Chrome extension (as specified in manifest.json).
mkdir images
cp promotional_images/icon.png images/fa_icon_128.png

# Create the archive for uploading.
zip FormAlert.zip LICENSE css/* js/* options.html README.md images/* manifest.json

# Tidy up the images directory.
rm -rf images