export function WiredSpinner({duration}: {duration?: string}) {
    if(duration) {
        return <wired-spinner spinning duration={duration}></wired-spinner>
    }
    return <wired-spinner></wired-spinner>
}