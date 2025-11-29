import { Star, StarHalf } from "lucide-react";

function RatingStars({ rating }: { rating: number }) {
  const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} fill="#f8f871ff" strokeWidth={0} size={17}/>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarHalf key={i}  fill="#f8f871ff" strokeWidth={0} size={17}/>);
      } else if (i > fullStars) {
        stars.push(<Star key={i} strokeWidth={1} color="#f8f871ff" size={17}/>);
      }
    }

    return <div className="flex items-center text-sm y-[1px]">{stars}</div>;
}

export default RatingStars