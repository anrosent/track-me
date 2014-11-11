#!/usr/bin/env bash 
# Don't have to run this, you can if you want to set your token to DEV, thereby 
# letting us know that this data should be ignored

# Replace placeholder in injected content script with your generated token
sed -i "s/generateToken.*;/'DEV';/g" background.js
