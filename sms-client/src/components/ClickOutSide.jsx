import { useEffect, useRef } from "react";

const ClickOutSide = ({ children, exceptionRef, onClick, className }) => {
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      let clickedInside = false;
      if (exceptionRef) {
        clickedInside =
          (wrapperRef.current && wrapperRef.current.contains(event.target)) ||
          (exceptionRef.current && exceptionRef.current == event.target) ||
          (exceptionRef.current && exceptionRef.current.contains(event.target));
      } else {
        clickedInside =
          wrapperRef.current && wrapperRef.current.contains(event.target);
      }
      if (!clickedInside) {
        onClick();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [exceptionRef, onClick]);
  return <div ref={wrapperRef}>{children}</div>;
};

export default ClickOutSide;
