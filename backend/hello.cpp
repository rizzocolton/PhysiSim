#include <iostream>
#include <emscripten/bind.h>

void sayHello(){
    printf("hello, world\n");
}

EMSCRIPTEN_BINDINGS(module){
    emscripten::function("sayHello",&sayHello);
}