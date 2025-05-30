import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number
}

export function Spinner({ size = 24, className, ...props }: SpinnerProps) {
    return (
        <div
            className={cn("animate-spin", className)}
            {...props}
            style={{
                width: size,
                height: size,
                borderWidth: size / 8,
                borderColor: "currentColor",
                borderTopColor: "transparent",
                borderRadius: "9999px",
                ...props.style,
            }}
        />
    )
}
