#include "fakeArduino.hpp"
#include "fakeArduino.hpp"

void setup() {
    // initializing the serial communication with the provided baud rate
    Serial.begin(19200);
}

//continuous loop
void loop() {
    // read the value of the joystick
    uint16_t jsValue = analogRead(A2);

    // mapping the range of the joystick (considering 0V-5V range) into the range of the motor indicated in the image
    uint16_t motorPos = map(jsValue, 0, 1023, 818, 511);

    //added to guarantee roboustness
    motorPos = constrain(motorPos, 511, 818);

    // send the information about the motor position as required by the problem
    Serial.write((uint8_t)0x1E);
    Serial.write(lowByte(motorPos));
    Serial.write(highByte(motorPos));

    delay(100); //this is necessary to ensure that the delay is respected
}
