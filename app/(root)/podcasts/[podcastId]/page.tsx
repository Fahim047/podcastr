'use client';

import EmptyState from '@/components/EmptyState';
import LoaderSpinner from '@/components/LoaderSpinner';
import PodCastCard from '@/components/PodCastCard';
import PodcastDetailPlayer from '@/components/PodcastDetailPlayer';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import Image from 'next/image';

const PodcastDetails = ({
	params: { podcastId },
}: {
	params: { podcastId: Id<'podcasts'> };
}) => {
	const { user } = useUser();

	const podcast = useQuery(api.podcasts.getPodcastById, {
		podcastId,
	});

	const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, {
		podcastId,
	});

	const isOwner = user?.id === podcast?.authorId;

	if (!podcast || !similarPodcasts) return <LoaderSpinner />;
	return (
		<section className="w-full flex flex-col">
			<header className="mt-9 flex items-center justify-between">
				<h1 className="text-20 font-bold text-white-1">
					Currently Playing
				</h1>
				<figure className="flex gap-3">
					<Image
						src="/icons/headphone.svg"
						width={24}
						height={24}
						alt="headphone"
					/>
					<h2 className="text-16 font-bold text-white-1">
						{podcast?.views}
					</h2>
				</figure>
			</header>

			<PodcastDetailPlayer
				isOwner={isOwner}
				podcastId={podcast._id}
				{...podcast}
			/>

			<p className="text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">
				{podcast?.podcastDescription}
			</p>

			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-4">
					<h1 className="text-18 font-bold text-white-1">
						Transcription
					</h1>
					<p className="text-16 font-medium text-white-2">
						{podcast?.voicePrompt}
					</p>
				</div>
				<div className="flex flex-col gap-4">
					<h1 className="text-18 font-bold text-white-1">
						Thumnail Prompt
					</h1>
					<p className="text-16 font-medium text-white-2">
						{podcast?.imagePrompt}
					</p>
				</div>
			</div>

			<section className="mt-8 flex flex-col gap-5">
				<h1 className="text-20 font-bold text-white-1">
					Similar Podcasts
				</h1>
				{similarPodcasts && similarPodcasts.length > 0 ? (
					<div className="podcast_grid">
						{similarPodcasts?.map(
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
					<EmptyState
						title="No similar podcasts found"
						buttonText="Discover more podcasts"
						buttonLink="/discover"
					/>
				)}
			</section>
		</section>
	);
};

export default PodcastDetails;
