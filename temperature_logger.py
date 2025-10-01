import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

# Define the TemperatureLogger node

class TemperatureLogger(Node):
    def __init__(self, file):
        super().__init__('temperature_logger')
        self.file = file
        self.subscription = self.create_subscription(Float32, "/temperature", self.listener_callback, 10)

    def listener_callback(self, msg):
        with open(self.file, 'a') as f:
            if (msg.data > 50):
                f.write(f"{msg.data} \n")
                self.get_logger().info(f"Logged temperature: {msg.data}")


def main(args=None):
    rclpy.init(args=args)

    logger = TemperatureLogger("log.txt")

    rclpy.spin(logger)

    logger.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
