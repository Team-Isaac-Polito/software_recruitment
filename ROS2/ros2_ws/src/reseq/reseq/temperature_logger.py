import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

# Define the TemperatureLogger node
class TemperatureLogger(Node):
    def __init__(self, filename: str):
        super().__init__("temparature_logger")
        self.logfile = open(filename, "a")
        self.create_subscription(Float32, "temperature", self.callback, 10)
        

    def callback(self, temperature: Float32):
        if temperature.data > 50:
            self.get_logger().info(f"Temperature detected: {temperature.data:.2f}\n")
            self.logfile.write(f"{temperature.data:.2f}\n")
            self.logfile.flush()


def main(args=None):
    rclpy.init(args=args)

    logger = TemperatureLogger("log.txt")

    rclpy.spin(logger)

    logger.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
