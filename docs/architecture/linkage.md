one c++ file with for each sim.
each function tagged with EMSCRIPTEN_BINDINGS to expose it to JavaScript.
when compiling, -lembind allows for binding support.
emsdk outputs .js and .wasm file.
These files are transferred to the public folder in the frontend.
React loads .js script from public
Module object created in script
Module has target functions attached.
