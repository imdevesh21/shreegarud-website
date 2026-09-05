import "./Laptop3D.css";

// Pure CSS 3D laptop — no Three.js/WebGL dependency, so it costs almost
// nothing on Lighthouse (a few KB of CSS vs. hundreds of KB of a 3D engine).
// Built with transform-style: preserve-3d, tilts further on hover, and
// respects prefers-reduced-motion.
export default function Laptop3D() {
  return (
    <div className="laptop3d">
      <div className="laptop3d__scene">
        <div className="laptop3d__rig">
          <div className="laptop3d__screen">
            <div className="laptop3d__screen-bezel">
              <div className="laptop3d__screen-glow" />
              <div className="laptop3d__screen-ui">
                <span className="laptop3d__dot laptop3d__dot--coral" />
                <span className="laptop3d__dot laptop3d__dot--teal" />
                <span className="laptop3d__dot laptop3d__dot--violet" />
                <div className="laptop3d__bar" style={{ width: "70%" }} />
                <div className="laptop3d__bar" style={{ width: "45%" }} />
                <div className="laptop3d__bar" style={{ width: "58%" }} />
              </div>
            </div>
          </div>
          <div className="laptop3d__base">
            <div className="laptop3d__base-top" />
            <div className="laptop3d__base-front" />
          </div>
        </div>
      </div>
    </div>
  );
}
