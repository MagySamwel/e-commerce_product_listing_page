import { Review } from "@/lib/types/review";
import RatingStars from "../ui/ratingStars";

interface ReviewsSectionProps {
  reviews: Review[];
  average: number
}

export default function ReviewsSection({ reviews, average }: ReviewsSectionProps) {
  if (reviews.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="font-medium text-lg text-[#1F2A37] mb-4">Reviews</h3>
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="font-medium text-lg text-[#1F2A37] mb-4">
        Reviews ({reviews.length})
      </h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.reviewer}
            className="border-b border-gray-200 pb-4 last:border-0"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#0C4B54] flex items-center justify-center text-white font-semibold">
                  {review?.reviewer?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-[#1F2A37]">
                    {review.reviewer}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.created_at)
                      .toDateString()
                      .substring(4)
                      .replaceAll(" ", "-")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="font-medium">{average}<span className="text-gray-400 ms-1">rating</span></div>
                <RatingStars rating={review.rating} />
              </div>
            </div>
            <p className="text-gray-700 mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
