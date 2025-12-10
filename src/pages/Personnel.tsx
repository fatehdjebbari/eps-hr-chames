import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PersonnelTable } from '@/components/personnel/PersonnelTable';
import { PersonnelForm } from '@/components/personnel/PersonnelForm';
import { PersonnelDetails } from '@/components/personnel/PersonnelDetails';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockPersonnel } from '@/data/mockData';
import { Personnel } from '@/types/hr';
import { toast } from '@/hooks/use-toast';

export default function PersonnelPage() {
  const [searchParams] = useSearchParams();
  const [personnel, setPersonnel] = useState<Personnel[]>(mockPersonnel);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Sorting state
  const [sortField, setSortField] = useState<keyof Personnel | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }

    // Handle deep linking for opening details
    const openId = searchParams.get('id');
    if (openId) {
      const person = personnel.find(p => p.id === openId);
      if (person) {
        setSelectedPersonnel(person);
        setIsDetailsOpen(true);
      }
    }
  }, [searchParams, personnel]);

  const defaultTab = searchParams.get('tab') || "overview";

  const filteredPersonnel = personnel.filter((p) => {
    const matchesSearch =
      p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sorting
  const sortedPersonnel = [...filteredPersonnel].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedPersonnel.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPersonnel = sortedPersonnel.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: keyof Personnel) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAdd = () => {
    setSelectedPersonnel(null);
    setIsFormOpen(true);
  };

  const handleEdit = (person: Personnel) => {
    setSelectedPersonnel(person);
    setIsFormOpen(true);
  };

  const handleView = (person: Personnel) => {
    setSelectedPersonnel(person);
    setIsDetailsOpen(true);
  };

  const handleDelete = (id: string) => {
    setPersonnel(personnel.filter(p => p.id !== id));
    toast({
      title: 'Personnel deleted',
      description: 'The personnel record has been removed.',
    });
  };

  const handleSubmit = (data: Partial<Personnel>) => {
    if (selectedPersonnel) {
      setPersonnel(personnel.map(p =>
        p.id === selectedPersonnel.id ? { ...p, ...data } : p
      ));
      toast({
        title: 'Personnel updated',
        description: 'The personnel information has been updated successfully.',
      });
    } else {
      const newPersonnel: Personnel = {
        id: String(Date.now()),
        ...data as Personnel,
      };
      setPersonnel([...personnel, newPersonnel]);
      toast({
        title: 'Personnel added',
        description: 'New personnel has been added successfully.',
      });
    }
  };

  return (
    <MainLayout title="Personnel Management" subtitle="Manage all staff members">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="specialist_doctor">Specialist Doctor</SelectItem>
                <SelectItem value="occupational_doctor">Occupational Doctor</SelectItem>
                <SelectItem value="pharmacist">Pharmacist</SelectItem>
                <SelectItem value="dentist">Dentist</SelectItem>
                <SelectItem value="paramedical">Paramedical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Personnel
          </Button>
        </div>

        {/* Results count and pagination info */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedPersonnel.length)} of {sortedPersonnel.length} personnel
            {sortedPersonnel.length !== personnel.length && ` (filtered from ${personnel.length})`}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <Select value={String(itemsPerPage)} onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <PersonnelTable
            personnel={paginatedPersonnel}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first, last, current, and pages around current
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-2">...</span>;
                }
                return null;
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {/* Form Dialog */}
        <PersonnelForm
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedPersonnel}
        />

        {/* Details Dialog */}
        <PersonnelDetails
          open={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            // Optional: clear params on close
          }}
          personnel={selectedPersonnel}
          defaultTab={defaultTab}
        />
      </div>
    </MainLayout>
  );
}
