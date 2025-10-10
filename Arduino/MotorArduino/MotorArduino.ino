// DOGAN EGE BULTE SOLUTION FOR ISAAC
#define JOY_PIN        A2
#define BAUDRATE       19200
#define SAMPLE_MS      100


#define MOTOR_MIN      511
#define MOTOR_MAX      818


#define INSTR_GOAL_POS 0x01


static inline int clampInt(int v, int lo, int hi) {
  if (v < lo) return lo;
  if (v > hi) return hi;
  return v;
}


static inline uint16_t mapJoyToMotor(int joy) {
  long mapped = (long)(joy) * (MOTOR_MAX - MOTOR_MIN) / 1023L + MOTOR_MIN;
  return (uint16_t)clampInt((int)mapped, MOTOR_MIN, MOTOR_MAX);
}

static inline void sendGoalPosition(uint16_t pos) {
  Serial.write((uint8_t)INSTR_GOAL_POS);
  uint8_t lo = (uint8_t)(pos & 0xFF);
  uint8_t hi = (uint8_t)((pos >> 8) & 0xFF);
  Serial.write(lo);
  Serial.write(hi);
}

void setup() {
  Serial.begin(BAUDRATE);
  analogRead(JOY_PIN); 
}

void loop() {
  int joy = analogRead(JOY_PIN);          
  uint16_t goal = mapJoyToMotor(joy);     
  sendGoalPosition(goal);                
  delay(SAMPLE_MS);                       
}
