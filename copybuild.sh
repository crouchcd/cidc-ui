# Build project
npm run build
(cd build; sh ../nginx/dockerbuild.sh)
# Upgrade the portal.
helm upgrade nginx ../cidc-devops/kubernetes/helm/nginx/ --set image.tag=dev --set imageSHA=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 10 | head -n 1) --tls