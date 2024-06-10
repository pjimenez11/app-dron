interface Props {
    options: ComboboxProps[];
    value: string;
    onChange: (value: string) => void;

}

interface ComboboxProps {
    value: string;
    label: string;
} 

const Combobox = ({options, value, onChange}: Props) => {
    return (
        <div className="relative inline-block w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-white text-gray-900 hover:bg-blue-100 focus:bg-blue-200">
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </div>
      </div>
    );
}

export default Combobox;