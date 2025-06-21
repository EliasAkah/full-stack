export default function TailwindLabel({invalid, type, label, ...props}){

    const label_color = invalid ? '#f87171' : '#6b7280'; 
    const input_backgroundColor = invalid ? '#f87171' : '#7d8ca5';
    const input_borderColor = invalid ? '#f73f3f' : 'transparent';
    const input_Color = invalid ? '#f87171' : '#374151';

    return  (
        <p >
            <label 
                className = 'block mb-[0.5rem] text-xs font-bold tracking-widest uppercase'
                style = {{color: label_color}}
            >
                {label}
            </label>
            <input
                className = 'mb-[0.7rem] w-full py-[0.75rem] px-[1rem] text-1.5 border-x outline-solid rounded-sm shadow-[0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.06)]'
                style = {
                    {
                        backgroundColor: input_backgroundColor,
                        color: input_Color,
                        borderColor: input_borderColor,
                    }
                }
                type={type}
                {...props}
            />
        </p>
    )
}