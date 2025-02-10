/* eslint-disable react/prop-types */
import {
  useScroll,
  useTransform,
  motion,
  frame,
  cancelFrame,
} from "framer-motion";
import "./App.css";
import { useRef, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

function App() {
  const lenisRef = useRef(null);
  useEffect(() => {
    function update(data) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  const container = useRef(null);
  const container2 = useRef(null);
  // value between 0 and 1
  const { scrollYProgress } = useScroll({
    target: container,
    // offset where starts tracking start of container and window
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: scroll2 } = useScroll({
    target: container2,
    // offset where starts tracking start of container and window
    offset: ["start start", "end end"],
  });
  console.log(scrollYProgress);

  return (
    <ReactLenis root ref={lenisRef} options={{ wheelMultiplier: 5 }}>
      <div ref={container} className="relative h-[200vh] bg-black">
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />
      </div>
      <div ref={container2} className="relative h-[200vh] bg-cyan-500">
        <Section1 scrollYProgress={scroll2} />
        <Section2 scrollYProgress={scroll2} />
      </div>
    </ReactLenis>
  );
}

export default App;

const Section1 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -2]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className="h-screen top-0 flex flex-col items-center justify-center bg-indigo-950 sticky"
    >
      <h2 className="text-3xl">Izzy</h2>
      <p>I am position sticky</p>
    </motion.section>
  );
};

const Section2 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-1, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className="h-screen relative flex flex-col items-center justify-center bg-amber-800"
    >
      <h2 className="text-3xl">Halili</h2>
      <p>I am position: relative</p>
    </motion.section>
  );
};
