import { homepageAdSections } from '../data';
import AdSection from './AdSection';

export default function HomepageAdSections() {
  return (
    <div className="space-y-10">
      {homepageAdSections.map((section) => (
        <AdSection key={section.id} section={section} />
      ))}
    </div>
  );
}