import React from 'react';

export const AboutProjPage: React.FC = () => {
    // Component for a styled section
    const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <section className="mb-8">
            <h2 className="text-3xl font-extrabold mb-3 text-emerald-600 dark:text-emerald-400 border-b border-emerald-200 dark:border-emerald-700 pb-2">
                {title}
            </h2>
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-md">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {children}
                </p>
            </div>
        </section>
    );

    return (
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 md:p-10 border border-slate-200 dark:border-slate-700 space-y-8">
                    
                    <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                        About Sustainable Architecture AI
                    </h1>

                    <Section title="Inspiration">
                        AI has transformed fields like medicine, finance, and art — but in architecture, its potential is still largely untapped. Sustainable design often relies on manual analysis or post-project audits, which are slow and limited in scope. We saw an opportunity to bridge that gap. Sustainable Architect AI was born from the idea that AI shouldn’t just generate pretty visuals — it should actively help architects make smarter, greener design decisions. Our goal was to create a tool that leverages AI to evaluate sustainability early in the design process, offering real, actionable insights rather than generic recommendations.
                    </Section>
                    
                    <Section title="What it does">
                        Sustainable Architect AI uses AI to analyze building designs or images and provide actionable sustainability insights. Users can describe a building concept in text, and EcoArchitect generates a detailed report — highlighting pros, cons, and suggestions across lighting, materials, energy efficiency, and environmental integration. It also gives each design a sustainability score, making it easy to benchmark and improve over time.
                    </Section>
                    
                    <Section title="How we built it">
                        We built Sustainable Architect AI using **React** and **TypeScript** for a responsive, modular frontend and integrated the **Gemini API** for AI-driven sustainability analysis of descriptions. **MongoDB** handles user authentication and stores building analysis history. This full-stack setup lets users log in, look up designs and instantly receive actionable sustainability insights powered by AI.
                    </Section>
                    
                    <Section title="Challenges we ran into">
                        We faced several challenges throughout development — from resolving GitHub merge conflicts during collaboration to refining feature implementations across the frontend and backend. The biggest hurdle was **prompt engineering**: structuring requests to the Gemini API in a way that consistently produced accurate, insightful sustainability analyses instead of generic responses.
                    </Section>
                    
                    <Section title="Accomplishments that we're proud of">
                        We’re proud of creating a reliable, full-stack platform that applies AI meaningfully in sustainable architecture. A major accomplishment was developing a custom **grounding gem** for the Gemini API, designed to anchor the model’s responses in accurate, domain-specific sustainability data. This greatly reduced hallucinations and improved the consistency of analyses, ensuring that feedback on materials, energy efficiency, and design recommendations stayed realistic and technically sound. We’re also proud of how seamlessly we integrated this with a clean, React-based UI for an intuitive user experience.
                    </Section>
                    
                    <Section title="What we learned">
                        We learned how powerful multimodal AI can be when combined with design tools — and how much prompt structure matters in getting useful, repeatable responses. We also deepened our understanding of sustainable design principles, realizing how much early feedback can change architectural outcomes.
                    </Section>
                    
                    <Section title="What's next for Sustainable Architect AI">
                        We plan to complete features that didn’t make it into our final build, including **direct user image uploading** that allows users to take photos of real buildings and receive instant, AI-driven sustainability feedback. This will make Sustainable Architect AI more interactive and practical, enabling on-site evaluations and real-time suggestions for improving energy efficiency, material use, and overall sustainability.
                    </Section>
                </div>
            </div>
        </main>
    );
};