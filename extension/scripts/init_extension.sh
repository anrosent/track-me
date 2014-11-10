#!/usr/bin/env bash 
#
# Please run this EXACTLY ONCE before you first install the plugin!
# Do not run again, even if you reload the plugin
#

# Generate random token for anonymous user event identification
if [ $1 == 'DEV' ];
then
    TOKEN="DEV";
else
    TOKEN="$(strings /dev/urandom | grep '[[:alnum:]]' -o | head -30 | tr -d '\n')";
fi

echo "Generated token: $TOKEN"

# Replace placeholder in injected content script with your generated token
sed -i "s/####/$TOKEN/g" content.js
