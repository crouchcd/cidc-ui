# Build project
npm run build
# Delete the contents of the static directory of the flask project and copy over the new build.
rm -rf ../cidc-portal/cidc_portal/static/* && cp -r ./build/* ../cidc-portal/cidc_portal/static
# Change the references in the jinja template to match the new build hash
sed -i "s/\(main.[0-9a-z]*.js\)/$(find "$PWD/build" | grep -o 'main.[0-9a-z]*.js$')/gi" ../cidc-portal/cidc_portal/main/templates/react.jinja2 
# Rebuild the portal docker image.
(cd ../cidc-portal; sh dockerbuild.sh)
# Upgrade the portal.
helm upgrade portal ../cidc-devops/kubernetes/helm/portal/ --set image.tag=dev --set imageSHA=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 10 | head -n 1)