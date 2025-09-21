import React, { useEffect, useState } from 'react'
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompanyTable = () => {
  // ✅ Fix: Proper destructuring
  const { companies = [], searchcompanybytext = "" } = useSelector(
    (store) => store.company || {}
  )
  const navigate = useNavigate()

  const [filtercompany, setFiltercompany] = useState(companies)

  useEffect(() => {
    const filtered =
      companies.length > 0
        ? companies.filter((company) => {
          if (!searchcompanybytext) return true
          return company?.name
            ?.toLowerCase()
            .includes(searchcompanybytext.toLowerCase())
        })
        : []

    setFiltercompany(filtered)
  }, [companies, searchcompanybytext])

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>

        {/* ✅ Table Header */}
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        {/* ✅ Table Body */}
        <TableBody>
          {filtercompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't registered any company
              </TableCell>
            </TableRow>
          ) : (
            filtercompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt?.split('T')[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default CompanyTable
