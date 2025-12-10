import { useState } from 'react';
import { Personnel } from '@/types/hr';
import { mockDepartments, mockSalaryRequests } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Calendar, MapPin, Briefcase, Building2, Award, Hash,
  FileText, History, AlertCircle, CheckCircle2,
  Printer, Send, DollarSign, TrendingUp, Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface PersonnelDetailsProps {
  open: boolean;
  onClose: () => void;
  personnel: Personnel | null;
  defaultTab?: string;
}

const categoryLabels: Record<string, string> = {
  specialist_doctor: 'Specialist Doctor',
  occupational_doctor: 'Occupational Doctor',
  pharmacist: 'Pharmacist',
  dentist: 'Dentist',
  paramedical: 'Paramedical',
};

export function PersonnelDetails({ open, onClose, personnel, defaultTab = "overview" }: PersonnelDetailsProps) {
  const { toast } = useToast();
  const [isRenewDialogOpen, setIsRenewDialogOpen] = useState(false);

  if (!personnel) return null;

  const department = mockDepartments.find(d => d.id === personnel.departmentId);

  const handleSendContract = () => {
    toast({
      title: "Contract Sent Successfully",
      description: `Digital contract sent to ${personnel.firstName} ${personnel.lastName} for signature.`,
      duration: 3000,
    });
    setIsRenewDialogOpen(false);
  };

  const handlePrintContract = () => {
    toast({
      title: "Downloading Contract...",
      description: "PDF generated for manual signature.",
      duration: 3000,
    });
    setIsRenewDialogOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden h-[80vh] flex flex-col">
          <DialogHeader className="px-6 py-4 border-b">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground shrink-0">
                {personnel.firstName[0]}{personnel.lastName[0]}
              </div>
              <div>
                <DialogTitle className="font-display text-xl">
                  {personnel.firstName} {personnel.lastName}
                </DialogTitle>
                <DialogDescription className="mt-1">
                  {personnel.specialty} • {department?.name}
                </DialogDescription>
                <div className="flex gap-2 mt-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      personnel.status === 'active' && "bg-success/10 text-success border-success/20"
                    )}
                  >
                    {personnel.status}
                  </Badge>
                  <Badge variant="secondary" className="font-mono text-xs">
                    ID: {personnel.reference}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue={defaultTab} className="flex-1 flex flex-col min-h-0">
            <div className="px-6 pt-2 border-b">
              <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-transparent">
                <TabsTrigger
                  value="overview"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="contracts"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  Contracts & Renewals
                </TabsTrigger>
                <TabsTrigger
                  value="salary"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  Salary & Requests
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6">
                <TabsContent value="overview" className="mt-0 space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Category</p>
                        <p className="text-sm font-medium text-foreground">{categoryLabels[personnel.category]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Department</p>
                        <p className="text-sm font-medium text-foreground">{department?.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                      <Award className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Rank & Step</p>
                        <p className="text-sm font-medium text-foreground">{personnel.currentRank} - Step {personnel.step}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Hire Date</p>
                        <p className="text-sm font-medium text-foreground">{new Date(personnel.hireDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Address</p>
                        <p className="text-sm font-medium text-foreground">{personnel.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Contract Status - Always visible in Overview */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Contract Status</p>
                          <p className="text-xs text-muted-foreground">CDD • Valid until Jun 30, 2026</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Switch to contracts tab
                          const contractsTab = document.querySelector('[value="contracts"]') as HTMLElement;
                          contractsTab?.click();
                        }}
                      >
                        View Details →
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contracts" className="mt-0 space-y-6">
                  {/* Active Contract Status */}
                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                          Active Contract
                        </CardTitle>
                        <Badge className="bg-primary hover:bg-primary/90">CDD</Badge>
                      </div>
                      <CardDescription>
                        Contract is valid and active until Jun 30, 2026
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex flex-col gap-1">
                          <span className="text-muted-foreground">Start Date</span>
                          <span className="font-medium">Jul 01, 2025</span>
                        </div>
                        <div className="flex flex-col gap-1 text-right">
                          <span className="text-muted-foreground">End Date</span>
                          <span className="font-medium">Jun 30, 2026</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-primary/10 flex justify-end">
                        <Button size="sm" onClick={() => setIsRenewDialogOpen(true)}>
                          Renew Contract
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contract History */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold mb-4 text-muted-foreground">
                      <History className="h-4 w-4" />
                      Contract History
                    </h4>
                    <div className="space-y-3">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">CDD - Fixed Term</p>
                              <p className="text-xs text-muted-foreground">
                                Jul 202{4 - i} - Jun 202{5 - i}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-muted-foreground">Expired</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="salary" className="mt-0 space-y-6">
                  {(() => {
                    const salaryRequest = mockSalaryRequests.find(r => r.personnelId === personnel.id);

                    return (
                      <>
                        {/* Current Salary Card */}
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                              <DollarSign className="h-5 w-5 text-primary" />
                              Current Salary
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold">
                                {salaryRequest ? salaryRequest.currentSalary.toLocaleString() : '75,000'}
                              </span>
                              <span className="text-muted-foreground">DZD / month</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Last updated: Jan 2025
                            </p>
                          </CardContent>
                        </Card>

                        {/* Pending Request */}
                        {salaryRequest && salaryRequest.status !== 'approved' && salaryRequest.status !== 'rejected' && (
                          <Card className={cn(
                            "border-2",
                            salaryRequest.status === 'pending' && "border-orange-200 bg-orange-50/50 dark:border-orange-900 dark:bg-orange-950/20",
                            salaryRequest.status === 'under_review' && "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20"
                          )}>
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                  <TrendingUp className="h-5 w-5" />
                                  Salary Increase Request
                                </CardTitle>
                                <Badge className={cn(
                                  salaryRequest.status === 'pending' && "bg-orange-500",
                                  salaryRequest.status === 'under_review' && "bg-blue-500"
                                )}>
                                  {salaryRequest.status === 'pending' ? 'Pending Review' : 'Under Review'}
                                </Badge>
                              </div>
                              <CardDescription className="flex items-center gap-2 mt-2">
                                <Clock className="h-3 w-3" />
                                Submitted {new Date(salaryRequest.submittedDate).toLocaleDateString()}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {/* Salary Comparison */}
                              <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-background/60">
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Current</p>
                                  <p className="text-lg font-semibold">{salaryRequest.currentSalary.toLocaleString()} DZD</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Requested</p>
                                  <p className="text-lg font-semibold text-primary">
                                    {salaryRequest.requestedSalary.toLocaleString()} DZD
                                  </p>
                                  <p className="text-xs text-green-600 dark:text-green-400">
                                    +{salaryRequest.requestedIncrease}% increase
                                  </p>
                                </div>
                              </div>

                              {/* Justification */}
                              <div>
                                <h4 className="text-sm font-medium mb-2">Justification</h4>
                                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                                  {salaryRequest.justification}
                                </p>
                              </div>

                              {/* Actions */}
                              {salaryRequest.status === 'pending' && (
                                <div className="flex gap-2 pt-2">
                                  <Button
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => {
                                      toast({
                                        title: "Request Approved",
                                        description: `Salary increase approved for ${personnel.firstName} ${personnel.lastName}.`,
                                      });
                                    }}
                                  >
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => {
                                      toast({
                                        title: "Request Rejected",
                                        description: "Please provide feedback to the employee.",
                                        variant: "destructive",
                                      });
                                    }}
                                  >
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )}

                        {/* Request History */}
                        {mockSalaryRequests.filter(r => r.personnelId === personnel.id).length > 0 && (
                          <div>
                            <h4 className="flex items-center gap-2 text-sm font-semibold mb-4 text-muted-foreground">
                              <History className="h-4 w-4" />
                              Request History
                            </h4>
                            <div className="space-y-3">
                              {mockSalaryRequests
                                .filter(r => r.personnelId === personnel.id && (r.status === 'approved' || r.status === 'rejected'))
                                .map((request) => (
                                  <div key={request.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                                    <div className="flex items-center gap-3">
                                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                                      <div>
                                        <p className="text-sm font-medium">
                                          +{request.requestedIncrease}% Increase Request
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {new Date(request.submittedDate).toLocaleDateString()}
                                          {request.reviewedDate && ` • Reviewed ${new Date(request.reviewedDate).toLocaleDateString()}`}
                                        </p>
                                      </div>
                                    </div>
                                    <Badge
                                      variant="outline"
                                      className={cn(
                                        request.status === 'approved' && "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400",
                                        request.status === 'rejected' && "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400"
                                      )}
                                    >
                                      {request.status === 'approved' ? 'Approved' : 'Rejected'}
                                    </Badge>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>

          <DialogFooter className="p-6 pt-4 border-t mt-auto">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Renewal Dialog */}
      <Dialog open={isRenewDialogOpen} onOpenChange={setIsRenewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Renew Contract</DialogTitle>
            <DialogDescription>
              Review and send the new contract details for signature.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground">Contract Type</span>
                <p className="text-sm font-medium">CDD (Fixed Term)</p>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground">Duration</span>
                <p className="text-sm font-medium">12 Months</p>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground">New Start Date</span>
                <p className="text-sm font-medium">Jul 01, 2026</p>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground">New End Date</span>
                <p className="text-sm font-medium">Jun 30, 2027</p>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <h4 className="text-sm font-medium mb-2">Signature Method</h4>
              <Button
                variant="default"
                className="w-full justify-start"
                onClick={handleSendContract}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 mr-3">
                  <Send className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-sm font-medium">Send for Digital Signature</span>
                  <span className="text-xs font-normal opacity-80">Email link to employee</span>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start bg-background"
                onClick={handlePrintContract}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted mr-3">
                  <Printer className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-sm font-medium">Print for Manual Signature</span>
                  <span className="text-xs font-normal text-muted-foreground">Download PDF copy</span>
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
