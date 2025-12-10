import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GradeAssignment } from '@/types/hr';

interface DateEditDialogProps {
    isOpen: boolean;
    onClose: () => void;
    assignment: GradeAssignment | null;
    onSave: (id: string, newDate: string, notes: string) => void;
    personnelName: string;
}

export function DateEditDialog({ isOpen, onClose, assignment, onSave, personnelName }: DateEditDialogProps) {
    const [effectiveDate, setEffectiveDate] = useState(assignment?.effectiveDate || '');
    const [notes, setNotes] = useState(assignment?.notes || '');

    // Reset form when assignment changes
    if (assignment && effectiveDate === '' && assignment.effectiveDate) {
        setEffectiveDate(assignment.effectiveDate);
        setNotes(assignment.notes || '');
    }

    const handleSave = () => {
        if (assignment) {
            onSave(assignment.id, effectiveDate, notes);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Grade Effective Date</DialogTitle>
                    <DialogDescription>
                        Modify the effective date for <strong>{personnelName}</strong>.
                        This is useful for handling delays or special circumstances.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="assigned-date" className="text-right">
                            Assigned
                        </Label>
                        <div className="col-span-3 text-sm text-muted-foreground">
                            {assignment?.assignedDate}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="effective-date" className="text-right">
                            Effective
                        </Label>
                        <Input
                            id="effective-date"
                            type="date"
                            value={effectiveDate}
                            onChange={(e) => setEffectiveDate(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notes" className="text-right">
                            Reason
                        </Label>
                        <Textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="e.g. Delayed due to sick leave..."
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
