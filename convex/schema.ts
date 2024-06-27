import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	podcasts: defineTable({
		user: v.id('users'),
		podcastTitle: v.string(),
		podcastDescription: v.string(),
		audioUrl: v.optional(v.string()),
		audioStorageId: v.optional(v.id('_storage')),
		imageUrl: v.optional(v.string()),
		imageStorageId: v.optional(v.id('_storage')),
		author: v.string(),
		authorId: v.string(),
		authorImageUrl: v.string(),
		voicePrompt: v.string(),
		imagePrompt: v.string(),
		voiceType: v.string(),
		audioDuration: v.number(),
		views: v.number(),
	})
		.searchIndex('search_author', { searchField: 'author' })
		.searchIndex('search_title', {
			searchField: 'podcastTitle',
		})
		.searchIndex('search_description', {
			searchField: 'podcastDescription',
		}),
	users: defineTable({
		clerkId: v.string(),
		name: v.string(),
		email: v.string(),
		imageUrl: v.string(),
	}),
});
