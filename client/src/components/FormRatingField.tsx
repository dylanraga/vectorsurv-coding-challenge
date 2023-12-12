import { useCallback, useLayoutEffect, useRef, useState } from "react";

export function FormRatingField() {
  const [rating, setRating] = useState<number>(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [rect, setRect] = useState<DOMRect>();
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    setBbox();
  }, [ref]);

  const setBbox = () => {
    if (!ref.current) return;
    setRect(ref.current.getBoundingClientRect());
  };

  const getRatingFromMouseX = useCallback(
    (mouseX: number) => {
      if (!rect) return -1;
      const x = mouseX - rect?.left;
      const rating = Math.ceil((10 * x) / rect.width);
      return rating;
    },
    [rect],
  );

  const handleHover = (e: React.MouseEvent<HTMLParagraphElement>) => {
    setIsHovering(true);
    setHoveredRating(getRatingFromMouseX(e.clientX));
  };

  const handleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    setRating(getRatingFromMouseX(e.clientX));
    setIsHovering(false);
  };

  return (
    <div className="flex">
      <div className="relative cursor-pointer overflow-hidden">
        <p
          ref={ref}
          className="z-0 text-gray-500"
          onMouseMove={handleHover}
          onMouseEnter={() => {
            setBbox();
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
          onClick={handleClick}
        >
          ☆☆☆☆☆☆☆☆☆☆
        </p>
        <p
          className={`pointer-events-none absolute top-0 z-10 ${
            isHovering ? "text-yellow-600" : "text-yellow-400"
          }`}
          style={{
            transform:
              "translateX(-" +
              (10 - (isHovering ? hoveredRating : rating)) * 10 +
              "%)",
          }}
        >
          ★★★★★★★★★<span className="inline-block scale-125">★</span>
        </p>
      </div>
      <p className="ml-2 font-bold text-gray-300">{rating}</p>
      <input type="hidden" name="rating" value={rating} />
    </div>
  );
}
