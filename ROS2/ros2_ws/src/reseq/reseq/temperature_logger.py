import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32
from datetime import datetime


class TemperatureLogger(Node):
    def __init__(self, log_file):
        super().__init__('temperature_logger')
        self.subscription = self.create_subscription(
            Float32,
            'temperature',
            self.temperature_callback,
            10
        )
        self.log_file = log_file

        
        self.file = open(self.log_file, 'a')
        self.get_logger().info(f"Logging initialized, outputting to {self.log_file}")

    def temperature_callback(self, msg):
        temperature = msg.data
        if temperature >= 50.0:
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            log_message = f"{timestamp} - Temperature: {temperature:.2f}°C"

            # Log to console
            self.get_logger().warn(log_message)

            # Log to file
            self.file.write(log_message + '\n')
            self.file.flush()

    def destroy_node(self):
        # Ensure file is properly closed when the node is destroyed
        self.file.close()
        super().destroy_node()


def main(args=None):
    rclpy.init(args=args)

    logger = TemperatureLogger("log.txt")

    rclpy.spin(logger)

    logger.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
