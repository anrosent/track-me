pack: clean
	cp -r extension release
	zip -x */.* -r target/release release
	rm -rf release
	cd target && unzip release

clean:
	rm -rf target/*
