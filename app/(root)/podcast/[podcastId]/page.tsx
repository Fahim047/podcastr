import React from 'react';

const PodcastDetails = ({ params }: { params: { podcastId: string } }) => {
	return <div>PodcastDetails for {params.podcastId}</div>;
};

export default PodcastDetails;
