#include <stdio.h>

// Define the pin numbers
const int joyPin = A2; // Pin connected to the joystick

// Define the instruction code for moving the motor
const uint8_t MOVE_MOTOR = 0x1E;

void setup() {
    // Initialize serial communication at 19200 baud
    Serial.begin(19200);
}

void loop() {
    // Read the joystick position
    int joyPos = analogRead(joyPin);
    
    // Map the joystick position to the servo position
    int servoPos = map(joyPos, 0, 1023, 818, 511);

    // Debugging statement for mapping
    //printf("Joystick Position: %d -> Mapped Servo Position: %d\n", joyPos, servoPos);
    
    // Create a buffer to hold the data
    uint8_t buffer[3];
    buffer[0] = MOVE_MOTOR;
    buffer[1] = lowByte(servoPos);
    buffer[2] = highByte(servoPos);

    // Send the buffer in one go
    Serial.write(buffer, 3); // Without buffer, more than one Serial.write causes the loop to stop.

    // Print "Hello World!"
    //Serial.print("Hello World!");
    
    // Debugging statement to indicate loop iteration
    //printf("Loop iteration completed at time: %lu ms\n", millis());
    
    // Wait for 100 ms before the next loop
    delay(100);
}
