all: compile

clean:
	rm -rf build/

# TMP_FILE := $(shell mktemp -t game)
compile:
	tsc --outFile build/game.js src/game.ts
	cp public/* build
	cd build && node ../../games-builder/build-game.js game.html

.PHONY: clean compile
.SILENT: