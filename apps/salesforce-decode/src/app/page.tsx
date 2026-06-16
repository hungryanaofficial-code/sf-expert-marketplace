import { Hero } from '@/components/sections/Hero';
import { FeaturedQuestions } from '@/components/sections/FeaturedQuestions';
import { PopularTopics } from '@/components/sections/PopularTopics';
import { LatestArticles } from '@/components/sections/LatestArticles';
import { CareerTimeline, AboutMe } from '@/components/sections/CareerTimeline';
import { Skills } from '@/components/sections/Skills';
import { Newsletter } from '@/components/sections/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedQuestions />
      <PopularTopics />
      <LatestArticles />
      <Skills />
      <CareerTimeline />
      <AboutMe />
      <Newsletter />
    </>
  );
}
