'use client';

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileNav = () => {
	const pathName = usePathname();
	return (
		<Sheet>
			<SheetTrigger>
				<Image
					src="/icons/hamburger.svg"
					alt="menu"
					width={30}
					height={30}
					className="cursor-pointer"
				/>
			</SheetTrigger>
			<SheetContent side="left" className="bg-black-1">
				<Link
					href="/"
					className="flex cursor-pointer items-center gap-1 pb-10 pl-4"
				>
					<Image
						src="/icons/logo.svg"
						alt="logo"
						width={23}
						height={27}
					/>
					<h1 className="text-24 font-extrabold text-white-1 ml-2">
						Podcastr
					</h1>
				</Link>
				<div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
					<nav className="flex flex-col text-white-1">
						{sidebarLinks.map(({ imgURL, route, label }) => {
							const isActive =
								pathName === route ||
								pathName.startsWith(`${route}/`);
							return (
								<SheetClose asChild key={route}>
									<Link
										href={route}
										className={cn(
											'flex gap-3 items-center py-4 max-lg:px-4',
											{
												'bg-nav-focus border-r-4 border-orange-1':
													isActive,
											}
										)}
									>
										<Image
											src={imgURL}
											alt="label-logo"
											width={24}
											height={24}
										/>
										<p>{label}</p>
									</Link>
								</SheetClose>
							);
						})}
					</nav>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNav;
