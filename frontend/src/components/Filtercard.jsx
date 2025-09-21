import { Radio } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobslice';
const filterData = [
  {
    filterType: "Location",
    array: ["Delhi Ncr", "Banglore", "Hyderabad", "pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend developer", "Backend developer", "FullStack developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1lakh", "1 lakh to 5 lakh"]
  },
]
const Filtercard = () => {
  const [selected,setSelector]=useState("")
  const dispatch=useDispatch()
  const handlechange=(value)=>{
    setSelector(value)
  }
  useEffect(()=>{
    dispatch(setSearchedQuery(selected))
  },[selected])
  return (
    <div className='w-full bg-whte p-3 rounded-md shadow-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selected} onValueChange={handlechange}>
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className='font-bold text-lg'>{data.filterType}</h1>
            {
              data.array.map((item,idx)=>{
                const itemid=`${index}-${idx}`
                return (
                  <div className='flex items-center space-x-2 my-2'>
                    <RadioGroupItem  value={item} id={itemid}/>
                    <Label htmlFor={itemid}>{item}</Label>
                  </div>
                )
              })
            }
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filtercard
