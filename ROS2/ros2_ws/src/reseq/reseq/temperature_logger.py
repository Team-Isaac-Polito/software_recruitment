import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

# Define the TemperatureLogger node

class TemperatureLogger(Node):
    
    def __init__(self, log_file_path):
        super().__init__('temperature_logger')
        
        # store the file path
        self.log_file_path = log_file_path
        
        # initialize the log file with header
        try:
            file = open(self.log_file_path, 'w')
            file.write("Temperature(°C)\n")
            file.close()
        except Exception as e:
            self.get_logger().error('Failed to create log file: ' + str(e))
        
        # create subscriber for temperature topic
        self.subscription = self.create_subscription(
            Float32,
            'temperature',
            self.temperature_callback,
            10
        )
        
        self.get_logger().info('TemperatureLogger initialized. Logging to: ' + self.log_file_path)
    
    def temperature_callback(self, msg):
        # get temperature from message
        temperature = msg.data
        
        # log to console with 2 decimal places
        self.get_logger().info('Temperature: {:.2f}°C'.format(temperature))
        
        # write temperature to file
        try:
            file = open(self.log_file_path, 'a')
            file.write('{:.2f}\n'.format(temperature))
            file.close()
        except Exception as e:
            self.get_logger().error('Failed to write to log file: ' + str(e))



def main(args=None):
    rclpy.init(args=args)

    logger = TemperatureLogger("log.txt")

    rclpy.spin(logger)

    logger.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
