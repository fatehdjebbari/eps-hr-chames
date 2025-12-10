import { Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function AppBreadcrumb({ className }: { className?: string }) {
    const location = useLocation();

    const pathMap: Record<string, string> = {
        dashboard: 'Dashboard',
        personnel: 'Personnel',
        departments: 'Departments',
        grades: 'Grades & Bodies',
        promotions: 'Promotions',
        certificates: 'Certificates',
        archives: 'Archives',
        settings: 'Settings',
    };

    const paths = location.pathname.split('/').filter(Boolean);

    if (paths.length === 0 || paths[0] === 'dashboard') return null;

    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/dashboard" className="flex items-center gap-1">
                            <Home className="h-4 w-4" />
                            Home
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {paths.map((path, index) => {
                    const label = pathMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
                    const href = `/${paths.slice(0, index + 1).join('/')}`;
                    const isLast = index === paths.length - 1;

                    return (
                        <div key={path} className="flex items-center gap-1.5">
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link to={href}>{label}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
