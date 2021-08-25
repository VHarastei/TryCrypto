import React from 'react';

export const useFullscreenStatus = (elRef: React.RefObject<HTMLDivElement>) => {
  const [isFullscreen, setIsFullscreen] = React.useState(document.fullscreenElement != null);

  const setFullscreen = () => {
    if (elRef.current == null) return;
    elRef.current
      .requestFullscreen()
      .then(() => {
        setIsFullscreen(document.fullscreenElement != null);
      })
      .catch(() => {
        setIsFullscreen(false);
      });
  };

  React.useLayoutEffect(() => {
    document.onfullscreenchange = () => setIsFullscreen(document.fullscreenElement != null);
    return () => (document.onfullscreenchange = null) as unknown as undefined;
  });

  return { isFullscreen, setIsFullscreen: setFullscreen };
};
