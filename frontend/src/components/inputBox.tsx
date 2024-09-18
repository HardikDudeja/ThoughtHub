import { ChangeEvent } from "react";

interface inputBoxType {
    label: string;
    placeHolder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

function InputBox({label, placeHolder, onChange, type = "text"}: inputBoxType) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeHolder} required />
        </div>
    )
}

export default InputBox;