import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32
from datetime import datetime

class TemperatureLogger(Node):
    def __init__(self, filename):
        super().__init__('temperature_subscriber')
        self.subscription = self.create_subscription(Float32, '/temperature', self.listener_callback, 10)  
        self.filename = filename 
        self.subscription
    
    def listener_callback(self, temperature):
        if (temperature.data >= 50.00): 
            self.get_logger().info('I heard: %.2f' % temperature.data)
            actual_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S") #I use the package datatime to save the instant when temperature
            # reaches or exceeds 50
            self.write_fout("Date: {} Temperature (>= 50 °C): %.2f\n".format(actual_time) % temperature.data) #Writing the date and temperature on the log file 

    def write_fout(self, msg): #Method used to print on an output file (log.txt) the temperatures which reaches or 
        #exceeds 50
        with open(self.filename, 'a') as fout:
            fout.write(msg)


def main(args=None):
    rclpy.init(args=args)

    logger = TemperatureLogger("log.txt")

    rclpy.spin(logger)

    logger.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
