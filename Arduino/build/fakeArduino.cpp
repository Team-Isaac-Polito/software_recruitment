#include "fakeArduino.hpp"
#include <string.h>


int analogCounter = 0;
int analogValues[20] = {0, 0, 0, 100, 200, 250, 300, 512, 750, 1023, 1023, 1023, 1023, 750, 600, 500, 200, 100, 0, 0};
int pipeserial[2];

uint64_t testCurrent, testPrevious;


void* reader(void* arg) {
    uint8_t code;
    uint16_t data;

    while (1) {
        read(pipeserial[0], &code, 1);
        read(pipeserial[0], &data, 2);
        if (code != 0x1E) _exit(3);
        printf("Moving motor to position: %d\n", data);

        // Read any additional data
        char buffer[100];
        int bytesRead = read(pipeserial[0], buffer, sizeof(buffer) - 1);
        if (bytesRead > 3) {
            buffer[bytesRead] = '\0'; // Null-terminate the string
            printf("Received: %s\n", buffer);
        }
    }
}

int main() {
    setbuf(stdout, 0);
    testPrevious = 0;
    testCurrent = 0;
    setup();
    while (1) loop();
}

void delay(uint64_t ms) {
    uint64_t now = millis();
    while (millis() - now < ms);
}

uint64_t millis() {
    struct timespec time;
    clock_gettime(CLOCK_REALTIME, &time);
    return (uint64_t) (time.tv_sec) * 1000 + (time.tv_nsec/1000000);
}

uint64_t micros() {
    struct timespec time;
    clock_gettime(CLOCK_REALTIME, &time);
    return (uint64_t) (time.tv_sec) * 1000000 + (time.tv_nsec/1000);
}
void delayMicroseconds(uint64_t us) {
    uint64_t now = micros();
    while (micros() - now < us);
}

long map(long val, long fromLow, long fromHigh, long toLow, long toHigh) {
    return (val-fromLow)*(toHigh-toLow)/(fromHigh-fromLow) + toLow;
}

long abs(long val) {
    return val < 0 ? -val : val;
}

long constrain(long val, long min, long max) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}

long min(long a, long b) {
    return a > b ? b : a;
}
long max(long a, long b) {
    return a > b ? a : b;
}

uint16_t analogRead(uint8_t pin) {
    if (pin != A2) _exit(1);

    testPrevious = testCurrent;
    testCurrent = millis();

    if (testCurrent - testPrevious < 100) _exit(4);
    if (analogCounter >= 20) analogCounter = 0;
    return analogValues[analogCounter++];
}

void analogReference(uint8_t mode) {}

uint8_t lowByte(uint16_t w) {
    return (uint8_t) (w & 0xff);
}
uint8_t highByte(uint16_t w) {
    return (uint8_t) (w >> 8);
}

void FakeSerial::begin(uint64_t baudrate) {
    pthread_t tid;
    if (baudrate != 19200) _exit(2);
    pipe(pipeserial);
    pthread_create(&tid, NULL, reader, NULL);
}

size_t FakeSerial::write(uint8_t c) {
    return ::write(pipeserial[1], &c, 1);
}

size_t FakeSerial::write(uint8_t* c, size_t s ) {
    return ::write(pipeserial[1], c, s);
}

size_t FakeSerial::write(char* c, size_t s) {
    return ::write(pipeserial[1], c, s);
}

// Define constants for pin modes
#define INPUT 0
#define OUTPUT 1
#define INPUT_PULLUP 2

// Define constants for digital values
#define LOW 0
#define HIGH 1

// Array to store pin modes
uint8_t pinModes[20];

// Array to store digital pin values
uint8_t digitalValues[20];

// Function to set pin mode
void pinMode(uint8_t pin, uint8_t mode) {
    if (pin < 20) {
        pinModes[pin] = mode;
    }
}

// Function to write a digital value to a pin
void digitalWrite(uint8_t pin, uint8_t value) {
    if (pin < 20 && pinModes[pin] == OUTPUT) {
        digitalValues[pin] = value;
    }
}

// Function to read a digital value from a pin
int digitalRead(uint8_t pin) {
    if (pin < 20) {
        return digitalValues[pin];
    }
    return LOW;
}

// Function to print data to the serial monitor
void FakeSerial::print(const char* str) {
    write((uint8_t*)str, strlen(str));
}

void FakeSerial::println(const char* str) {
    print(str);
    write('\n');
}

// Overloaded functions for printing different data types
void FakeSerial::print(int val) {
    char buffer[10];
    sprintf(buffer, "%d", val);
    print(buffer);
}

void FakeSerial::println(int val) {
    print(val);
    write('\n');
}

void FakeSerial::print(long val) {
    char buffer[20];
    sprintf(buffer, "%ld", val);
    print(buffer);
}

void FakeSerial::println(long val) {
    print(val);
    write('\n');
}

void FakeSerial::print(double val) {
    char buffer[20];
    sprintf(buffer, "%f", val);
    print(buffer);
}

void FakeSerial::println(double val) {
    print(val);
    write('\n');
}


FakeSerial Serial;
