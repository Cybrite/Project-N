// components/MindEase/FeaturesSection.tsx
import FeatureCard from "./FeatureCard";

const features = [
  { title: "Guided Meditation", image: "/guided.png" },
  { title: "Hobby-Based Therapy", image: "/hobby.png" },
  { title: "Daily Stress Check", image: "/stress.png" },
  { title: "Mindfulness Tips", image: "/mindfulness.png" },
];

const FeaturesSection = () => {
  return (
    <div className="flex justify-center flex-wrap gap-6 ">
      {features.map((item, index) => (
        <FeatureCard key={index} title={item.title} image={item.image} />
      ))}
    </div>
  );
};

export default FeaturesSection;
