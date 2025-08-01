import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const institutionPlans = [
    {
        name: "Teacher Plus",
        price: "Custom",
        subtitle: "Irresistible offers with in-doc comments",
        description: "For individual teachers or small departments.",
        features: [
            "Bespoke student limits",
            "Teacher dashboard",
            "Class progress analytics",
            "In-document commenting features",
            "Email & chat support",
        ],
        popular: false,
    },
    {
        name: "School & District",
        price: "Custom",
        subtitle: "Let's talk",
        description: "For entire schools and districts.",
        features: [
            "Unlimited students & teachers",
            "Advanced admin dashboard",
            "Custom integrations (LMS, SIS)",
            "Dedicated account manager",
            "Onboarding & training"
        ],
        popular: true,
    }
];

const InstitutionPlans = () => {
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
                    <div className="flex items-center justify-center mb-6">
                        <Building className="h-8 w-8 text-purple-400 mr-3" />
                        <h2 className="text-3xl md:text-4xl font-bold">For Institutions</h2>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {institutionPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative h-full"
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-600">
                                        Recommended
                                    </Badge>
                                </div>
                            )}
                            <Card className={`glass-card h-full flex flex-col ${plan.popular ? 'border-purple-500/50' : ''}`}>
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                    <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                                    <div className="mt-6">
                                        <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                                        <div className="text-sm text-gray-400 mt-1">{plan.subtitle}</div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex flex-col flex-grow">
                                    <ul className="space-y-3 mb-6 flex-grow">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center text-gray-300">
                                                <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to="/contact" className="w-full mt-auto">
                                        <Button
                                            className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'}`}
                                        >
                                            Contact Sales
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstitutionPlans;