import { useState, useRef, useMemo } from 'react';
import { Search, FileText, Printer, Download, Check, ChevronsUpDown, Users, TrendingUp } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockPersonnel, mockDepartments } from '@/data/mockData';
import { Personnel } from '@/types/hr';
import { toast } from '@/hooks/use-toast';

// Mock certificate history
interface CertificateRecord {
  id: string;
  personnelId: string;
  personnelName: string;
  department: string;
  generatedDate: string;
  generatedBy: string;
}

const mockCertificateHistory: CertificateRecord[] = mockPersonnel.slice(0, 15).map((person, index) => ({
  id: `CERT-${String(index + 1).padStart(4, '0')}`,
  personnelId: person.id,
  personnelName: `${person.firstName} ${person.lastName}`,
  department: mockDepartments.find(d => d.id === person.departmentId)?.name || 'Unknown',
  generatedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  generatedBy: 'Admin User',
}));

export default function Certificates() {
  const [open, setOpen] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | null>(null);
  const [searchHistory, setSearchHistory] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [quickFilter, setQuickFilter] = useState<string>('all');
  const [recentSelections, setRecentSelections] = useState<Personnel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const componentRef = useRef<HTMLDivElement>(null);

  const pageStyle = `
    @page {
      size: A4 portrait;
      margin: 0;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
      }
    }
  `;

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: selectedPersonnel ? `Certificate_${selectedPersonnel.lastName}_${selectedPersonnel.firstName}` : 'Certificate',
    pageStyle: pageStyle,
    onAfterPrint: () => {
      toast({
        title: 'Certificate generated',
        description: `Work certificate for ${selectedPersonnel?.firstName} ${selectedPersonnel?.lastName} has been sent to print.`,
      });
    },
  });

  const getDepartmentName = (id: string) => {
    return mockDepartments.find(d => d.id === id)?.name || 'Unknown';
  };

  const calculateYearsOfService = (hireDate: string) => {
    const hire = new Date(hireDate);
    const now = new Date();
    return Math.floor((now.getTime() - hire.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  };

  const handleSelectPersonnel = (person: Personnel) => {
    setSelectedPersonnel(person);
    setOpen(false);

    // Add to recent selections (max 5)
    setRecentSelections(prev => {
      const filtered = prev.filter(p => p.id !== person.id);
      return [person, ...filtered].slice(0, 5);
    });
  };

  // Filter personnel for combobox
  const filteredPersonnel = useMemo(() => {
    return mockPersonnel.filter(p => {
      if (p.status !== 'active') return false;
      if (quickFilter !== 'all' && p.departmentId !== quickFilter) return false;
      return true;
    });
  }, [quickFilter]);

  // Filter and paginate history
  const filteredHistory = useMemo(() => {
    return mockCertificateHistory.filter(cert => {
      const matchesSearch = cert.personnelName.toLowerCase().includes(searchHistory.toLowerCase()) ||
        cert.id.toLowerCase().includes(searchHistory.toLowerCase());
      const matchesDepartment = departmentFilter === 'all' || cert.department === departmentFilter;
      return matchesSearch && matchesDepartment;
    });
  }, [searchHistory, departmentFilter]);

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = {
    total: mockCertificateHistory.length,
    thisMonth: mockCertificateHistory.filter(cert => {
      const certDate = new Date(cert.generatedDate);
      const now = new Date();
      return certDate.getMonth() === now.getMonth() && certDate.getFullYear() === now.getFullYear();
    }).length,
    byDepartment: mockDepartments.length,
  };

  return (
    <MainLayout title="Work Certificates" subtitle="Generate and manage work certificates">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All time generated</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.thisMonth}</div>
              <p className="text-xs text-muted-foreground">Generated this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.byDepartment}</div>
              <p className="text-xs text-muted-foreground">Active departments</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Search and Select */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="font-display">Generate Certificate</CardTitle>
              <CardDescription>
                Select a staff member to generate their work certificate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quick Department Filter */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Quick Filter by Department</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={quickFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setQuickFilter('all')}
                  >
                    All
                  </Button>
                  {mockDepartments.slice(0, 3).map((dept) => (
                    <Button
                      key={dept.id}
                      variant={quickFilter === dept.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setQuickFilter(dept.id)}
                    >
                      {dept.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Recent Selections */}
              {recentSelections.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Recent Selections</Label>
                  <div className="flex flex-wrap gap-2">
                    {recentSelections.map((person) => (
                      <Button
                        key={person.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSelectPersonnel(person)}
                        className="text-xs"
                      >
                        {person.firstName} {person.lastName}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Personnel Search */}
              <div className="space-y-2">
                <Label>Search Personnel</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between h-auto min-h-[40px]"
                    >
                      {selectedPersonnel ? (
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {selectedPersonnel.firstName[0]}{selectedPersonnel.lastName[0]}
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{selectedPersonnel.firstName} {selectedPersonnel.lastName}</div>
                            <div className="text-xs text-muted-foreground">{selectedPersonnel.reference}</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Search by name or reference...</span>
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                      <CommandInput placeholder="Type to search..." />
                      <CommandList>
                        <CommandEmpty>No personnel found.</CommandEmpty>
                        <CommandGroup heading={`${filteredPersonnel.length} Active Staff`}>
                          {filteredPersonnel.map((person) => (
                            <CommandItem
                              key={person.id}
                              value={`${person.firstName} ${person.lastName} ${person.reference}`}
                              onSelect={() => handleSelectPersonnel(person)}
                              className="flex items-center gap-3 py-3"
                            >
                              <Check
                                className={cn(
                                  "h-4 w-4",
                                  selectedPersonnel?.id === person.id ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                {person.firstName[0]}{person.lastName[0]}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{person.firstName} {person.lastName}</div>
                                <div className="text-xs text-muted-foreground">
                                  {person.reference} • {getDepartmentName(person.departmentId)}
                                </div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {selectedPersonnel && (
                <div className="rounded-lg bg-muted/50 p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                      {selectedPersonnel.firstName[0]}{selectedPersonnel.lastName[0]}
                    </div>
                    <div>
                      <h4 className="font-display font-semibold">
                        {selectedPersonnel.firstName} {selectedPersonnel.lastName}
                      </h4>
                      <p className="text-sm text-muted-foreground">{selectedPersonnel.currentRank}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Department: </span>
                      <span className="font-medium">{getDepartmentName(selectedPersonnel.departmentId)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Years of Service: </span>
                      <span className="font-medium">{calculateYearsOfService(selectedPersonnel.hireDate)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => handlePrint()}
                  disabled={!selectedPersonnel}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Generate & Print
                </Button>
                <Button
                  variant="outline"
                  disabled={!selectedPersonnel}
                  onClick={() => handlePrint()}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Certificate Preview */}
          <Card className="animate-slide-up min-w-0" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="font-display">Certificate Preview</CardTitle>
              <CardDescription>
                Preview of the work certificate that will be generated
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedPersonnel ? (

                <div className="w-full overflow-hidden rounded-lg border border-border bg-card">
                  <div className="flex justify-center overflow-hidden md:block">
                    <div
                      ref={componentRef}
                      className="relative flex w-[210mm] min-h-[297mm] flex-col justify-between bg-white p-12 text-black shadow-sm mx-auto transition-transform origin-top scale-[0.45] sm:scale-75 md:scale-100 print:shadow-none print:scale-100 print:mx-0 print:origin-top-left -mb-[160mm] sm:-mb-[80mm] md:mb-0"
                    >
                      {/* Decorative Border for Print */}
                      <div className="absolute inset-4 hidden border-4 border-double border-slate-800 print:block" />

                      <div className="relative z-10 space-y-8">
                        {/* Header */}
                        <div className="text-center">
                          <h3 className="font-serif text-xl font-bold uppercase tracking-widest text-slate-900">
                            Établissement Public de Santé de Proximité
                          </h3>
                          <div className="mt-2 flex items-center justify-center gap-4">
                            <div className="h-px w-12 bg-slate-400" />
                            <p className="font-serif text-xs italic text-slate-600">
                              Direction des Ressources Humaines
                            </p>
                            <div className="h-px w-12 bg-slate-400" />
                          </div>
                        </div>

                        {/* Title */}
                        <div className="text-center">
                          <h1 className="font-serif text-3xl font-bold uppercase tracking-wider text-slate-900">
                            Attestation de Travail
                          </h1>
                          <p className="mt-1 font-serif text-base italic text-slate-500">Work Certificate</p>
                        </div>

                        {/* Content */}
                        <div className="mx-auto max-w-2xl space-y-4 text-justify font-serif text-base leading-relaxed text-slate-800">
                          <p>
                            Le Directeur de l'Établissement Public de Santé de Proximité atteste par la présente que :
                          </p>

                          <div className="my-6 rounded-lg bg-slate-50 p-4 text-center print:bg-transparent print:p-0">
                            <p className="text-xl font-bold text-slate-900">
                              M. / Mme {selectedPersonnel.firstName} {selectedPersonnel.lastName}
                            </p>
                            <p className="mt-1 text-slate-600">
                              Né(e) le {new Date(selectedPersonnel.dateOfBirth).toLocaleDateString('fr-FR')}
                            </p>
                          </div>

                          <p>
                            Est employé(e) au sein de notre établissement en qualité de <strong>{selectedPersonnel.currentRank}</strong>.
                          </p>

                          <p>
                            L'intéressé(e) est affecté(e) au service <strong>{getDepartmentName(selectedPersonnel.departmentId)}</strong> et exerce ses fonctions depuis le <strong>{new Date(selectedPersonnel.hireDate).toLocaleDateString('fr-FR')}</strong> à ce jour.
                          </p>

                          <p>
                            Cette attestation est délivrée à l'intéressé(e) pour servir et valoir ce que de droit.
                          </p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="relative z-10 mt-8 flex items-end justify-between px-4">
                        <div className="text-xs text-slate-600">
                          <p>Réf: <span className="font-mono">{selectedPersonnel.reference}</span></p>
                          <p>Fait à Alger, le {new Date().toLocaleDateString('fr-FR')}</p>
                        </div>

                        <div className="text-center">
                          <p className="mb-6 font-serif text-base font-bold text-slate-900">Le Directeur</p>
                          <div className="h-20 w-40 rounded border border-dashed border-slate-300 bg-slate-50 print:hidden">
                            <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
                              Signature & Cachet
                            </div>
                          </div>
                          {/* Space for actual signature in print */}
                          <div className="hidden h-20 w-40 print:block" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">
                    Select a staff member to preview the certificate
                  </p>
                </div>
              )
              }</CardContent>
          </Card >
        </div >

        {/* Certificate History */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Certificate History</CardTitle>
            <CardDescription>View and manage previously generated certificates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or ID..."
                    value={searchHistory}
                    onChange={(e) => setSearchHistory(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {mockDepartments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.name}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredHistory.length)} of {filteredHistory.length} certificates
            </p>

            {/* Table */}
            <div className="rounded-md border overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="hidden px-4 py-3 text-left text-xs font-medium text-muted-foreground md:table-cell">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Personnel</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Department</th>
                    <th className="hidden px-4 py-3 text-left text-xs font-medium text-muted-foreground lg:table-cell">Generated Date</th>
                    <th className="hidden px-4 py-3 text-left text-xs font-medium text-muted-foreground xl:table-cell">Generated By</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paginatedHistory.map((cert) => (
                    <tr key={cert.id} className="hover:bg-muted/50">
                      <td className="hidden px-4 py-3 text-sm font-mono md:table-cell">{cert.id}</td>
                      <td className="px-4 py-3 text-sm font-medium">
                        <div>{cert.personnelName}</div>
                        {/* Show date on mobile only since column is hidden */}
                        <div className="text-xs text-muted-foreground lg:hidden">
                          {new Date(cert.generatedDate).toLocaleDateString('fr-FR')}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Badge variant="outline">{cert.department}</Badge>
                      </td>
                      <td className="hidden px-4 py-3 text-sm text-muted-foreground lg:table-cell">
                        {new Date(cert.generatedDate).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="hidden px-4 py-3 text-sm text-muted-foreground xl:table-cell">{cert.generatedBy}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
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
          </CardContent>
        </Card >
      </div >
    </MainLayout >
  );
}
