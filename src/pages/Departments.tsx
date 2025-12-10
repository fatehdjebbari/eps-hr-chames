import { useState } from 'react';
import { Building2, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockDepartments, mockPersonnel } from '@/data/mockData';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 6;

export default function Departments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);

  const departmentColors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-blue-500',
    'from-teal-500 to-cyan-500',
  ];

  const getDepartmentStats = (departmentId: string) => {
    const personnel = mockPersonnel.filter(p => p.departmentId === departmentId);
    const activeCount = personnel.filter(p => p.status === 'active').length;
    const retiredCount = personnel.filter(p => p.status === 'retired').length;
    const transferredCount = personnel.filter(p => p.status === 'transferred').length;

    return {
      total: personnel.length,
      active: activeCount,
      retired: retiredCount,
      transferred: transferredCount,
      personnel,
    };
  };

  const handleViewTeam = (departmentId: string) => {
    setSelectedDepartmentId(departmentId);
    setIsTeamDialogOpen(true);
  };

  const selectedDepartment = mockDepartments.find(d => d.id === selectedDepartmentId);
  const selectedTeam = selectedDepartmentId ? getDepartmentStats(selectedDepartmentId).personnel : [];

  // Pagination
  const totalPages = Math.ceil(mockDepartments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDepartments = mockDepartments.slice(startIndex, endIndex);

  return (
    <MainLayout title="Departments" subtitle="Manage organizational departments">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-muted-foreground dark:text-gray-400">
              Showing {startIndex + 1}-{Math.min(endIndex, mockDepartments.length)} of {mockDepartments.length} departments
            </p>
          </div>
        </div>

        {/* Department Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentDepartments.map((department, index) => {
            const stats = getDepartmentStats(department.id);
            const gradient = departmentColors[index % departmentColors.length];

            return (
              <Card key={department.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={cn("h-2 bg-gradient-to-r", gradient)} />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-3 rounded-lg bg-gradient-to-br", gradient)}>
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="dark:text-white">{department.name}</CardTitle>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          Code: {department.code}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Total Personnel */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                      <span className="text-sm font-medium dark:text-white">Total Personnel</span>
                    </div>
                    <span className="text-2xl font-bold dark:text-white">{stats.total}</span>
                  </div>

                  {/* Status Breakdown */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground dark:text-gray-400">Active</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: stats.total > 0 ? `${(stats.active / stats.total) * 100}% ` : '0%' }}
                          />
                        </div>
                        <span className="font-medium dark:text-white w-8 text-right">{stats.active}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground dark:text-gray-400">Retired</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: stats.total > 0 ? `${(stats.retired / stats.total) * 100}% ` : '0%' }}
                          />
                        </div>
                        <span className="font-medium dark:text-white w-8 text-right">{stats.retired}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground dark:text-gray-400">Transferred</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-orange-500"
                            style={{ width: stats.total > 0 ? `${(stats.transferred / stats.total) * 100}% ` : '0%' }}
                          />
                        </div>
                        <span className="font-medium dark:text-white w-8 text-right">{stats.transferred}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleViewTeam(department.id)}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    View Team
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Organization Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="dark:text-white">Organization Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground dark:text-gray-400">Total Departments</p>
                <p className="text-2xl font-bold dark:text-white">{mockDepartments.length}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground dark:text-gray-400">Total Personnel</p>
                <p className="text-2xl font-bold dark:text-white">{mockPersonnel.length}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground dark:text-gray-400">Active Staff</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {mockPersonnel.filter(p => p.status === 'active').length}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground dark:text-gray-400">Avg per Department</p>
                <p className="text-2xl font-bold dark:text-white">
                  {Math.round(mockPersonnel.length / mockDepartments.length)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team View Dialog */}
        <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {selectedDepartment?.name} - Team Members
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedTeam.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No team members in this department
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedTeam.map((person) => (
                    <div
                      key={person.id}
                      className="flex items-center justify-between p-4 rounded-lg border dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                          {person.firstName[0]}{person.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">
                            {person.firstName} {person.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground dark:text-gray-400">
                            {person.specialty || person.currentRank}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium dark:text-white">{person.currentRank}</p>
                        <p className={cn(
                          "text-xs capitalize",
                          person.status === 'active' && "text-green-600 dark:text-green-400",
                          person.status === 'retired' && "text-blue-600 dark:text-blue-400",
                          person.status === 'transferred' && "text-orange-600 dark:text-orange-400"
                        )}>
                          {person.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
