import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

# Define the TemperatureLogger node
class TemperatureLogger(Node):
    def __init__(self):
        super().__init__("temperature_logger")
        self.subscriber_ = self.create_subscription(Float32, '/temperature', self.callback, 10)

    def callback(self, temperature: Float32):
        if temperature.data > 50.0:
            self.get_logger().info(f"{temperature.data:.2f}°C")

def main(args=None):
    rclpy.init(args=args)

    logger = TemperatureLogger()

    rclpy.spin(logger)

    logger.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
