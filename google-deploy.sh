npm run build
# Add the hosting to the index.html
sed -i "s/\(=\"\/\)/=\"https:\/\/storage.googleapis.com\/cidc-js-build\//gi" build/index.html
# Remove the hashes from all of the files.
for x in $(find "$PWD/build" | grep -o '[^\/]*\/[^\/]*\/[^\/]*\/main.*'); do
    sed -i "s/\(main\.[0-9a-Z]*\)/main/gi" "$x";
    mv $x $(echo "$x" | sed -e "/main/s|\(\.[0-9a-Z]*\)||");
done
sed -i "s/\(main\.[0-9a-Z]*\)/main/gi" build/static/js/main.js.map
sed -i "s/\(main\.[0-9a-Z]*\)/main/gi" build/static/css/main.css.map
# Copy the files to the bucket. Important, the Cache-Control option makes it so google doesn't try to serve
# Cached versions of the object and actually serves the new app bundle.
gsutil -h Cache-Control:private cp -r build/* gs://cidc-js-build