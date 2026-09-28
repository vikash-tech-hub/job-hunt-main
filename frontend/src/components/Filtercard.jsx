import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobslice';
import { Filter, RotateCcw, MapPin, Briefcase, IndianRupee } from 'lucide-react';

const filterData = [
  {
    filterType: "Location",
    icon: MapPin,
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Remote"]
  },
  {
    filterType: "Industry",
    icon: Briefcase,
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Scientist", "DevOps"]
  },
  {
    filterType: "Salary",
    icon: IndianRupee,
    array: ["0-5 LPA", "6-12 LPA", "12-25 LPA", "25+ LPA"]
  },
];

const Filtercard = () => {
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelected(value);
  };

  const handleClear = () => {
    setSelected("");
    dispatch(setSearchedQuery(""));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selected));
  }, [selected, dispatch]);

  return (
    <div className="w-full bg-white p-5 rounded-2xl border border-slate-200 shadow-xs sticky top-24">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-indigo-600" />
          <h2 className="font-bold text-slate-800 text-base">Filter Jobs</h2>
        </div>
        {selected && (
          <Button 
            onClick={handleClear} 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </Button>
        )}
      </div>

      <RadioGroup value={selected} onValueChange={handleChange} className="space-y-5">
        {filterData.map((data, index) => {
          const Icon = data.icon;
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Icon className="h-3.5 w-3.5 text-indigo-500" />
                <span>{data.filterType}</span>
              </div>
              <div className="space-y-1.5 pl-1">
                {data.array.map((item, idx) => {
                  const itemId = `filter-${index}-${idx}`;
                  const isChecked = selected.toLowerCase() === item.toLowerCase();
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-center space-x-2.5 px-2 py-1.5 rounded-lg transition-colors cursor-pointer ${isChecked ? "bg-indigo-50/80 text-indigo-700 font-medium" : "hover:bg-slate-50 text-slate-600"}`}
                      onClick={() => handleChange(item)}
                    >
                      <RadioGroupItem value={item} id={itemId} className="text-indigo-600 border-slate-300" />
                      <Label htmlFor={itemId} className="text-xs cursor-pointer select-none">
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default Filtercard;

