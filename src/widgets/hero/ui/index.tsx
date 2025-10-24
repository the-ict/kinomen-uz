import { IPost } from '@/shared/config/api/posts/posts.model';
import DomeGallery from '@/widgets/DomeGallery';

interface Props {
  movies: IPost[];
}

export default function HeroSection({ movies }: Props) {
  return (
    <section className="lg:h-[80vh] max-lg:h-[60vh]">
      <DomeGallery
        images={movies.map((movie) => {
          if (movie.imageUrl.trim() === '')
            return 'https://sitiorandom.com/wp-content/uploads/2024/08/Goldfish-2-e1724099193229.webp';
          return movie.imageUrl;
        })}
      />
    </section>
  );
}
