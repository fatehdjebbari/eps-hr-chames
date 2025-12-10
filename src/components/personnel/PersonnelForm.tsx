import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Personnel, PersonnelCategory } from '@/types/hr';
import { mockDepartments, mockDomains } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

const personnelSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  originalRank: z.string().min(1, 'Original rank is required'),
  currentRank: z.string().min(1, 'Current rank is required'),
  reference: z.string().min(1, 'Reference is required'),
  step: z.number().min(1).max(12),
  category: z.string().min(1, 'Category is required'),
  departmentId: z.string().min(1, 'Department is required'),
  specialty: z.string().optional(),
  hireDate: z.string().min(1, 'Hire date is required'),
});

type PersonnelFormData = z.infer<typeof personnelSchema>;

interface PersonnelFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Personnel>) => void;
  initialData?: Personnel | null;
}

const categories: { value: PersonnelCategory; label: string }[] = [
  { value: 'specialist_doctor', label: 'Specialist Doctor' },
  { value: 'occupational_doctor', label: 'Occupational Doctor' },
  { value: 'pharmacist', label: 'Pharmacist' },
  { value: 'dentist', label: 'Dentist' },
  { value: 'paramedical', label: 'Paramedical' },
];

export function PersonnelForm({ open, onClose, onSubmit, initialData }: PersonnelFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<PersonnelFormData>({
    resolver: zodResolver(personnelSchema),
    defaultValues: initialData || {
      step: 1,
    },
  });

  const selectedCategory = watch('category');

  const getSpecialties = () => {
    const categoryDomainMap: Record<string, string> = {
      specialist_doctor: 'Medicine',
      occupational_doctor: 'Medicine',
      pharmacist: 'Pharmacy',
      dentist: 'Dentistry',
      paramedical: 'Paramedical',
    };
    const domainName = categoryDomainMap[selectedCategory];
    const domain = mockDomains.find(d => d.name === domainName);
    return domain?.specialties || [];
  };

  const onFormSubmit = (data: PersonnelFormData) => {
    onSubmit({
      ...data,
      category: data.category as PersonnelCategory,
      status: 'active',
    });
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {initialData ? 'Edit Personnel' : 'Add New Personnel'}
          </DialogTitle>
          <DialogDescription>
            {initialData ? 'Update the personnel information below.' : 'Fill in the details to add a new staff member.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register('firstName')} placeholder="Enter first name" />
              {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register('lastName')} placeholder="Enter last name" />
              {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" type="date" {...register('dateOfBirth')} />
              {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="hireDate">Hire Date</Label>
              <Input id="hireDate" type="date" {...register('hireDate')} />
              {errors.hireDate && <p className="text-sm text-destructive">{errors.hireDate.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register('address')} placeholder="Enter full address" />
            {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setValue('category', value)} defaultValue={initialData?.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Select onValueChange={(value) => setValue('specialty', value)} defaultValue={initialData?.specialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  {getSpecialties().map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departmentId">Department</Label>
              <Select onValueChange={(value) => setValue('departmentId', value)} defaultValue={initialData?.departmentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {mockDepartments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.departmentId && <p className="text-sm text-destructive">{errors.departmentId.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference">Reference</Label>
              <Input id="reference" {...register('reference')} placeholder="e.g., MED-2024-0001" />
              {errors.reference && <p className="text-sm text-destructive">{errors.reference.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originalRank">Original Rank</Label>
              <Input id="originalRank" {...register('originalRank')} placeholder="Starting rank" />
              {errors.originalRank && <p className="text-sm text-destructive">{errors.originalRank.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentRank">Current Rank</Label>
              <Input id="currentRank" {...register('currentRank')} placeholder="Current rank" />
              {errors.currentRank && <p className="text-sm text-destructive">{errors.currentRank.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="step">Step (Échelon)</Label>
              <Input
                id="step"
                type="number"
                min={1}
                max={12}
                {...register('step', { valueAsNumber: true })}
              />
              {errors.step && <p className="text-sm text-destructive">{errors.step.message}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update Personnel' : 'Add Personnel'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
