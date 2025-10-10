import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

# Define the TemperatureLogger node


class TemperatureLogger(Node):
    def __init__(self, filename: str = "overheat.log"):
        super().__init__('temperature_logger')
        self._filename = Path(filename)
        self._fh = self._filename.open("a", buffering=1)  # line-buffered
        self._sub = self.create_subscription(Float32, 'temperature', self.callback, 10)
        self.get_logger().info(f"TemperatureLogger started → logging to {self._filename.resolve()} (threshold=50.0°C)")

    def callback(self, msg: Float32):
        temp = float(msg.data)
        if temp >= 50.0:
            ts = datetime.now().isoformat(timespec='seconds')
            line = f"{ts} | {temp:.2f}°C\n"
            # Console
            self.get_logger().warn(line.strip())
            # File
            self._fh.write(line)

    def destroy_node(self):
        try:
            if hasattr(self, "_fh") and self._fh:
                self._fh.close()
        finally:
            return super().destroy_node()

def main(args=None):
    rclpy.init(args=args)

    import sys
    filename = "overheat.log"

    if sys.argv and len(sys.argv) > 1 and not sys.argv[0].endswith("temperature_logger"):

        pass
    if len(sys.argv) >= 2:
        filename = sys.argv[-1]

    node = TemperatureLogger(filename=filename)
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    
    main()
