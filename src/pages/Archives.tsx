import { useState } from 'react';
import { Search, Archive, FileText, Lock, Eye } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockDepartments } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

interface Retiree {
  id: string;
  firstName: string;
  lastName: string;
  reference: string;
  lastRank: string;
  departmentId: string;
  retirementDate: string;
  yearsOfService: number;
}

const mockRetirees: Retiree[] = [
  {
    id: '1',
    firstName: 'Rachid',
    lastName: 'Mouhoub',
    reference: 'MED-1990-0012',
    lastRank: 'Médecin Chef',
    departmentId: '1',
    retirementDate: '2023-12-31',
    yearsOfService: 33,
  },
  {
    id: '2',
    firstName: 'Zohra',
    lastName: 'Belkacem',
    reference: 'PARA-1995-0045',
    lastRank: 'Infirmier Principal',
    departmentId: '3',
    retirementDate: '2023-06-30',
    yearsOfService: 28,
  },
  {
    id: '3',
    firstName: 'Omar',
    lastName: 'Saidi',
    reference: 'PHAR-1988-0008',
    lastRank: 'Pharmacien Principal',
    departmentId: '4',
    retirementDate: '2022-12-31',
    yearsOfService: 34,
  },
];

export default function Archives() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRetiree, setSelectedRetiree] = useState<Retiree | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const filteredRetirees = mockRetirees.filter(r =>
    r.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.reference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDepartmentName = (id: string) => {
    return mockDepartments.find(d => d.id === id)?.name || 'Unknown';
  };

  const handleViewDetails = (retiree: Retiree) => {
    setSelectedRetiree(retiree);
    setIsDetailsOpen(true);
  };

  const handlePrintCertificate = () => {
    if (!selectedRetiree) return;
    toast({
      title: 'Certificate generated',
      description: `Retirement certificate for ${selectedRetiree.firstName} ${selectedRetiree.lastName} is ready.`,
    });
  };

  const handleRequestModification = () => {
    toast({
      title: 'Request sent',
      description: 'Modification request has been sent to the director for approval.',
    });
  };

  return (
    <MainLayout title="Archives" subtitle="Manage retirees' files and documents">
      <div className="space-y-6">
        {/* Info Banner */}
        <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
            <Lock className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="font-medium text-foreground">Archive Access Notice</p>
            <p className="text-sm text-muted-foreground">
              Modifications to archived files require director authorization. You can view and print certificates.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search retirees by name or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          {filteredRetirees.length} archived records found
        </p>

        {/* Retirees Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRetirees.map((retiree, index) => (
            <div
              key={retiree.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-lg animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                    <Archive className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-card-foreground">
                      {retiree.firstName} {retiree.lastName}
                    </h3>
                    <p className="text-sm font-mono text-muted-foreground">{retiree.reference}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-muted text-muted-foreground">
                  Retired
                </Badge>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Rank</span>
                  <span className="font-medium text-card-foreground">{retiree.lastRank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department</span>
                  <span className="font-medium text-card-foreground">{getDepartmentName(retiree.departmentId)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Years</span>
                  <span className="font-medium text-card-foreground">{retiree.yearsOfService} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Retired On</span>
                  <span className="font-medium text-card-foreground">
                    {new Date(retiree.retirementDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewDetails(retiree)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedRetiree(retiree);
                    handlePrintCertificate();
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Certificate
                </Button>
              </div>

              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-muted/50 blur-2xl" />
            </div>
          ))}
        </div>

        {/* Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">Retiree Details</DialogTitle>
              <DialogDescription>
                Archived record for {selectedRetiree?.firstName} {selectedRetiree?.lastName}
              </DialogDescription>
            </DialogHeader>

            {selectedRetiree && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted text-xl font-bold text-muted-foreground">
                    {selectedRetiree.firstName[0]}{selectedRetiree.lastName[0]}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      {selectedRetiree.firstName} {selectedRetiree.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">{selectedRetiree.lastRank}</p>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <span className="text-sm text-muted-foreground">Reference</span>
                    <span className="font-mono text-sm font-medium">{selectedRetiree.reference}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <span className="text-sm text-muted-foreground">Department</span>
                    <span className="text-sm font-medium">{getDepartmentName(selectedRetiree.departmentId)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <span className="text-sm text-muted-foreground">Years of Service</span>
                    <span className="text-sm font-medium">{selectedRetiree.yearsOfService} years</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <span className="text-sm text-muted-foreground">Retirement Date</span>
                    <span className="text-sm font-medium">
                      {new Date(selectedRetiree.retirementDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg border border-warning/20 bg-warning/5 p-3">
                  <div className="flex items-center gap-2 text-sm text-warning">
                    <Lock className="h-4 w-4" />
                    <span className="font-medium">Modifications require director approval</span>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={handleRequestModification}>
                Request Modification
              </Button>
              <Button onClick={handlePrintCertificate}>
                <FileText className="mr-2 h-4 w-4" />
                Print Certificate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
