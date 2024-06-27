'use client';
import PodCastCard from '@/components/PodCastCard';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const Home = () => {
	const podcastData = useQuery(api.podcasts.getTrendingPodcasts);
	// console.log(podcastData);
	return (
		<div className="mt-9 flex flex-col gap-9">
			<section className="flex flex-col gap-5">
				<h1 className="text-20 font-bold text-white-1">
					Trending Podcasts
				</h1>

				<div className="podcast_grid">
					{podcastData?.map(
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
			</section>
		</div>
	);
};

export default Home;
