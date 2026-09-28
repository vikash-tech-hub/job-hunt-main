import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from '../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal, Building2, Calendar, Globe } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const CompanyTable = () => {
  const { companies = [], searchcompanybytext = "" } = useSelector(
    (store) => store.company || {}
  );
  const navigate = useNavigate();

  const [filtercompany, setFiltercompany] = useState(companies);

  useEffect(() => {
    const filtered =
      companies.length > 0
        ? companies.filter((company) => {
            if (!searchcompanybytext) return true;
            return company?.name
              ?.toLowerCase()
              .includes(searchcompanybytext.toLowerCase());
          })
        : [];

    setFiltercompany(filtered);
  }, [companies, searchcompanybytext]);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-100 hover:bg-transparent">
            <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400">Logo</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400">Company Name</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400">Date Registered</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filtercompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10 text-slate-400">
                <Building2 className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-600">No companies found.</p>
                <p className="text-xs text-slate-400 mt-0.5">Click &quot;Add New Company&quot; to get started.</p>
              </TableCell>
            </TableRow>
          ) : (
            filtercompany.map((company) => (
              <TableRow key={company._id} className="border-slate-100 hover:bg-slate-50/60 transition-colors">
                <TableCell>
                  <Avatar className="h-10 w-10 rounded-xl border border-slate-100 bg-slate-50">
                    <AvatarImage src={company.logo} alt={company.name} />
                    <AvatarFallback className="rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm">
                      {company.name?.charAt(0)?.toUpperCase() || "C"}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-semibold text-slate-900 text-sm">
                  {company.name}
                  {company.location && (
                    <span className="block text-xs text-slate-400 font-normal mt-0.5">
                      {company.location}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    {company.createdAt?.split('T')[0] || "N/A"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 rounded-lg">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-1 rounded-xl shadow-lg border-slate-200">
                      <button
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors text-left"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        <span>Edit Details</span>
                      </button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyTable;

