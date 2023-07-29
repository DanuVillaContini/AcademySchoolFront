const AnimatedButton = () => {
  const { backgroundColor, color, transform, boxShadow } = useSpring({
    to: async (next) => {
      while (1) {
        await next({
          backgroundColor: "red",
          color: "white",
          transform: "scale(1.1)",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        });

        await next({
          backgroundColor: "white",
          color: "black",
          transform: "scale(1)",
          boxShadow: "none",
        });
      }
    },
    from: {
      backgroundColor: "white",
      color: "black",
      transform: "scale(1)",
      boxShadow: "none",
    },
    config: {
      tension: 200,
      friction: 10,
      duration: 500,
    },
  });

  return (
    <animated.button
      style={{
        backgroundColor,
        color,
        transform,
        boxShadow,
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Click me!
    </animated.button>
  );
};

export default AnimatedButton;