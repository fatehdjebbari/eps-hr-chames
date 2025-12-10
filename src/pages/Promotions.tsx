import { useState } from 'react';
import { Plus, Printer, Search, Check, X } from 'lucide-react';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockPromotions, mockPersonnel } from '@/data/mockData';
import { Promotion, PromotionDuration, PromotionStatus } from '@/types/hr';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const durationLabels: Record<PromotionDuration, { label: string; years: string }> = {
  minimum: { label: 'Minimum', years: '2.5 years' },
  average: { label: 'Average', years: '3 years' },
  maximum: { label: 'Maximum', years: '3.5 years' },
};

const durationColors: Record<PromotionDuration, string> = {
  minimum: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  average: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  maximum: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
};

const statusColors: Record<PromotionStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function Promotions() {
  const [promotions, setPromotions] = useState<Promotion[]>(
    mockPromotions.map(p => ({ ...p, status: p.status || 'pending' }))
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedPromotionId, setSelectedPromotionId] = useState<string>('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    personnelId: '',
    newRank: '',
    newStep: 1,
    duration: 'average' as PromotionDuration,
    decisionNumber: '',
    effectiveDate: '',
  });

  const getPersonnelName = (id: string) => {
    const person = mockPersonnel.find(p => p.id === id);
    return person ? `${person.firstName} ${person.lastName}` : 'Unknown';
  };

  const getPersonnelInfo = (id: string) => {
    return mockPersonnel.find(p => p.id === id);
  };

  const handleApprove = (promotionId: string) => {
    setPromotions(promotions.map(p =>
      p.id === promotionId ? { ...p, status: 'approved' as PromotionStatus } : p
    ));
    toast({
      title: 'Promotion Approved',
      description: 'The promotion has been approved successfully.',
    });
  };

  const handleRejectClick = (promotionId: string) => {
    setSelectedPromotionId(promotionId);
    setRejectionReason('');
    setIsRejectDialogOpen(true);
  };

  const handleRejectConfirm = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: 'Rejection reason required',
        description: 'Please provide a reason for rejecting this promotion.',
        variant: 'destructive',
      });
      return;
    }

    setPromotions(promotions.map(p =>
      p.id === selectedPromotionId ? {
        ...p,
        status: 'rejected' as PromotionStatus,
        rejectionReason: rejectionReason
      } : p
    ));

    setIsRejectDialogOpen(false);
    setRejectionReason('');

    toast({
      title: 'Promotion Rejected',
      description: 'The promotion has been rejected.',
      variant: 'destructive',
    });
  };

  const handleSubmit = () => {
    const person = getPersonnelInfo(formData.personnelId);
    if (!person) return;

    const newPromotion: Promotion = {
      id: String(Date.now()),
      personnelId: formData.personnelId,
      previousRank: person.currentRank,
      newRank: formData.newRank,
      previousStep: person.step,
      newStep: formData.newStep,
      duration: formData.duration,
      effectiveDate: formData.effectiveDate,
      decisionNumber: formData.decisionNumber,
      status: 'pending',
    };

    setPromotions([...promotions, newPromotion]);
    setIsFormOpen(false);
    toast({
      title: 'Promotion recorded',
      description: `${getPersonnelName(formData.personnelId)} has been promoted successfully.`,
    });
  };

  const handlePrintDecision = (promotion: Promotion) => {
    const person = getPersonnelInfo(promotion.personnelId);
    if (!person) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Promotion Decision - ${promotion.decisionNumber}</title>
          <style>
            @media print {
              @page { margin: 2cm; }
            }
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #2563eb;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #2563eb;
              margin: 0;
              font-size: 24px;
            }
            .header p {
              margin: 5px 0;
              color: #666;
            }
            .content {
              margin: 30px 0;
            }
            .section {
              margin: 20px 0;
            }
            .section-title {
              font-weight: bold;
              color: #2563eb;
              margin-bottom: 10px;
              font-size: 16px;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #eee;
            }
            .info-label {
              font-weight: 600;
              color: #666;
            }
            .info-value {
              color: #333;
            }
            .footer {
              margin-top: 50px;
              padding-top: 20px;
              border-top: 2px solid #eee;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
            .badge {
              display: inline-block;
              padding: 4px 12px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 600;
              background: #dbeafe;
              color: #2563eb;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>PROMOTION DECISION</h1>
            <p>EPSP HR Management System</p>
            <p>Decision Number: <strong>${promotion.decisionNumber}</strong></p>
          </div>

          <div class="content">
            <div class="section">
              <div class="section-title">Personnel Information</div>
              <div class="info-row">
                <span class="info-label">Full Name:</span>
                <span class="info-value">${person.firstName} ${person.lastName}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Specialty:</span>
                <span class="info-value">${person.specialty}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Department:</span>
                <span class="info-value">${person.department}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Promotion Details</div>
              <div class="info-row">
                <span class="info-label">Previous Rank:</span>
                <span class="info-value">${promotion.previousRank}</span>
              </div>
              <div class="info-row">
                <span class="info-label">New Rank:</span>
                <span class="info-value"><strong>${promotion.newRank}</strong></span>
              </div>
              <div class="info-row">
                <span class="info-label">Previous Step:</span>
                <span class="info-value">${promotion.previousStep}</span>
              </div>
              <div class="info-row">
                <span class="info-label">New Step:</span>
                <span class="info-value"><strong>${promotion.newStep}</strong></span>
              </div>
              <div class="info-row">
                <span class="info-label">Duration:</span>
                <span class="info-value">
                  <span class="badge">${durationLabels[promotion.duration].label} (${durationLabels[promotion.duration].years})</span>
                </span>
              </div>
              <div class="info-row">
                <span class="info-label">Effective Date:</span>
                <span class="info-value">${new Date(promotion.effectiveDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>

          <div class="footer">
            <p>Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>&copy; ${new Date().getFullYear()} EPSP HR Management System</p>
          </div>

          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  const filteredPromotions = promotions.filter(promotion => {
    const person = getPersonnelInfo(promotion.personnelId);
    const searchLower = searchQuery.toLowerCase();
    return (
      getPersonnelName(promotion.personnelId).toLowerCase().includes(searchLower) ||
      promotion.decisionNumber.toLowerCase().includes(searchLower) ||
      person?.specialty.toLowerCase().includes(searchLower)
    );
  });

  return (
    <MainLayout title="Promotions" subtitle="Manage personnel promotions">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search promotions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Promotion
          </Button>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredPromotions.map((promotion) => {
            const person = getPersonnelInfo(promotion.personnelId);
            const status = promotion.status || 'pending';
            return (
              <div
                key={promotion.id}
                className="rounded-lg border dark:border-gray-800 bg-white dark:bg-gray-900 p-4 space-y-3"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium dark:text-white">
                      {getPersonnelName(promotion.personnelId)}
                    </div>
                    <div className="text-sm text-muted-foreground dark:text-gray-400">
                      {person?.specialty}
                    </div>
                  </div>
                  <Badge className={cn("text-xs capitalize", statusColors[status])}>
                    {status}
                  </Badge>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Previous Rank:</span>
                    <span className="dark:text-white">{promotion.previousRank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">New Rank:</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{promotion.newRank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Step Change:</span>
                    <span className="dark:text-white">{promotion.previousStep} → {promotion.newStep}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Duration:</span>
                    <Badge className={cn("text-xs", durationColors[promotion.duration])}>
                      {durationLabels[promotion.duration].label}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Effective Date:</span>
                    <span className="dark:text-white">{new Date(promotion.effectiveDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-gray-400">Decision #:</span>
                    <span className="font-mono text-xs dark:text-white">{promotion.decisionNumber}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t dark:border-gray-800">
                  {status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApprove(promotion.id)}
                        className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRejectClick(promotion.id)}
                        className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                  {status === 'approved' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePrintDecision(promotion)}
                    >
                      <Printer className="h-4 w-4 mr-1" />
                      Print
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block rounded-lg border dark:border-gray-800 bg-white dark:bg-gray-900">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Personnel</TableHead>
                <TableHead>Previous Rank</TableHead>
                <TableHead>New Rank</TableHead>
                <TableHead>Step Change</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Decision #</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromotions.map((promotion) => {
                const person = getPersonnelInfo(promotion.personnelId);
                const status = promotion.status || 'pending';
                return (
                  <TableRow key={promotion.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium dark:text-white">
                          {getPersonnelName(promotion.personnelId)}
                        </div>
                        <div className="text-sm text-muted-foreground dark:text-gray-400">
                          {person?.specialty}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground dark:text-gray-400">
                      {promotion.previousRank}
                    </TableCell>
                    <TableCell className="font-medium text-blue-600 dark:text-blue-400">
                      {promotion.newRank}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {promotion.previousStep} → {promotion.newStep}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", durationColors[promotion.duration])}>
                        {durationLabels[promotion.duration].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs capitalize", statusColors[status])}>
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(promotion.effectiveDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm font-mono text-muted-foreground dark:text-gray-400">
                      {promotion.decisionNumber}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleApprove(promotion.id)}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRejectClick(promotion.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {status === 'approved' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePrintDecision(promotion)}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Promotion Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>New Promotion</DialogTitle>
              <DialogDescription>
                Record a new promotion for a staff member.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Personnel</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, personnelId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select personnel" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPersonnel.filter(p => p.status === 'active').map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        {person.firstName} {person.lastName} - {person.currentRank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newRank">New Rank</Label>
                  <Input
                    id="newRank"
                    value={formData.newRank}
                    onChange={(e) => setFormData({ ...formData, newRank: e.target.value })}
                    placeholder="e.g., Médecin Chef"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newStep">New Step</Label>
                  <Input
                    id="newStep"
                    type="number"
                    min={1}
                    max={12}
                    value={formData.newStep}
                    onChange={(e) => setFormData({ ...formData, newStep: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Promotion Duration</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value as PromotionDuration })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(durationLabels).map(([key, { label, years }]) => (
                      <SelectItem key={key} value={key}>
                        {label} ({years})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="decisionNumber">Decision Number</Label>
                  <Input
                    id="decisionNumber"
                    value={formData.decisionNumber}
                    onChange={(e) => setFormData({ ...formData, decisionNumber: e.target.value })}
                    placeholder="e.g., DEC-2024-0001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="effectiveDate">Effective Date</Label>
                  <Input
                    id="effectiveDate"
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Record Promotion</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Rejection Reason Dialog */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Reject Promotion</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this promotion.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rejectionReason">Rejection Reason</Label>
                <textarea
                  id="rejectionReason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter the reason for rejection..."
                  className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleRejectConfirm}>Confirm Rejection</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
