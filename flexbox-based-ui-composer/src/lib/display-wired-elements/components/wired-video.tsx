// commented out, but this is how we can display it with an actual video:
// return <wired-video autoplay muted loop src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></wired-video>

import { useEffect } from 'react';


export function WiredVideo() {
    useEffect(() => {
        async function preventCrashOnClickOfVideoControlsWithoutSource() {
            // wait for render to complete
            await new Promise(resolve => setTimeout(resolve, 1));
            
            const controlsWithClickIssue = document.querySelector('.displayButtonContents wired-video.wired-rendered')?.shadowRoot?.querySelector('#controls');
            
            console.log(controlsWithClickIssue, 'ARE THE CONTROLS WITH CLICK ISSUE');
            
            if(controlsWithClickIssue) {
                controlsWithClickIssue.setAttribute('style', 'pointer-events: none');
            }
        };
        preventCrashOnClickOfVideoControlsWithoutSource();
    }, []);
  return <wired-video></wired-video>;
}
