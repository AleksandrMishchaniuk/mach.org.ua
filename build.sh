#!/bin/sh

npm install --no-package-lock

prod_env="production"
dev_env="local"

if [ $APP_ENV = $dev_env ]
then
    quasar dev -p 80
else
    quasar build
fi
