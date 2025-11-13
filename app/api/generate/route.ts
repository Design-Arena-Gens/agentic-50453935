import { NextRequest, NextResponse } from 'next/server'

const trendingTopics = {
  fitness: ['home workouts', 'weight loss', 'muscle building', 'yoga', 'HIIT'],
  cooking: ['quick recipes', 'meal prep', 'healthy eating', 'desserts', 'one-pot meals'],
  gaming: ['gameplay tips', 'new releases', 'speedruns', 'funny moments', 'game reviews'],
  tech: ['AI tools', 'productivity hacks', 'app reviews', 'coding tips', 'gadget reviews'],
  lifestyle: ['morning routines', 'productivity', 'minimalism', 'self-care', 'organization'],
  business: ['side hustles', 'passive income', 'marketing tips', 'entrepreneurship', 'investing'],
  education: ['study tips', 'learning hacks', 'language learning', 'skill development', 'career advice'],
  entertainment: ['movie reviews', 'music reactions', 'trending challenges', 'comedy skits', 'celebrity news'],
}

const viralHooks = [
  'You won\'t believe what happened when...',
  'This changed everything...',
  'Nobody talks about this...',
  'I tried this for 30 days and...',
  'The secret that pros don\'t want you to know...',
  'This hack will blow your mind...',
  'Stop doing this immediately...',
  'I wish I knew this earlier...',
  'This is why you\'re failing at...',
  'The truth about...',
]

const optimizationTips = [
  'Use text overlays to grab attention in the first 2 seconds',
  'Add trending music from YouTube Shorts audio library',
  'Include a strong call-to-action at the end',
  'Use vertical 9:16 format for maximum visibility',
  'Add captions for accessibility and engagement',
  'Keep the pace fast - change scenes every 2-3 seconds',
  'Use jump cuts to maintain energy',
  'End with a question to drive comments',
  'Cross-post to other platforms for maximum reach',
  'Reply to comments quickly to boost engagement',
]

function generateVideoIdeas(niche: string): any[] {
  const nicheKey = niche.toLowerCase()
  const topics = trendingTopics[nicheKey as keyof typeof trendingTopics] ||
                 ['trends', 'tips', 'tutorials', 'reviews', 'hacks']

  const ideas = []

  for (let i = 0; i < 3; i++) {
    const topic = topics[i % topics.length]
    const hook = viralHooks[Math.floor(Math.random() * viralHooks.length)]
    const viralScore = Math.floor(Math.random() * 20) + 80 // 80-100%

    const idea = {
      title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} That Will ${['Blow Your Mind', 'Change Your Life', 'Go Viral', 'Shock You', 'Make You Rich'][i % 5]}`,
      hook: hook.replace('...', ` ${topic}...`),
      script: generateScript(niche, topic),
      hashtags: generateHashtags(niche, topic),
      thumbnail: `Bold text: "${topic.toUpperCase()}" with ${['shocked face', 'before/after split', 'eye-catching colors', 'surprising visual', 'curiosity gap'][i % 5]}. Use high contrast colors.`,
      trending: i === 0,
      viralScore,
      optimization: {
        bestTime: ['6-9 AM', '12-2 PM', '5-10 PM'][i % 3] + ' (peak engagement hours)',
        duration: ['15-30 seconds', '30-45 seconds', '45-60 seconds'][i % 3],
        tips: optimizationTips.slice(i * 3, i * 3 + 3),
      }
    }

    ideas.push(idea)
  }

  return ideas
}

function generateScript(niche: string, topic: string): string {
  return `[First 2 seconds - HOOK]
"Wait... ${topic}? This is insane!"

[Seconds 3-20 - VALUE]
Here's what nobody tells you about ${topic} in ${niche}:
✅ Point 1: Quick tip that delivers instant value
✅ Point 2: Surprising fact or hack
✅ Point 3: The game-changing insight

[Seconds 21-30 - CTA]
"Try this and watch what happens!
Follow for more ${niche} tips 🔥"

[Visual notes: Fast cuts, text overlays, trending audio]`
}

function generateHashtags(niche: string, topic: string): string[] {
  const base = ['#shorts', '#viral', '#trending']
  const nicheSpecific = [
    `#${niche}`,
    `#${topic.replace(/\s+/g, '')}`,
    `#${niche}tips`,
    `#${niche}hacks`,
  ]
  return [...base, ...nicheSpecific].slice(0, 7)
}

export async function POST(request: NextRequest) {
  try {
    const { niche } = await request.json()

    if (!niche || typeof niche !== 'string') {
      return NextResponse.json(
        { error: 'Niche is required' },
        { status: 400 }
      )
    }

    // Generate ideas using algorithm
    const ideas = generateVideoIdeas(niche)

    // Simulate AI processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500))

    return NextResponse.json({ ideas })
  } catch (error) {
    console.error('Error generating ideas:', error)
    return NextResponse.json(
      { error: 'Failed to generate ideas' },
      { status: 500 }
    )
  }
}
