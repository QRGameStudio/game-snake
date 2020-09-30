all: compile

clean:
	rm -rf dist/

compile:
	tsc --outFile dist/game.js src/main.ts
	cp public/* dist
	cd dist && node ../../util-games-builder/build-game.js  game.html && mv dist/* . && rm -r dist

.PHONY: clean compile
.SILENT:
