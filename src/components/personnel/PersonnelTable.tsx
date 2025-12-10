import { useState } from 'react';
import { Edit, Trash2, Eye, MoreHorizontal, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Personnel } from '@/types/hr';
import { mockDepartments } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface PersonnelTableProps {
  personnel: Personnel[];
  onEdit: (person: Personnel) => void;
  onDelete: (id: string) => void;
  onView: (person: Personnel) => void;
  sortField?: keyof Personnel | null;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: keyof Personnel) => void;
}

const categoryLabels: Record<string, string> = {
  specialist_doctor: 'Specialist Doctor',
  occupational_doctor: 'Occupational Doctor',
  pharmacist: 'Pharmacist',
  dentist: 'Dentist',
  paramedical: 'Paramedical',
};

const categoryColors: Record<string, string> = {
  specialist_doctor: 'bg-primary/10 text-primary border-primary/20',
  occupational_doctor: 'bg-accent/10 text-accent border-accent/20',
  pharmacist: 'bg-success/10 text-success border-success/20',
  dentist: 'bg-warning/10 text-warning border-warning/20',
  paramedical: 'bg-secondary text-secondary-foreground border-secondary',
};

export function PersonnelTable({ personnel, onEdit, onDelete, onView, sortField, sortDirection, onSort }: PersonnelTableProps) {
  const getDepartmentName = (id: string) => {
    return mockDepartments.find(d => d.id === id)?.name || 'Unknown';
  };

  const SortIcon = ({ field }: { field: keyof Personnel }) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return sortDirection === 'asc' ?
      <ArrowUp className="ml-2 h-4 w-4" /> :
      <ArrowDown className="ml-2 h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      {/* Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {personnel.map((person) => (
          <div key={person.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={person.imageUrl} alt={`${person.firstName} ${person.lastName}`} />
                  <AvatarFallback>{person.firstName[0]}{person.lastName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-card-foreground">{person.firstName} {person.lastName}</span>
                  <span className="text-sm text-muted-foreground">{person.specialty}</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onView(person)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(person)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(person.id)} className="text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Reference</span>
                <span className="font-mono">{person.reference}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Category</span>
                <Badge variant="outline" className={cn("w-fit mt-1", categoryColors[person.category])}>
                  {categoryLabels[person.category]}
                </Badge>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Department</span>
                <span>{getDepartmentName(person.departmentId)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Status</span>
                <Badge
                  variant="outline"
                  className={cn("w-fit mt-1",
                    person.status === 'active' && "bg-success/10 text-success border-success/20",
                    person.status === 'retired' && "bg-muted text-muted-foreground border-muted",
                    person.status === 'transferred' && "bg-accent/10 text-accent border-accent/20"
                  )}
                >
                  {person.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden rounded-xl border border-border bg-card shadow-card overflow-hidden animate-fade-in md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <button
                    onClick={() => onSort?.('firstName')}
                    className="flex items-center hover:text-foreground transition-colors"
                  >
                    Name
                    {onSort && <SortIcon field="firstName" />}
                  </button>
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <button
                    onClick={() => onSort?.('reference')}
                    className="flex items-center hover:text-foreground transition-colors"
                  >
                    Reference
                    {onSort && <SortIcon field="reference" />}
                  </button>
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <button
                    onClick={() => onSort?.('category')}
                    className="flex items-center hover:text-foreground transition-colors"
                  >
                    Category
                    {onSort && <SortIcon field="category" />}
                  </button>
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <button
                    onClick={() => onSort?.('departmentId')}
                    className="flex items-center hover:text-foreground transition-colors"
                  >
                    Department
                    {onSort && <SortIcon field="departmentId" />}
                  </button>
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <button
                    onClick={() => onSort?.('currentRank')}
                    className="flex items-center hover:text-foreground transition-colors"
                  >
                    Rank
                    {onSort && <SortIcon field="currentRank" />}
                  </button>
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <button
                    onClick={() => onSort?.('step')}
                    className="flex items-center hover:text-foreground transition-colors"
                  >
                    Step
                    {onSort && <SortIcon field="step" />}
                  </button>
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <button
                    onClick={() => onSort?.('status')}
                    className="flex items-center hover:text-foreground transition-colors"
                  >
                    Status
                    {onSort && <SortIcon field="status" />}
                  </button>
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contract</th>
                <th className="whitespace-nowrap px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {personnel.map((person, index) => (
                <tr
                  key={person.id}
                  className="group transition-colors hover:bg-muted/30"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarImage src={person.imageUrl} alt={`${person.firstName} ${person.lastName}`} />
                        <AvatarFallback>{person.firstName[0]}{person.lastName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-card-foreground">{person.firstName} {person.lastName}</span>
                        <span className="text-sm text-muted-foreground">{person.specialty}</span>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="font-mono text-sm text-muted-foreground">{person.reference}</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge variant="outline" className={cn("font-medium", categoryColors[person.category])}>
                      {categoryLabels[person.category]}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-card-foreground">{getDepartmentName(person.departmentId)}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-card-foreground">{person.currentRank}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {person.step}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        person.status === 'active' && "bg-success/10 text-success border-success/20",
                        person.status === 'retired' && "bg-muted text-muted-foreground border-muted",
                        person.status === 'transferred' && "bg-warning/10 text-warning border-warning/20",
                        person.status === 'on_leave' && "bg-blue-500/10 text-blue-500 border-blue-500/20"
                      )}
                    >
                      {person.status}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">CDD</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Until Jun 2026</p>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView(person)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(person)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(person.id)} className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
