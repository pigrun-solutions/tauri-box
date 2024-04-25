import React from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

const FormBreadcrumbs = ({ currentPage, children }: { currentPage?: string; children?: React.ReactNode }) => {
    const router = useRouterState()
    const pathname = router.location.pathname
    const pathSegments = pathname.split('/').filter(segment => segment)

    return (
        <section className="flex justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    {pathSegments.slice(0, -1).map((segment, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem key={index}>
                                <BreadcrumbLink asChild>
                                    <Link className="capitalize" to={`/${pathSegments.slice(0, index + 1).join('/')}`}>
                                        {segment}
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        </React.Fragment>
                    ))}
                    {currentPage && pathSegments.length > 0 && (
                        <BreadcrumbItem>
                            <BreadcrumbPage className="capitalize">{currentPage}</BreadcrumbPage>
                        </BreadcrumbItem>
                    )}
                </BreadcrumbList>
            </Breadcrumb>

            {children && children}
        </section>
    )
}

export default FormBreadcrumbs
