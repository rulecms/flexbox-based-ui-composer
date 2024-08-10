export function WiredFab({children, color = `white`}: {children?: any, color?: string}) {
    return <wired-fab style={{color}}>
        {children}
    </wired-fab>;
}