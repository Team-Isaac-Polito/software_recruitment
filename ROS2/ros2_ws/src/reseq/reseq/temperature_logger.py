import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

class TemperatureLogger(Node):
    def __init__(self, log_file):
        super().__init__('temperature_logger')
        # Create a subscription to the '/temperature' topic
        self.subscription = self.create_subscription(Float32,'/temperature',self.callback,10)
        self.subscription  # prevent unused variable warning

        self.log_file = log_file

    def callback(self, msg: Float32):
        temperature = msg.data
        if temperature > 50.0:
            self.get_logger().info(f'High temperature detected: {temperature}°C')
            # Log to the file
            with open(self.log_file, 'a') as file:
                file.write(f'{temperature}\n')


def main(args=None):
    rclpy.init(args=args)

    logger = TemperatureLogger("log.txt")

    rclpy.spin(logger)

    logger.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
