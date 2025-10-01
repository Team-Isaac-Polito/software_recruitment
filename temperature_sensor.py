import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32
import random

# This node simulates a temperature sensor
# At a regular interval it publishes a temperature between 0 and 100°C 
class TemperatureSensor(Node):
    def __init__(self):
        super().__init__('temperature_publisher')
        self.publisher_ = self.create_publisher(Float32, '/temperature', 10)
        self.timer = self.create_timer(1.0, self.publish_temperature)

    def publish_temperature(self):
        msg = Float32()
        msg.data = random.uniform(0.0, 100.0)
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing temperature: %.2f' % msg.data)


def main(args=None):
    rclpy.init(args=args)

    sensor = TemperatureSensor()

    rclpy.spin(sensor)

    sensor.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
