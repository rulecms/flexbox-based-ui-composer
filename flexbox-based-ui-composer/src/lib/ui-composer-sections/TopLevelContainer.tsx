import { ReactNode } from "react";
export function TopLevelContainer({left,right}: {left: ReactNode, right: ReactNode}) {
    return (
        <div className="flex flex-row" style={{width: `100%`, height: `100%`}}>
            <div>
                {left}
            </div>
            <div className="flex-1">
                {right}
            </div>
        </div>
    );
}