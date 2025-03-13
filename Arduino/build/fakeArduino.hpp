#pragma once

#include <unistd.h>
#include <stdio.h>
#include <pthread.h>
#include <stdint.h>
#include "MotorArduino.h"

#define A0 14
#define A1 15
#define A2 16
#define A3 17
#define A4 18
#define A5 19
#define A6 20
#define A7 21

#define EXTERNAL 0
#define DEFAULT 1
#define INTERNAL 3

typedef uint8_t byte;
typedef uint16_t word;
typedef bool boolean;


class FakeSerial {
    public:
        void begin(uint64_t);
        size_t write(uint8_t*, size_t);
        size_t write(char*, size_t);
        size_t write(uint8_t);
};
extern FakeSerial Serial;

uint64_t millis();
void delay(uint64_t ms);
uint64_t micros();
void delayMicroseconds(uint64_t us);
long map(long val, long fromLow, long fromHigh, long toLow, long toHigh);
long abs(long val);
long constrain(long val, long min, long max);
long min(long a, long b);
long max(long a, long b);
uint16_t analogRead(uint8_t pin);
void analogReference(uint8_t mode);
uint8_t lowByte(uint16_t w);
uint8_t highByte(uint16_t w);

