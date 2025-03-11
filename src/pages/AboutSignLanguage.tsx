import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Globe, History, Users, Brain, HandMetal, Lightbulb, School } from 'lucide-react';

function AboutSignLanguage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-violet-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text mb-8">
            Understanding Sign Language
          </h1>
          
          <div className="prose prose-lg max-w-none">
            {/* Introduction Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-semibold text-violet-900 mb-6 flex items-center gap-2">
                <HandMetal className="h-8 w-8 text-violet-600" />
                What is Sign Language?
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <p className="text-slate-700 mb-4">
                  Sign language is a visual means of communicating using gestures, facial expressions, and body language. 
                  It's a complete and complex language that employs signs made with the hands and other movements, 
                  including facial expressions and postures of the body.
                </p>
                <img 
                  src="https://images.unsplash.com/photo-1630983358494-96012d838b84?auto=format&fit=crop&q=80&w=1200" 
                  alt="People communicating in sign language" 
                  className="rounded-lg w-full object-cover h-64 mb-4"
                />
              </div>
            </section>

            {/* History Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-semibold text-violet-900 mb-6 flex items-center gap-2">
                <History className="h-8 w-8 text-violet-600" />
                History of Sign Language
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-violet-800 mb-4">Early Beginnings</h3>
                    <p className="text-slate-700 mb-4">
                      The first school for the deaf was established in Paris by Abbé Charles-Michel de l'Épée in 1760. 
                      He developed a system of manual French signs that evolved into French Sign Language (LSF).
                    </p>
                    <h3 className="text-xl font-semibold text-violet-800 mb-4">American Sign Language</h3>
                    <p className="text-slate-700">
                      ASL emerged from a mix of French Sign Language and indigenous sign languages. 
                      Thomas Hopkins Gallaudet and Laurent Clerc established the first American School for the Deaf in 1817.
                    </p>
                  </div>
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1624385392440-a3c9d1563e06?auto=format&fit=crop&q=80&w=1200" 
                      alt="Historical representation of sign language" 
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Types of Sign Language */}
            <section className="mb-16">
              <h2 className="text-3xl font-semibold text-violet-900 mb-6 flex items-center gap-2">
                <Globe className="h-8 w-8 text-violet-600" />
                Types of Sign Language
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {signLanguageTypes.map((type, index) => (
                  <motion.div
                    key={type.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <h3 className="text-xl font-semibold text-violet-800 mb-3">{type.name}</h3>
                    <p className="text-slate-700">{type.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Learning Resources */}
            <section className="mb-16">
              <h2 className="text-3xl font-semibold text-violet-900 mb-6 flex items-center gap-2">
                <School className="h-8 w-8 text-violet-600" />
                Learning Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {learningResources.map((resource, index) => (
                  <motion.a
                    key={resource.name}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-violet-800 mb-3">{resource.name}</h3>
                    <p className="text-slate-700">{resource.description}</p>
                  </motion.a>
                ))}
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-semibold text-violet-900 mb-6 flex items-center gap-2">
                <Lightbulb className="h-8 w-8 text-violet-600" />
                Benefits of Learning Sign Language
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <h3 className="text-xl font-semibold text-violet-800 mb-3">{benefit.title}</h3>
                    <p className="text-slate-700">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Fun Facts */}
            <section>
              <h2 className="text-3xl font-semibold text-violet-900 mb-6 flex items-center gap-2">
                <Brain className="h-8 w-8 text-violet-600" />
                Interesting Facts
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <ul className="space-y-4">
                  {funFacts.map((fact, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-violet-600 mt-1">•</span>
                      <p className="text-slate-700">{fact}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const signLanguageTypes = [
  {
    name: "American Sign Language (ASL)",
    description: "The primary sign language used in the United States and parts of Canada. It has its own grammar and syntax distinct from English."
  },
  {
    name: "British Sign Language (BSL)",
    description: "The primary sign language used in the United Kingdom. It's different from ASL and has its own unique structure."
  },
  {
    name: "Auslan (Australian Sign Language)",
    description: "The sign language of the Australian deaf community, developed from British Sign Language (BSL) and Irish Sign Language."
  },
  {
    name: "Chinese Sign Language (CSL)",
    description: "Used in the People's Republic of China, it's one of the most widely used sign languages in the world."
  },
  {
    name: "International Sign",
    description: "A pidgin sign language used at international meetings and informally when traveling."
  },
  {
    name: "Japanese Sign Language (JSL)",
    description: "The primary sign language used in Japan, developed independently from other sign languages."
  }
];

const learningResources = [
  {
    name: "ASL App",
    description: "A mobile application that teaches ASL through interactive lessons and video tutorials.",
    url: "https://theaslapp.com"
  },
  {
    name: "SignLanguage101",
    description: "Free online courses covering basics to advanced concepts in various sign languages.",
    url: "https://www.signlanguage101.com"
  },
  {
    name: "Gallaudet University Resources",
    description: "Educational materials from the world's only university designed for deaf and hard of hearing students.",
    url: "https://www.gallaudet.edu"
  },
  {
    name: "HandSpeak",
    description: "Online sign language dictionary and resources for learning ASL.",
    url: "https://www.handspeak.com"
  }
];

const benefits = [
  {
    title: "Cognitive Benefits",
    description: "Learning sign language can improve spatial awareness, visual processing skills, and memory."
  },
  {
    title: "Career Opportunities",
    description: "Knowledge of sign language can open up career paths in interpretation, education, and healthcare."
  },
  {
    title: "Cultural Awareness",
    description: "Understanding sign language provides insight into Deaf culture and community."
  },
  {
    title: "Better Communication",
    description: "Sign language skills can help communicate in noisy environments or when verbal communication isn't possible."
  },
  {
    title: "Early Child Development",
    description: "Teaching babies sign language can help them communicate before they can speak."
  },
  {
    title: "Social Inclusion",
    description: "Knowledge of sign language helps create a more inclusive society for the deaf and hard of hearing."
  }
];

const funFacts = [
  "Sign language is not universal - there are more than 300 different sign languages around the world.",
  "The first documented sign language dictionary was published in 1755 by Abbé Charles-Michel de l'Épée.",
  "Some signs are iconic (they look like what they represent), but most are arbitrary symbols.",
  "Sign language uses not just hands, but also facial expressions, body posture, and movement.",
  "Martha's Vineyard had a high hereditary deaf population in the 18th-19th centuries, and almost everyone there knew sign language.",
  "Brain imaging shows that sign language is processed in the same areas of the brain as spoken language."
];

export default AboutSignLanguage;