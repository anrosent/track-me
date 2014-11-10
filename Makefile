pack:
	cp -r extension release
	sed -i 's/var MY_TOKEN.*/var MY_TOKEN = "####";/g' release/content.js
	zip -r target/release release
	rm -rf release

clean:
	rm -rf target/*
