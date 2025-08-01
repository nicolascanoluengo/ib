import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Star } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';

const bundlePlan = {
    name: "Feedback Bundles",
    description: "Pay as you go. Perfect for targeted feedback.",
    features: [
        "Detailed AI feedback per essay",
        "Grade prediction",
        "Actionable improvement suggestions",
        "Credits never expire",
    ],
    isBundle: true,
    bundles: [
        { count: 1, price: 4.99, popular: false },
        { count: 5, price: 22.99, popular: true, saving: "Save 8%" },
        { count: 10, price: 39.99, popular: false, saving: "Save 20%" },
    ]
};

const subscriptionTiers = [
    { rounds: 1, price: 4.49, basePrice: 4.99 },
    { rounds: 5, price: 19.99, basePrice: 24.95 },
    { rounds: 10, price: 34.99, basePrice: 49.90 },
    { rounds: 15, price: 44.99, basePrice: 74.85 },
    { rounds: 20, price: 54.99, basePrice: 99.80 },
    { rounds: 25, price: 64.99, basePrice: 124.75 },
    { rounds: 30, price: 74.99, basePrice: 149.70 },
];

const StudentPlans = () => {
    const [sliderValue, setSliderValue] = useState([2]);
    const [selectedBundle, setSelectedBundle] = useState(bundlePlan.bundles[1]);
    const selectedTier = subscriptionTiers[sliderValue[0]];

    const calculateSaving = (tier) => {
        if (!tier) return 0;
        return Math.round(((tier.basePrice - tier.price) / tier.basePrice) * 100);
    };

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center mb-6">
                        <Users className="h-8 w-8 text-blue-400 mr-3" />
                        <h2 className="text-3xl md:text-4xl font-bold">For Students</h2>
                    </div>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative h-full"
                    >
                        <Card className="glass-card h-full flex flex-col">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">{bundlePlan.name}</CardTitle>
                                <CardDescription className="text-gray-400">{bundlePlan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-grow">
                                <div className="space-y-4 mb-6">
                                    {bundlePlan.bundles.map(bundle => (
                                        <div 
                                            key={bundle.count} 
                                            className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${selectedBundle.count === bundle.count ? "border-blue-400 bg-blue-400/10" : "border-gray-600 hover:border-gray-400"}`}
                                            onClick={() => setSelectedBundle(bundle)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <span className="font-semibold">{bundle.count} Feedback Round{bundle.count > 1 ? 's' : ''}</span>
                                                    {bundle.saving && <Badge variant="outline" className="ml-2 text-green-400 border-green-400/50">{bundle.saving}</Badge>}
                                                </div>
                                                <span className="font-bold">€{bundle.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <ul className="space-y-3 mb-6 flex-grow">
                                    {bundlePlan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center text-gray-300">
                                            <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/signup" className="mt-auto">
                                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                        Purchase Bundle
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative h-full"
                    >
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600">
                                <Star className="h-4 w-4 mr-1" />
                                Best Value
                            </Badge>
                        </div>
                        <Card className="glass-card h-full flex flex-col border-blue-500/50 glow-effect">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">Premium Subscription</CardTitle>
                                <CardDescription className="text-gray-400">Choose a recurring amount of feedback rounds every month.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-grow">
                                <div className="text-center my-6">
                                    <div className="flex items-baseline justify-center">
                                        <span className="text-4xl font-bold gradient-text">€{selectedTier.price}</span>
                                        <span className="text-gray-400 ml-2">/ month</span>
                                    </div>
                                    <Badge variant="outline" className="mt-2 text-green-400 border-green-400/50">
                                        Save {calculateSaving(selectedTier)}% vs Bundles
                                    </Badge>
                                </div>
                                <div className="space-y-4 mb-6">
                                    <Label className="text-center block">Choose The Number of Feedback Rounds Per Month</Label>
                                    <div className="text-center font-bold text-lg">{selectedTier.rounds} Rounds</div>
                                    <Slider
                                        min={0}
                                        max={subscriptionTiers.length - 1}
                                        step={1}
                                        value={sliderValue}
                                        onValueChange={setSliderValue}
                                    />
                                </div>
                                <ul className="space-y-3 mb-6 flex-grow">
                                    <li className="flex items-center text-gray-300">
                                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                                        {selectedTier.rounds} feedback rounds per month
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                                        Unused rounds roll over
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                                        Cancel or modify anytime
                                    </li>
                                </ul>
                                <Link to="/signup" className="mt-auto">
                                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 glow-effect">
                                        Purchase Subscription
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default StudentPlans;