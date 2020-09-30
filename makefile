all: compile

clean:
	rm -rf build/

compile:
	tsc --outFile build/game.js src/main.ts
	cp public/* build
	cd build && node ../../util-games-builder/build-game.js  game.html

.PHONY: clean compile
.SILENT:
