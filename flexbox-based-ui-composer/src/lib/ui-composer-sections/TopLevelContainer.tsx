export function TopLevelContainer({left,right}: {left: any, right: any}) {
    return (
        <div className="flex flex-row flex-nowrap" style={{width: `100%`, height: `100%`, fontFamily: '"Verdana", Geneva, sans-serif', color: `#333333`}}>
            <div>
                {left}
            </div>
            <div className="flex-1">
                {right}
            </div>
        </div>
    );
}