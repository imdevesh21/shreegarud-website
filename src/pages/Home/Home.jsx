import Hero from "../../sections/Hero/Hero";
import ServicesPreview from "../../sections/ServicesPreview/ServicesPreview";
import Testimonials from "../../sections/Testimonials/Testimonials";
import PartnerScroller from "../../sections/PartnerScroller/PartnerScroller";
import Newsletter from "../../sections/Newsletter/Newsletter";
import ContactForm from "../../sections/ContactForm/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <PartnerScroller />
      <Testimonials />
      <Newsletter />
      <ContactForm />
    </>
  );
}
