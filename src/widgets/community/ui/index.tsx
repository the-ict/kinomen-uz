import Link from 'next/link';

function CommunitySection() {
  return (
    <section className="bg-[#0d0d0d] text-white py-24 text-center">
      <h2 className="text-4xl font-bold mb-4">Jamiyat bilan birlashing</h2>
      <p className="text-gray-400 max-w-2xl mx-auto mb-10">
        Fikrlaringizni yozing, izoh bering, boshqa kinosevarlar bilan suhbat
        quring.
      </p>
      <Link
        href={'/register'}
        className="px-8 py-3 rounded-xl cursor-pointer bg-green-600 hover:bg-green-700 transition-all duration-300 text-white font-medium shadow-lg"
      >
        Jamoaga qo‘shilish
      </Link>
    </section>
  );
}

export default CommunitySection;
