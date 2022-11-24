import { ButtonHTMLAttributes, FC } from "react"

type ButtonProps = {
    theme?:"primary" | "secondary",
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({theme,className,...rest}) => {
    let themeClass;
    if(theme==="primary"){
        themeClass="bg-yellow-500 text-white"
    }else if(theme==="secondary"){
        themeClass="border-2 border-yellow-500 bg-white text-yello-500"
    }
    return <button
        className={themeClass + " " + className}
        {...rest}
    >
    </button>
}
export default Button