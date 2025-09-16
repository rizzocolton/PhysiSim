#include<emscripten/bind.h>
#include<cmath>
#include<iostream>

struct SimState{
    double x;
    double y;
    double vx;
    double vy;
    double ax;
    double ay;
    double time;
    bool shouldContinue;
};

static SimState state;
static double gravity=-9.8;


void initializeSimulation(double x, double y, double vx, double vy, double g){
    gravity=g;
    state.x=x;
    state.y=y;
    state.vx=vx;
    state.vy=vy;
    state.ay=gravity;
    state.shouldContinue=true;
}

SimState stepSimulation(double dt){
    if(!state.shouldContinue) return state;

    //acceleration updates
    state.ax=0;
    state.ay=gravity;

    //velocity updates
    state.vx+=state.ax*dt;
    state.vy+=state.ay*dt;
    
    //position updates
    state.x+=state.vx*dt;
    state.y+=state.vy*dt;

    //check if object is through or touching floor
    if(state.y<=0){
        state.shouldContinue=false;
        state.y=0;
    }

    return state;
}

EMSCRIPTEN_BINDINGS(kinematics){
    emscripten::value_object<SimState>("SimState")
        .field("x", &SimState::x)
        .field("y", &SimState::y)
        .field("vx", &SimState::vx)
        .field("vy", &SimState::vy)
        .field("ax", &SimState::ax)
        .field("ay", &SimState::ay)
        .field("time", &SimState::time)
        .field("shouldContinue", &SimState::shouldContinue);
        
    emscripten::function("initializeSimulation", &initializeSimulation);
    emscripten::function("stepSimulation", &stepSimulation);
}
