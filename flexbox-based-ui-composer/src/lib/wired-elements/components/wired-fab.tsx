import { ReactNode } from "react";

export function WiredFab({children}: {children?: ReactNode}) {
    return <wired-fab>
        {children}
    </wired-fab>;
}