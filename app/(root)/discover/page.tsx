'use client';

import EmptyState from '@/components/EmptyState';
import LoaderSpinner from '@/components/LoaderSpinner';
import PodCastCard from '@/components/PodCastCard';
import SearchBar from '@/components/SearchBar';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React from 'react';

const Discover = ({
	searchParams: { search },
}: {
	searchParams: { search: string };
}) => {
	const podcastsData = useQuery(api.podcasts.getPodcastBySearch, {
		search: search || '',
	});
	return (
		<div className="flex flex-col gap-9">
			<SearchBar />
			<div className="flex flex-col gap-9">
				<h1 className="text-30 font-bold text-white-1">
					{!search ? 'Discover' : 'Search Results for: '}{' '}
					{search && <span className="text-white-2">{search}</span>}
				</h1>
				{podcastsData ? (
					<>
						{podcastsData.length > 0 ? (
							<div className="podcast_grid">
								{podcastsData?.map(
									({
										_id,
										podcastTitle,
										podcastDescription,
										imageUrl,
									}) => (
										<PodCastCard
											key={_id}
											title={podcastTitle}
											description={podcastDescription}
											imgUrl={imageUrl!}
											podcastId={_id}
										/>
									)
								)}
							</div>
						) : (
							<EmptyState title="No podcast found" />
						)}
					</>
				) : (
					<LoaderSpinner />
				)}
			</div>
		</div>
	);
};

export default Discover;
