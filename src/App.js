import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import IMGList from "./components/img";

function App() {
  const [renderedProgressBar, setrenderProgressBar] = useState([]);
  const sliderRef = useRef(null);
  const progressBarRef = useRef(null);

  const handleClickedHandle = (type) => {
    const sliderIndex = parseInt(
      getComputedStyle(sliderRef.current).getPropertyValue("--slider-index")
    );
    const bars = progressBarRef.current.children;
    const barsCounts = bars.length;

    bars[sliderIndex].classList.toggle("active");

    if (type === "left") {
      if (sliderIndex - 1 < 0) {
        sliderRef.current.style.setProperty("--slider-index", +barsCounts - 1);
        bars[barsCounts - 1].classList.toggle("active");
      } else {
        sliderRef.current.style.setProperty("--slider-index", +sliderIndex - 1);
        bars[sliderIndex - 1].classList.toggle("active");
      }
    }

    if (type === "right") {
      if (sliderIndex + 1 >= barsCounts) {
        sliderRef.current.style.setProperty("--slider-index", 0);
        bars[0].classList.toggle("active");
      } else {
        sliderRef.current.style.setProperty("--slider-index", +sliderIndex + 1);
        bars[sliderIndex + 1].classList.toggle("active");
      }
    }
  };

  const handleResize = () => {};

  function calculateProgressBar() {
    const currentSliderIndex = parseInt(
      getComputedStyle(sliderRef.current).getPropertyValue("--slider-index")
    );
    const itemCounts = sliderRef.current.children.length;
    const itemPerScreen = parseInt(
      getComputedStyle(sliderRef.current).getPropertyValue("--items-per-screen")
    );
    const progressBarItemCount = Math.ceil(itemCounts / itemPerScreen);

    let renderItems = new Array(progressBarItemCount)
      .fill("")
      .map((_, index) => (
        <div
          key={`bar-${index + 1}`}
          className={`progress-item ${
            currentSliderIndex === index ? "active" : ""
          }`}
        />
      ));

    setrenderProgressBar(renderItems);
  }

  useEffect(() => {
    document.addEventListener("resize", handleResize);

    calculateProgressBar();

    return () => {
      document.removeEventListener("resize", handleResize);
    };
  }, []);

  console.dir(renderedProgressBar);

  return (
    <div className="row">
      <div className="header">
        <h3 className="title">Title</h3>
        <div ref={progressBarRef} className="progress-bar">
          {renderedProgressBar.map((element) => element)}
        </div>
      </div>
      <div className="container">
        <button
          onClick={() => handleClickedHandle("left")}
          className="handle left-handle"
        ></button>
        <div className="slider" ref={sliderRef}>
          <IMGList />
        </div>
        <button
          className="handle right-handle"
          onClick={() => handleClickedHandle("right")}
        ></button>
      </div>
    </div>
  );
}

export default App;
