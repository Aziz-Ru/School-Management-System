import React, { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  exceptionRef?: React.RefObject<HTMLElement>;
  onClick: () => void;
  className: string;
}

const ClickoutSide = ({
  children,
  exceptionRef,
  onClick,
  className,
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      let clickedInside: null | boolean = false;

      if (exceptionRef) {
        clickedInside =
          (wrapperRef.current &&
            wrapperRef.current.contains(event.target as Node)) ||
          (exceptionRef.current && exceptionRef.current == event.target) ||
          (exceptionRef.current &&
            exceptionRef.current.contains(event.target as Node));
      } else {
        clickedInside =
          wrapperRef.current &&
          wrapperRef.current.contains(event.target as Node);
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
  return (
    <div ref={wrapperRef} className="duration-500 transition ease-in-out">
      {children}
    </div>
  );
};

export default ClickoutSide;
