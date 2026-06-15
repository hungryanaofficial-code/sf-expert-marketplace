import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';

const About = dynamic(() => import('@/components/sections/About').then((m) => m.About));
const Specialities = dynamic(() =>
  import('@/components/sections/Specialities').then((m) => m.Specialities)
);
const MenuCategories = dynamic(() =>
  import('@/components/sections/MenuCategories').then((m) => m.MenuCategories)
);
const FullMenu = dynamic(() => import('@/components/sections/FullMenu').then((m) => m.FullMenu));
const QRMenu = dynamic(() => import('@/components/sections/QRMenu').then((m) => m.QRMenu));
const WhyChoose = dynamic(() => import('@/components/sections/WhyChoose').then((m) => m.WhyChoose));
const Gallery = dynamic(() => import('@/components/sections/Gallery').then((m) => m.Gallery));
const Testimonials = dynamic(() =>
  import('@/components/sections/Testimonials').then((m) => m.Testimonials)
);
const Contact = dynamic(() => import('@/components/sections/Contact').then((m) => m.Contact));

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Specialities />
      <MenuCategories />
      <FullMenu />
      <QRMenu />
      <WhyChoose />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}
