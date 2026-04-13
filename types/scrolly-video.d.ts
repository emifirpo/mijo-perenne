declare module "scrolly-video/dist/ScrollyVideo.cjs.jsx" {
  import { ComponentType } from "react";

  interface ScrollyVideoProps {
    src: string;
    sticky?: boolean;
    full?: boolean;
    cover?: boolean;
    trackScroll?: boolean;
    lockScroll?: boolean;
    transitionSpeed?: number;
    frameThreshold?: number;
    useWebCodecs?: boolean;
    videoPercentage?: number;
    debug?: boolean;
    onReady?: () => void;
    onChange?: () => void;
  }

  import { ForwardRefExoticComponent, RefAttributes } from "react";

  type ScrollyVideoRef = {
    setVideoPercentage: (pct: number, opts?: { jump?: boolean; transitionSpeed?: number }) => void;
  };

  const ScrollyVideoComponent: ForwardRefExoticComponent<ScrollyVideoProps & RefAttributes<ScrollyVideoRef>>;
  export default ScrollyVideoComponent;
}
