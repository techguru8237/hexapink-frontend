import FeatureOne from "./FeatureOne";
import FeatureThree from "./FeatureThree";
import FeatureTwo from "./FeatureTwo";

export default function Features() {
  return (
    <div className="flex flex-col">
      <FeatureOne />
      <FeatureTwo />
      <FeatureThree />
    </div>
  );
}
