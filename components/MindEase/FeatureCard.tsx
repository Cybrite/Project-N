// components/MindEase/FeatureCard.tsx
type Props = {
  title: string;
  image: string;
};

const FeatureCard = ({ title, image }: Props) => {
  return (
    <div className="bg-gray-900 p-3 rounded-xl w-40 text-center shadow-md">
      <img src={image} alt={title} className="rounded-full w-16 h-16 mx-auto" />
      <h3 className="mt-3 font-medium text-white text-xs">{title}</h3>
      <button className="bg-blue-500 text-white px-2 py-1 rounded-full mt-2 hover:bg-blue-600 transition text-xs">
        Get Started
      </button>
    </div>
  );
};

export default FeatureCard;
