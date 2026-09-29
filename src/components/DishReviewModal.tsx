import { useState, useEffect } from "react";
import { Star, MessageSquarePlus, User, Camera, ThumbsUp, Sparkles } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { MenuItem } from "@/lib/menu-data";
import {
  getDishReviews,
  getDishStats,
  addDishReview,
  type Review,
  type DishStats,
} from "@/lib/reviews";

interface DishReviewModalProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DishReviewModal({ item, open, onOpenChange }: DishReviewModalProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<DishStats>({
    averageRating: 4.8,
    totalReviews: 0,
    counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });

  const [showForm, setShowForm] = useState(false);
  const [userRating, setUserRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [authorName, setAuthorName] = useState("");
  const [comment, setComment] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (item && open) {
      const dishReviews = getDishReviews(item.id);
      const dishStats = getDishStats(item.id);
      setReviews(dishReviews);
      setStats(dishStats);
      setShowForm(false);
    }
  }, [item, open]);

  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a short review");
      return;
    }

    setIsSubmitting(true);
    try {
      const reviewPayload: Omit<Review, "id" | "date"> = {
        dishId: item.id,
        author: authorName.trim(),
        rating: userRating,
        comment: comment.trim(),
      };
      if (photoUrl.trim()) {
        reviewPayload.photoUrl = photoUrl.trim();
      }

      addDishReview(reviewPayload);

      toast.success("Thank you! Your review has been published.", {
        description: `Rated ${userRating} stars for ${item.name}`,
      });

      // Refresh reviews & stats
      const updatedReviews = getDishReviews(item.id);
      const updatedStats = getDishStats(item.id);
      setReviews(updatedReviews);
      setStats(updatedStats);

      // Reset form
      setAuthorName("");
      setComment("");
      setPhotoUrl("");
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to post review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border/80 text-foreground p-6 sm:p-8">
        <DialogHeader className="space-y-2 text-left">
          <div className="flex items-center justify-between gap-4">
            <div>
              <DialogTitle className="font-display text-2xl text-foreground">
                {item.name}
              </DialogTitle>
              {item.malayalam && (
                <p className="text-xs text-muted-foreground mt-0.5">{item.malayalam}</p>
              )}
            </div>
            <Badge
              variant="secondary"
              className="bg-primary/15 text-primary border-primary/30 px-3 py-1 font-semibold text-sm"
            >
              ★ {stats.averageRating} / 5
            </Badge>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Customer reviews, ratings and photo feedback for {item.name}.
          </DialogDescription>
        </DialogHeader>

        {/* Rating Summary Header */}
        <div className="mt-4 p-4 rounded-xl border border-border/60 bg-background/60 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          {/* Big Score Box */}
          <div className="sm:col-span-4 text-center sm:border-r border-border/50 sm:pr-4">
            <div className="font-display text-5xl text-primary font-bold">
              {stats.averageRating}
            </div>
            <div className="flex items-center justify-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`size-4 ${
                    star <= Math.round(stats.averageRating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">
              Based on {stats.totalReviews} customer{" "}
              {stats.totalReviews === 1 ? "review" : "reviews"}
            </div>
          </div>

          {/* Star Distribution Bars */}
          <div className="sm:col-span-8 space-y-1.5">
            {([5, 4, 3, 2, 1] as const).map((star) => {
              const count = stats.counts[star] || 0;
              const pct = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-6 text-right font-medium text-muted-foreground">{star} ★</span>
                  <Progress value={pct} className="h-2 flex-1 bg-muted" />
                  <span className="w-8 text-left text-muted-foreground/80 font-mono text-[0.7rem]">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action: Toggle Write Review Form */}
        <div className="mt-4 flex items-center justify-between border-b border-border/60 pb-3">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground flex items-center gap-2">
            <ThumbsUp className="size-4 text-primary" /> Customer Reviews ({reviews.length})
          </h3>
          <Button
            variant={showForm ? "outline" : "gold"}
            size="sm"
            onClick={() => setShowForm((v) => !v)}
            className="gap-1.5"
          >
            <MessageSquarePlus className="size-4" />
            {showForm ? "Cancel" : "Write a Review"}
          </Button>
        </div>

        {/* Write Review Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="p-4 rounded-xl border border-primary/40 bg-primary/5 space-y-4 animate-rise"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Sparkles className="size-4 text-primary" /> Rate this dish
              </span>
              <span className="text-xs font-semibold text-primary">{userRating} of 5 Stars</span>
            </div>

            {/* Interactive Star Picker */}
            <div className="flex items-center gap-2 justify-center py-2 bg-background/50 rounded-lg border border-border/40">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setUserRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`size-7 ${
                      star <= (hoverRating || userRating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="rev-author" className="text-xs">
                  Your Name *
                </Label>
                <Input
                  id="rev-author"
                  placeholder="e.g. Rahul Sharma"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="rev-photo" className="text-xs flex items-center gap-1">
                  <Camera className="size-3 text-muted-foreground" /> Optional Photo URL
                </Label>
                <Input
                  id="rev-photo"
                  placeholder="https://..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="rev-comment" className="text-xs">
                Your Review *
              </Label>
              <Textarea
                id="rev-comment"
                placeholder="How was the taste, presentation, and spice level?"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="gold" size="sm" disabled={isSubmitting}>
                Submit Review
              </Button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-3 mt-2">
          {reviews.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground text-sm">
              No reviews yet for {item.name}. Be the first to leave a review!
            </div>
          ) : (
            reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-xl border border-border/50 bg-background/50 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                      {rev.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground flex items-center gap-2">
                        {rev.author}
                        <span className="text-[0.65rem] font-normal text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                          Verified Order
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`size-3 ${
                              s <= rev.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[0.7rem] text-muted-foreground font-mono">{rev.date}</span>
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground pl-10">{rev.comment}</p>

                {rev.photoUrl && (
                  <div className="pl-10 pt-1">
                    <img
                      src={rev.photoUrl}
                      alt="Review attachment"
                      className="h-24 w-36 object-cover rounded-lg border border-border/60"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
