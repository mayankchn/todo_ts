import { FC } from "react"
import {AiOutlineDelete} from "react-icons/ai"
import Button from "./Button"
type taskProps = {
    id: string,
    name: string,
    isChecked: boolean,
    handleCheck: (a: any, b: any) => any
    handleDelete: (a: string) => any
}

const Task: FC<taskProps> = ({ id, name, isChecked, handleCheck, handleDelete }) => {
    // console.log('props in task ',props);
    return <>
        <div className="flex gap-3">
            <input
                id={id}
                type="checkbox"
                checked={isChecked}
                onClick={(event) => handleCheck(event, id)}
            />
            <label htmlFor={id}>{name}</label>
            {isChecked && <Button
                onClick={() => handleDelete(id)}
                type="button">
                <AiOutlineDelete></AiOutlineDelete>
            </Button>}
        </div>
    </>
}
export default Task