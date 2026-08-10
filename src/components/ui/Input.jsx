import React from 'react'

export default function Input({ type, placeholder, id, label, name = id, error, value, onChange }) {
    return (
        <div>
            <label className='text-white text-sm' htmlFor={id}>{label}</label>
            <input className="h-10 w-full
             rounded-md border
              border-[#1F2937] 
              bg-[#0B1220] pl-4 
              pr-16 text-sm text-white
               placeholder:text-gray-500 
               outline-none transition
                focus:border-violet-600"
                name={name}
                id={id}
                value={value}
                type={type}
                onChange={onChange}
                placeholder={placeholder} />
            <p className='text-red-600 text-sm mt-1'>{error}</p>
        </div>
    )
}
