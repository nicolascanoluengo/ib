import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonialsData = [
  {
    quote: "This tool was a game-changer. My teacher gave me a predicted 5 for my History IA, but after using the feedback here, I resubmitted and got a predicted 7! It's like having an IB examiner on call 24/7.",
    name: "Alex Johnson",
    school: "International School of Geneva"
  },
  {
    quote: "I was stuck on my EE for months. ChatGPT was too generic. This AI gave me specific, actionable feedback that helped me secure a high predicted grade and get into my dream university.",
    name: "Priya Sharma",
    school: "UWC South East Asia"
  },
  {
    quote: "The difference is clarity. Instead of vague comments, I got a criterion-by-criterion breakdown that showed me exactly where to improve. My predicted grade for TOK went from a C to an A.",
    name: "Carlos Rodriguez",
    school: "Sevenoaks School"
  }
];

const universityLogos = [
  { name: "UC Berkeley", url: "https://upload.wikimedia.org/wikipedia/commons/a/a1/UC_Berkeley_seal.svg" },
  { name: "UCLA", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/UCLA_Bruins_logo.svg/1200px-UCLA_Bruins_logo.svg.png" },
  { name: "Babson College", url: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Babson_College_seal.svg/1200px-Babson_College_seal.svg.png" },
  { name: "University of Virginia", url: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/University_of_Virginia_seal.svg/1200px-University_of_Virginia_seal.svg.png" },
  { name: "Northeastern University", url: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Northeastern_University_seal.svg/1200px-Northeastern_University_seal.svg.png" },
  { name: "Williams College", url: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Williams_College_seal.svg/1200px-Williams_College_seal.svg.png" },
  { name: "Duke University", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Duke_University_logo.svg/1280px-Duke_University_logo.svg.png" },
  { name: "Cornell University", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1200px-Cornell_University_seal.svg.png" },
  { name: "University of Michigan", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/University_of_Michigan_seal.svg/1200px-University_of_Michigan_seal.svg.png" },
  { name: "McGill University", url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/McGill_University_coat_of_arms.svg/1200px-McGill_University_coat_of_arms.svg.png" },
  { name: "UCL", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/University_College_London_logo.svg/1200px-University_College_London_logo.svg.png" },
  { name: "LSE", url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/LSE_Coat_of_Arms.svg/1200px-LSE_Coat_of_Arms.svg.png" },
  { name: "Stanford University", url: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Stanford_University_seal_2003.svg/1200px-Stanford_University_seal_2003.svg.png" },
  { name: "Brown University", url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Brown_University_shield.svg/1200px-Brown_University_shield.svg.png" },
];

const Testimonials = () => {
  const duplicatedLogos = [...universityLogos, ...universityLogos];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            From Good to Great: <span className="gradient-text">Real Student Success</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our students don't just improve their grades—they secure higher predicted grades and gain admission to top universities worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card h-full flex flex-col">
                <CardContent className="p-6 flex-grow">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-4 flex-grow">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.school}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">The Data Speaks for Itself</h3>
            <p className="text-lg text-gray-300">
              Students using our platform see a significant shift in their grade distribution, with a much higher probability of scoring in the 6-7 range. This directly translates to better predicted grades and stronger university applications.
            </p>
          </div>
          <div>
            <img  class="rounded-lg shadow-2xl w-full" alt="Graph showing grade distribution improvement for users of the AI tool" src="https://images.unsplash.com/photo-1686061592689-312bbfb5c055" />
          </div>
        </motion.div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">Our Students Get Into Top Universities</h3>
          <div className="relative w-full overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: ['-100%', '0%'] }}
              transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
            >
              {duplicatedLogos.map((logo, index) => (
                <div key={index} className="flex-shrink-0 w-48 h-24 flex items-center justify-center p-4 mx-4">
                  <img src={logo.url} alt={logo.name} className="max-h-full max-w-full filter grayscale invert brightness-150 contrast-150" />
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-900 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-900 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;