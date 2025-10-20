import { features } from '../lib/data';
import FeaturesCard from './features-card';

export default function FeaturesSection() {
  return (
    <section className="bg-[#0d0d0d] text-white py-[100px]">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold mb-4">Nima uchun Kinomen.uz?</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          Biz sizga faqat kino emas — haqiqiy tajriba taqdim etamiz.
          Fikrlaringizni bildiring, baholang va do‘stlar orttiring!
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, description }, index) => (
            <FeaturesCard
              key={index}
              Icon={Icon}
              title={title}
              description={description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
