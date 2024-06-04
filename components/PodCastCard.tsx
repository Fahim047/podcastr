import Image from 'next/image';
import React from 'react';

const PodCastCard = ({
	podcastId,
	title,
	description,
	imgURL,
}: {
	podcastId: number;
	title: string;
	description: string;
	imgURL: string;
}) => {
	return (
		<div className="cursor-pointer">
			<figure className="flex flex-col gap-2">
				<Image
					src={imgURL}
					alt={title}
					width={174}
					height={174}
					className="aspect-square h-fit w-full rounded-xl 2xl:size[200px]"
				/>
				<div className="flex flex-col">
					<h1 className="text-16 truncate text-white-1 font-bold">
						{title}
					</h1>
					<h2 className="text-14 truncate font-normal text-white-4 capitalize">
						{description}
					</h2>
				</div>
			</figure>
		</div>
	);
};

export default PodCastCard;
