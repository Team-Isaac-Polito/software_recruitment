#include "MotorArduino.h"
#include "fakeArduino.hpp"

int joyStickPin = A2; //JoyStick connected at pin A2
int joyStickMin = 0; //Min value for the analog pin
int joyStickMax = 0x3ff; //Max value for the analog pin 
int servoMax = 0x1ff; //Value that represents the high position (150°)
int servoMin = map(240, 150, 300, 0x1ff, 0x3ff); //Compute the value which represents the low position (240°)
// I use the map() functions to find the right mapping of 240° in the range (0x1ff, 0x3ff)


void setup() {
    Serial.begin(19200); //Baud rate set at 19200
}

void loop() {

    int joyStickValue = analogRead(joyStickPin); //Read the joystick analog value

    int motorPosition = map(joyStickValue, joyStickMin, joyStickMax, servoMin, servoMax);

    Serial.write(0x1E); //Sending the address of the instruction
    // motorPosition is an int on 2 Byte, the Serial.write() send 1 Byte -> I split the int in the 
    // LSByte and MSByte and then I call the Serial.write() on each Byte
    Serial.write(lowByte(motorPosition));  
    Serial.write(highByte(motorPosition)); 
    delay(100); 
}
